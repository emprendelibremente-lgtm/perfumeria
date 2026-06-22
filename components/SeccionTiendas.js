import { supabase } from "@/lib/supabase";
import { buildWhatsAppLink } from "@/lib/constants";

export default async function SeccionTiendas() {
  const { data: sucursales } = await supabase
    .from("sucursales")
    .select("*")
    .order("id");

  return (
    <section
      id="tiendas"
      className="border-t border-border bg-background px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">
          Nuestras Tiendas
        </h2>
        <p className="mt-3 text-center text-foreground/60">
          Visítanos o contáctanos directamente
        </p>

        {sucursales?.length ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {sucursales.map((sucursal) => (
              <article
                key={sucursal.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8"
              >
                <h3 className="text-xl font-semibold">{sucursal.nombre}</h3>

                {sucursal.descripcion && (
                  <p className="text-sm text-foreground/70">
                    {sucursal.descripcion}
                  </p>
                )}

                {sucursal.direccion && (
                  <p className="flex items-start gap-2 text-sm text-foreground/60">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 shrink-0 text-turquoise"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 5.5 11.5 6.18 12.32a1.05 1.05 0 0 0 1.64 0C13.5 20.5 19 13.5 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                    </svg>
                    {sucursal.direccion}
                  </p>
                )}

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  {sucursal.whatsapp && (
                    <a
                      href={buildWhatsAppLink(
                        sucursal.whatsapp,
                        `Hola, quisiera más información sobre la tienda ${sucursal.nombre}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.91.54 3.7 1.46 5.23L2 22l4.99-1.31a9.84 9.84 0 0 0 5.05 1.38h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.64-1.03-5.13-2.9-7C16.18 3.03 14.18 2 12.04 2zm0 1.67c1.78 0 3.45.7 4.71 1.96a6.6 6.6 0 0 1 1.96 4.71c0 3.66-2.98 6.64-6.65 6.64a6.62 6.62 0 0 1-3.39-.93l-.24-.14-2.96.78.79-2.88-.16-.25a6.6 6.6 0 0 1-1.01-3.52c0-3.67 2.98-6.65 6.65-6.65zm-3.62 2.94c-.18 0-.47.07-.68.32-.21.25-.79.79-.79 1.92 0 1.13.81 2.22.92 2.38.11.16 1.6 2.53 3.95 3.49 2.04.84 2.46.7 2.91.66.45-.04 1.46-.6 1.66-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.49-.29-.26-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.12-.16.25-.63.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.99-1.22-.74-.65-1.23-1.46-1.37-1.71-.14-.25-.01-.39.11-.51.12-.13.27-.34.41-.51.14-.17.18-.29.27-.48.09-.19.04-.36-.04-.5-.08-.14-.6-1.45-.82-1.98-.18-.43-.37-.4-.51-.41z" />
                      </svg>
                      WhatsApp
                    </a>
                  )}

                  {sucursal.maps_url && (
                    <a
                      href={sucursal.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-turquoise hover:text-turquoise"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M21.71 11.29l-9-9a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42zM14 14.5V12h-2.5a3.5 3.5 0 0 0-3.5 3.5v.5H6.5v-.5A5.5 5.5 0 0 1 12 10h2V7.5l3.5 3.5z" />
                      </svg>
                      Cómo llegar
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-foreground/60">
            Próximamente más información sobre nuestras tiendas.
          </p>
        )}
      </div>
    </section>
  );
}
