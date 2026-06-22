import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";

export const metadata = {
  title: "Cómo Comprar",
  description:
    "Aprende a comprar tus fragancias favoritas en 3 simples pasos: elige, consulta por WhatsApp y recíbela donde estés.",
};

const PASOS = [
  {
    numero: "01",
    titulo: "Elige tu fragancia",
    descripcion:
      "Explora nuestro catálogo completo y filtra por género para encontrar la fragancia ideal. Cada perfume indica si está disponible o si tiene un tiempo estimado de llegada.",
    icono: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Consúltanos por WhatsApp",
    descripcion:
      "Escríbenos directamente desde el catálogo o desde aquí. Te confirmamos disponibilidad, precio y las formas de pago aceptadas.",
    icono: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.91.54 3.7 1.46 5.23L2 22l4.99-1.31a9.84 9.84 0 0 0 5.05 1.38h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.64-1.03-5.13-2.9-7C16.18 3.03 14.18 2 12.04 2zm0 1.67c1.78 0 3.45.7 4.71 1.96a6.6 6.6 0 0 1 1.96 4.71c0 3.66-2.98 6.64-6.65 6.64a6.62 6.62 0 0 1-3.39-.93l-.24-.14-2.96.78.79-2.88-.16-.25a6.6 6.6 0 0 1-1.01-3.52c0-3.67 2.98-6.65 6.65-6.65zm-3.62 2.94c-.18 0-.47.07-.68.32-.21.25-.79.79-.79 1.92 0 1.13.81 2.22.92 2.38.11.16 1.6 2.53 3.95 3.49 2.04.84 2.46.7 2.91.66.45-.04 1.46-.6 1.66-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.49-.29-.26-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.12-.16.25-.63.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.99-1.22-.74-.65-1.23-1.46-1.37-1.71-.14-.25-.01-.39.11-.51.12-.13.27-.34.41-.51.14-.17.18-.29.27-.48.09-.19.04-.36-.04-.5-.08-.14-.6-1.45-.82-1.98-.18-.43-.37-.4-.51-.41z" />
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Recíbela donde estés",
    descripcion:
      "Coordina el envío a tu domicilio o retira tu fragancia en cualquiera de nuestras tiendas físicas en San Cristóbal.",
    icono: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M3 11l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ComoComprarPage() {
  return (
    <>
      <section className="px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Cómo Comprar</h1>
        <p className="mx-auto mt-3 max-w-xl text-foreground/60">
          Comprar tu fragancia favorita es muy sencillo. Solo sigue estos tres
          pasos.
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {PASOS.map((paso) => (
            <div
              key={paso.numero}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-turquoise text-turquoise">
                  {paso.icono}
                </span>
                <span className="text-3xl font-semibold text-foreground/10">
                  {paso.numero}
                </span>
              </div>
              <h2 className="text-lg font-medium">{paso.titulo}</h2>
              <p className="text-sm text-foreground/60">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          ¿Listo para encontrar tu fragancia?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-foreground/60">
          Explora el catálogo o escríbenos directamente, estamos felices de
          ayudarte a elegir.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/catalogo"
            className="rounded-full bg-turquoise px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
          >
            Ver Catálogo
          </Link>
          <a
            href={getWhatsAppLink(
              "Hola, tengo una consulta sobre cómo comprar."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-turquoise hover:text-turquoise"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
