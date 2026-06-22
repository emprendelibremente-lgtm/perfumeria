"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCarrito } from "@/context/CarritoContext";

let toastMostrado = false;

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x400/111111/00B5B5?text=Fragancia";

export default function PerfumeCard({ perfume }) {
  const [imagenFallida, setImagenFallida] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const timerRef = useRef(null);
  const { carrito, agregarAlCarrito } = useCarrito();
  const estaEnCarrito = carrito.some((p) => p.id === perfume.id);


  const usarPlaceholder = imagenFallida || !perfume.imagen_url;

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleAgregar = () => {
    agregarAlCarrito(perfume);
    if (!toastMostrado) {
      toastMostrado = true;
      setMostrarToast(true);
      timerRef.current = setTimeout(() => setMostrarToast(false), 3000);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-turquoise">
      <div className="relative h-[160px] w-full bg-[#111111] sm:h-[280px]">
        {usarPlaceholder ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PLACEHOLDER_IMAGE}
            alt={`${perfume.nombre} - ${perfume.marca}`}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Image
            src={perfume.imagen_url}
            alt={`${perfume.nombre} - ${perfume.marca}`}
            fill
            className="object-cover object-center"
            onError={() => setImagenFallida(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-base leading-tight sm:text-xl">
            {perfume.nombre}
          </h3>
          <p className="text-xs uppercase tracking-wide text-foreground/40">
            {perfume.marca}
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center pt-4">
          <button
            type="button"
            onClick={handleAgregar}
            disabled={estaEnCarrito}
            className={`inline-flex w-fit whitespace-nowrap items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium transition-colors mx-auto sm:gap-2 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${
              estaEnCarrito
                ? "cursor-default border border-border text-foreground/50 sm:bg-foreground/10"
                : "border border-turquoise text-turquoise hover:bg-turquoise hover:text-background sm:border-transparent sm:bg-turquoise sm:text-background sm:hover:bg-turquoise-light"
            }`}
          >
            {estaEnCarrito ? (
              <>
                <span className="hidden sm:inline"><CheckIcon /></span> Agregado ✓
              </>
            ) : (
              <>
                <span className="hidden sm:inline"><BagIcon /></span> Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>

      {mostrarToast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-5 py-3 text-xs text-white shadow-lg"
          style={{ backgroundColor: "#111", border: "1px solid #00B5B5" }}
        >
          ¡Agregado! Sigue agregando los que te interesen y consulta todos desde el carrito 🛒
        </div>
      )}
    </article>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
