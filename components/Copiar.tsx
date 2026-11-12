"use client";

import { useState } from "react";

// Bloque de código con botón para copiarlo.
export function Comando({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      // Sin permiso de portapapeles: el texto sigue ahí para copiarlo a mano.
    }
  }

  return (
    <div className="comando">
      <code>{texto}</code>
      <button type="button" onClick={copiar} className="comando__copiar" aria-live="polite">
        {copiado ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}
