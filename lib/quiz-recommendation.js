/**
 * Heurística MVP: elige un producto según respuestas del cuestionario (sin persistencia).
 * Usa tags y título del producto cuando existen; si no hay coincidencia clara, usa un índice estable por hash.
 *
 * @param {Record<string, unknown>} answers
 * @param {{ handle: string, title: string, tags?: string[] }[]} products
 * @returns {typeof products[0] | null}
 */
export function scoreQuiz(answers, products) {
  if (!products?.length) return null;

  const tagsLower = (p) =>
    (p.tags || []).map((t) => String(t).toLowerCase());
  const emotion = String(answers.emotion ?? "").toLowerCase().trim();
  const intensity = String(answers.intensity ?? "").toLowerCase().trim();
  const presence = String(answers.presence ?? "").toLowerCase().trim();
  const identity = Array.isArray(answers.identity)
    ? answers.identity.map((x) => String(x).toLowerCase())
    : [];
  const contexts = Array.isArray(answers.contexts)
    ? answers.contexts.map((x) => String(x).toLowerCase())
    : [];

  const impression = String(answers.impression ?? "").toLowerCase();
  const inspiration = String(answers.inspiration ?? "").toLowerCase();
  const olfactive = String(answers.olfactive ?? "").toLowerCase();
  const avoid = String(answers.avoid ?? "").toLowerCase();
  const ideal = String(answers.ideal ?? "").toLowerCase();
  const textBlob = [impression, inspiration, olfactive, avoid, ideal].join(" ");

  let best = null;
  let bestScore = -Infinity;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const tagStr = tagsLower(p).join(" ");
    const titleLower = String(p.title).toLowerCase();
    let score = 0;

    for (const id of identity) {
      if (id.length >= 3 && (tagStr.includes(id) || titleLower.includes(id))) {
        score += 2;
      }
    }
    for (const ctx of contexts) {
      if (ctx.length >= 3 && tagStr.includes(ctx)) score += 1;
    }
    if (emotion) {
      const parts = emotion.split(/\s+/).filter((w) => w.length > 2);
      for (const w of parts) {
        if (tagStr.includes(w) || titleLower.includes(w)) score += 2;
      }
    }
    if (intensity.includes("intensa") || intensity.includes("marcada")) {
      if (/oud|ambar|madera|oriental|intenso|patchouli|cuero/i.test(tagStr + titleLower)) {
        score += 2;
      }
    }
    if (intensity.includes("sutil") || intensity.includes("ligera")) {
      if (/fresco|ligero|citrico|clean|acuoso|floral suave|musgo/i.test(tagStr + titleLower)) {
        score += 2;
      }
    }
    if (presence.includes("nota") || presence.includes("huella")) {
      if (/sillage|proyección|larga duración|persistente/i.test(tagStr)) score += 1;
    }
    const words = textBlob.split(/\s+/).filter((w) => w.length > 4);
    for (const w of words.slice(0, 12)) {
      if (tagStr.includes(w) || titleLower.includes(w)) score += 0.5;
    }

    const tie = stableTieBreak(answers, p.handle, i);
    const total = score + tie;
    if (total > bestScore) {
      bestScore = total;
      best = p;
    }
  }

  if (best) return best;
  const idx = stableIndex(answers, products.length);
  return products[idx] ?? null;
}

function stableTieBreak(answers, handle, index) {
  const n = hashString(JSON.stringify(answers) + handle) % 1000;
  return n * 1e-6 + index * 1e-9;
}

function stableIndex(answers, len) {
  if (len <= 0) return 0;
  return hashString(JSON.stringify(answers)) % len;
}

function hashString(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
  }
  return Math.abs(h);
}
