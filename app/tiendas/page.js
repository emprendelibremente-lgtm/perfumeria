import Image from "next/image";
import { getWhatsAppLink } from "@/lib/constants";

export const metadata = {
  title: "Tiendas",
  description:
    "Visita nuestras tiendas en San Cristóbal, Venezuela, o contáctanos directamente por WhatsApp.",
};

const TIENDAS = [
  {
    nombre: "CC Boulevard Los Mangos",
    imagen: "/tienda-boulevard.jpg",
    ubicacion:
      "Centro Comercial Boulevard Los Mangos, Barrio Obrero, San Cristóbal, Venezuela",
    horario: "Lunes a Sábado · 8:30 AM – 7:00 PM",
    comoLlegar:
      "Entrando por el pasillo central, camina al fondo y encontrarás Fragancias Perfumería.",
    servicios: ["Asesoría personalizada"],
    estacionamiento: null,
    mapsUrl:
      "https://maps.google.com/?q=Centro+Comercial+Boulevard+Los+Mangos+San+Cristobal+Venezuela",
  },
  {
    nombre: "Hotel Tamá Eurobuilding",
    imagen: "/tienda-tama.jpeg",
    ubicacion:
      "Hotel Tamá Eurobuilding, Local 1, San Cristóbal, Venezuela",
    horario:
      "Lunes a Sábado · 9:00 AM – 9:00 PM · Domingos · 10:00 AM – 7:00 PM",
    comoLlegar:
      "Entra al lobby del hotel, camina por el pasillo a mano izquierda justo después de entrar.",
    servicios: ["Asesoría personalizada"],
    estacionamiento:
      "Estacionamiento privado del hotel disponible — solo menciona que vas a la perfumería.",
    mapsUrl:
      "https://maps.google.com/?q=Hotel+Tama+Eurobuilding+San+Cristobal+Venezuela",
  },
];

export default function TiendasPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-serif text-3xl font-bold sm:text-5xl">
          Nuestras Tiendas
        </h1>
        <p className="mt-4 text-center text-foreground/60">
          Visítanos en San Cristóbal y vive la experiencia Fragancias
          Perfumería.
        </p>

        <div className="mt-16 flex flex-col gap-12">
          {TIENDAS.map((tienda) => (
            <article
              key={tienda.nombre}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Imagen */}
                <div className="relative h-72 w-full shrink-0 lg:h-auto lg:w-[480px]">
                  <Image
                    src={tienda.imagen}
                    alt={`Tienda ${tienda.nombre}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-6 p-8 lg:p-10">
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                    {tienda.nombre}
                  </h2>

                  <div className="flex flex-col gap-4">
                    {/* Ubicación */}
                    <div className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 5.5 11.5 6.18 12.32a1.05 1.05 0 0 0 1.64 0C13.5 20.5 19 13.5 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-turquoise">
                          Ubicación
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {tienda.ubicacion}
                        </p>
                      </div>
                    </div>

                    {/* Horario */}
                    <div className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-turquoise">
                          Horario
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {tienda.horario}
                        </p>
                      </div>
                    </div>

                    {/* Cómo llegar */}
                    <div className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                        aria-hidden="true"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-turquoise">
                          Cómo llegar
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {tienda.comoLlegar}
                        </p>
                      </div>
                    </div>

                    {/* Servicios */}
                    <div className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-turquoise">
                          Servicios
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {tienda.servicios.join(" · ")}
                        </p>
                      </div>
                    </div>

                    {/* Estacionamiento */}
                    {tienda.estacionamiento && (
                      <div className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                          aria-hidden="true"
                        >
                          <rect x="1" y="3" width="15" height="13" rx="2" />
                          <path d="m16 8 5 3-5 3V8Z" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="12.5" cy="18.5" r="2.5" />
                        </svg>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-turquoise">
                            Estacionamiento
                          </p>
                          <p className="mt-1 text-sm text-foreground/70">
                            {tienda.estacionamiento}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                    <a
                      href={tienda.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-turquoise px-6 py-3 text-sm font-semibold text-turquoise transition-colors hover:bg-turquoise/10"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 5.5 11.5 6.18 12.32a1.05 1.05 0 0 0 1.64 0C13.5 20.5 19 13.5 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      Cómo llegar
                    </a>
                    <a
                      href={getWhatsAppLink(
                        `Hola, quisiera más información sobre la tienda ${tienda.nombre}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.91.54 3.7 1.46 5.23L2 22l4.99-1.31a9.84 9.84 0 0 0 5.05 1.38h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.64-1.03-5.13-2.9-7C16.18 3.03 14.18 2 12.04 2zm0 1.67c1.78 0 3.45.7 4.71 1.96a6.6 6.6 0 0 1 1.96 4.71c0 3.66-2.98 6.64-6.65 6.64a6.62 6.62 0 0 1-3.39-.93l-.24-.14-2.96.78.79-2.88-.16-.25a6.6 6.6 0 0 1-1.01-3.52c0-3.67 2.98-6.65 6.65-6.65z" />
                      </svg>
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
