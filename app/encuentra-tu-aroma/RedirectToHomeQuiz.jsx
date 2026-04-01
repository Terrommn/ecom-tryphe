"use client";

import { useEffect } from "react";

export function RedirectToHomeQuiz() {
  useEffect(() => {
    window.location.replace("/#encuentra-tu-aroma");
  }, []);
  return (
    <p className="px-6 py-16 text-center text-sm text-neutral-600">
      Redirigiendo al cuestionario en la página principal…
    </p>
  );
}
