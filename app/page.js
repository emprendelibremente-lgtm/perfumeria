"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/constants";
import PerfumesGrid from "@/components/PerfumesGrid";
import Novedades from "@/components/Novedades";

const STEPS = [
  {
    title: "Elige tus fragancias",
    description:
      "Agrega al carrito los perfumes que te interesan, estén disponibles o por consultar.",
  },
  {
    title: "Envíanos tu selección",
    description:
      "Recibimos tu carrito por WhatsApp y te confirmamos disponibilidad, precios y opciones.",
  },
  {
    title: "Retira o recibe tu pedido",
    description:
      "Puedes retirar en nuestras tiendas o coordinar envío según tu ubicación.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[85vh] flex-col items-center justify-start overflow-hidden px-6 pt-14 text-center sm:h-screen sm:pt-24">
        <Image
          src="/images/tienda-hero.jpeg"
          alt="Tienda Fragancias Perfumería"
          fill
          priority
          className="object-cover object-top"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(0,0,0,0.65)" }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(0,181,181,0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1 className="flex flex-col items-center">
            <span className="font-serif text-4xl font-bold sm:text-7xl">
              FRAGANCIAS
            </span>
            <span className="font-script text-2xl text-turquoise sm:text-4xl">
              perfumería
            </span>
          </h1>

          <p className="max-w-xl text-lg font-bold text-white sm:text-xl">
            Perfumes originales y de lujo
            <br />
            San Cristóbal, Venezuela.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={getWhatsAppLink(
                "Hola, me gustaría conocer más sobre sus fragancias."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-turquoise px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
            >
              Consultar por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="rounded-full border border-turquoise px-8 py-3 text-sm font-semibold text-turquoise transition-colors hover:bg-turquoise/10"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      {/* Banda informativa — Cómo funciona */}
      <section
        className="relative px-6 py-10"
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid rgba(0,181,181,0.2)",
          borderBottom: "1px solid rgba(0,181,181,0.2)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:gap-0">
          {/* Paso 1 — Carrito */}
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B5B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h3 className="mt-1 text-xs font-semibold uppercase tracking-widest text-white">
              Agrega al carrito
            </h3>
            <p className="text-[11px] leading-relaxed text-white/50">
              Selecciona los perfumes que te interesan
            </p>
          </div>

          <div className="hidden h-10 w-px bg-white/10 md:block" />

          {/* Paso 2 — Confirmar consulta */}
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B5B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z" />
              <polyline points="16 3 16 8 21 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
              <polyline points="10 9 9 10 8 9" />
            </svg>
            <h3 className="mt-1 text-xs font-semibold uppercase tracking-widest text-white">
              Confirma tu consulta
            </h3>
            <p className="text-[11px] leading-relaxed text-white/50">
              Toca el botón &ldquo;Confirmar por WhatsApp&rdquo; en tu carrito
            </p>
          </div>

          <div className="hidden h-10 w-px bg-white/10 md:block" />

          {/* Paso 3 — WhatsApp */}
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B5B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <h3 className="mt-1 text-xs font-semibold uppercase tracking-widest text-white">
              Te atendemos
            </h3>
            <p className="text-[11px] leading-relaxed text-white/50">
              Confirmamos disponibilidad y precio por WhatsApp
            </p>
          </div>

          <div className="hidden h-10 w-px bg-white/10 md:block" />

          {/* Paso 4 — Retira o recibe */}
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B5B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h3 className="mt-1 text-xs font-semibold uppercase tracking-widest text-white">
              Retira o recibe
            </h3>
            <p className="text-[11px] leading-relaxed text-white/50">
              Visita nuestra tienda o coordina tu entrega
            </p>
          </div>
        </div>
      </section>

      {/* Novedades */}
      <section id="novedades" className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-2xl font-semibold sm:text-3xl">
            Novedades
          </h2>
          <p className="mt-3 mb-8 text-center text-foreground/60">
            Nuestra selección de fragancias más exclusivas y buscadas.
          </p>
          <Novedades />
        </div>
      </section>

      {/* Perfumes */}
      <section id="catalogo" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-foreground/60">
            Agrega tus favoritas y consulta precio/disponibilidad por
            WhatsApp.
          </p>
          <PerfumesGrid />
        </div>
      </section>

      {/* Cómo Comprar */}
      <section id="como-comprar" className="border-t border-border bg-background px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Cómo comprar
          </h2>
          <p className="mt-3 text-center text-foreground/60">
            Elige tus fragancias favoritas y te asesoramos por WhatsApp antes
            de concretar tu compra.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-turquoise text-lg font-semibold text-turquoise">
                  {index + 1}
                </span>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-sm text-foreground/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximamente - MicroFragancias */}
      <section className="border-t border-border bg-surface overflow-hidden">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center">
          <span className="rounded-full border border-turquoise/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-turquoise">
            Próximamente
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            MicroFragancias
          </h2>
          <p className="max-w-2xl text-foreground/70">
            Muy pronto podrás probar fragancias seleccionadas en formato
            decant antes de invertir en el frasco completo. Una forma
            práctica de descubrir tu próximo perfume sin compromiso.
          </p>
        </div>
        <div className="relative w-full overflow-hidden bg-[#0a0a0a] py-2.5">
          <motion.div
            className="flex w-max whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <span
                key={i}
                className="px-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/70"
              >
                FRAGANCIAS ORIGINALES &middot; FRASCOS PREMIUM &middot; 10 ML
                &middot; PERFUMES DE LUJO &middot; FRASCOS PREMIUM &middot; 10
                ML &middot;&nbsp;
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
