"use client";

import { useState } from "react";
import Image from "next/image";
import { useCarrito } from "@/context/CarritoContext";
import { buildWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/constants";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x400/111111/00B5B5?text=Fragancia";

function construirMensaje(carrito) {
  const lineas = carrito.map(
    (perfume, index) => `${index + 1}. ${perfume.nombre} - ${perfume.marca}`
  );

  return `Hola, me interesa consultar estas fragancias:\n${lineas.join(
    "\n"
  )}\n¿Me pueden indicar precio, disponibilidad y opciones de retiro o envío?`;
}

export default function CarritoFlotante() {
  const { carrito, quitarDelCarrito } = useCarrito();
  const [abierto, setAbierto] = useState(false);

  const enlaceWhatsApp = buildWhatsAppLink(
    WHATSAPP_NUMBER,
    construirMensaje(carrito)
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-label="Abrir carrito"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-turquoise text-background shadow-lg transition-colors hover:bg-turquoise-light"
      >
        <CartIcon />
        {carrito.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {carrito.length}
          </span>
        )}
      </button>

      {abierto && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setAbierto(false)}
          />

          <div className="relative flex h-full w-full max-w-sm flex-col bg-surface p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar carrito"
                className="text-foreground/50 transition-colors hover:text-turquoise"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
              {carrito.length === 0 ? (
                <p className="mt-8 text-center text-foreground/60">
                  Tu carrito está vacío
                </p>
              ) : (
                <ul className="flex flex-col gap-4">
                  {carrito.map((perfume) => (
                    <li key={perfume.id} className="flex items-center gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#111111]">
                        <Image
                          src={perfume.imagen_url || PLACEHOLDER_IMAGE}
                          alt={`${perfume.nombre} - ${perfume.marca}`}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {perfume.nombre}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-foreground/40">
                          {perfume.marca}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => quitarDelCarrito(perfume.id)}
                        aria-label={`Quitar ${perfume.nombre} del carrito`}
                        className="text-foreground/40 transition-colors hover:text-red-400"
                      >
                        <TrashIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {carrito.length > 0 ? (
              <a
                href={enlaceWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
              >
                Consultar por WhatsApp
              </a>
            ) : (
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Agrega al menos una fragancia para consultar por WhatsApp."
                  )
                }
                className="mt-6 flex items-center justify-center rounded-full border border-border bg-foreground/10 px-6 py-3 text-sm font-semibold text-foreground/50"
              >
                Consultar por WhatsApp
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </svg>
  );
}
