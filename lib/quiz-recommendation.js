/**
 * Heurística MVP: elige un producto según respuestas del cuestionario (sin persistencia).
 * Usa tags y título del producto; si no hay coincidencia clara, usa un índice estable por hash.
 *
 * @param {{ identity: string[], fragrance: string, emotion: string, contexts: string[] }} answers
 * @param {{ handle: string, title: string, tags?: string[] }[]} products
 * @returns {typeof products[0] | null}
 */
export function scoreQuiz(answers, products) {
  if (!products?.length) return null;

  const tagsLower = (p) => (p.tags || []).map((t) => String(t).toLowerCase());
  const identity = Array.isArray(answers.identity)
    ? answers.identity.map((x) => String(x).toLowerCase())
    : [];
  const fragrance = String(answers.fragrance ?? "").toLowerCase().trim();
  const emotion = String(answers.emotion ?? "").toLowerCase().trim();
  const contexts = Array.isArray(answers.contexts)
    ? answers.contexts.map((x) => String(x).toLowerCase())
    : [];

  let best = null;
  let bestScore = -Infinity;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const tagStr = tagsLower(p).join(" ");
    const titleLower = String(p.title).toLowerCase();
    let score = 0;

    // Identity matching (multi-select)
    for (const id of identity) {
      const words = id.split(/\s+/).filter((w) => w.length > 2);
      for (const w of words) {
        if (tagStr.includes(w) || titleLower.includes(w)) score += 2;
      }
    }

    // Fragrance type matching (single-select)
    if (fragrance && (tagStr.includes(fragrance) || titleLower.includes(fragrance))) {
      score += 3;
    }
    // Fragrance type keyword expansions
    const fragranceKeywords = {
      floral: ["rosa", "jazmín", "floral", "gardenia", "violeta", "iris"],
      amaderada: ["madera", "sándalo", "cedro", "oud", "vetiver", "santal"],
      "cítrica": ["cítrico", "bergamota", "limón", "naranja", "pomelo", "mandarina"],
      oriental: ["oriental", "ámbar", "incienso", "vainilla", "almizcle"],
      frutal: ["frutal", "manzana", "pera", "durazno", "frambuesa", "fruta"],
      especiada: ["especiada", "canela", "pimienta", "cardamomo", "nuez moscada", "clavo"],
    };
    const kwList = fragranceKeywords[fragrance] || [];
    for (const kw of kwList) {
      if (tagStr.includes(kw) || titleLower.includes(kw)) score += 1.5;
    }

    // Emotion matching (single-select)
    if (emotion) {
      const parts = emotion.split(/\s+/).filter((w) => w.length > 2);
      for (const w of parts) {
        if (tagStr.includes(w) || titleLower.includes(w)) score += 2;
      }
    }

    // Context matching (multi-select)
    for (const ctx of contexts) {
      const words = ctx.split(/[\s/]+/).filter((w) => w.length > 2);
      for (const w of words) {
        if (tagStr.includes(w)) score += 1;
      }
    }
    // Context heuristics
    const ctxJoined = contexts.join(" ");
    if ((ctxJoined.includes("noche") || ctxJoined.includes("cita")) &&
        /intenso|seductor|nocturno|oud|oriental|sensual/i.test(tagStr + titleLower)) {
      score += 2;
    }
    if ((ctxJoined.includes("oficina") || ctxJoined.includes("diario")) &&
        /fresco|limpio|suave|ligero|clean|día/i.test(tagStr + titleLower)) {
      score += 2;
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
