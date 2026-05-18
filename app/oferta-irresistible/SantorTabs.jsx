"use client";

import { useState } from "react";

export function SantorTabs({ piramide, caracter, chips }) {
  const [tab, setTab] = useState("notas");

  return (
    <div>
      {/* Toggle tabs */}
      <div className="flex w-fit border border-stone-200 mb-6">
        {[
          { id: "notas", label: "Familia de notas" },
          { id: "caracter", label: "Carácter" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              tab === t.id
                ? "bg-[#e8e0d4] text-neutral-900"
                : "bg-white text-stone-400 hover:text-stone-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Pirámide */}
      {tab === "notas" && (
        <div className="border border-stone-200 overflow-hidden">
          {piramide.map((row, i) => (
            <div
              key={row.fase}
              className={`flex items-start gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-[#faf9f6]" : "bg-white"}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 w-16 shrink-0 mt-0.5">
                {row.fase}
              </p>
              <p className="text-sm text-neutral-800">{row.notas}</p>
            </div>
          ))}
        </div>
      )}

      {/* Carácter */}
      {tab === "caracter" && (
        <p className="text-sm text-stone-600 leading-relaxed max-w-lg">{caracter}</p>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-6">
        {chips.map((chip) => (
          <span
            key={chip}
            className="bg-[#f0ebe3] border border-stone-300 text-stone-600 text-[11px] px-4 py-1.5 rounded-full"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
