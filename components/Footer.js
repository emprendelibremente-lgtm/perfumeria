import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { INSTAGRAM_URL, WHATSAPP_NUMBER, getWhatsAppLink } from "@/lib/constants";

export default async function Footer() {
  const { data: sucursales } = await supabase
    .from("sucursales")
    .select("nombre, direccion")
    .order("id");

  return (
    <footer className="border-t border-border bg-footer px-6 py-12 text-sm text-foreground/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-foreground">
              FRAGANCIAS
            </span>
            <span className="text-foreground/30">|</span>
            <span className="font-script text-2xl text-turquoise">
              perfumería
            </span>
          </Link>
          <p className="mt-3 max-w-xs">
            Fragancias originales y de lujo en San Cristóbal, Venezuela.
          </p>
          <p className="mt-1 max-w-xs">
            Consulta precios, disponibilidad y retiros por WhatsApp.
          </p>
        </div>

        {sucursales?.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-foreground/70">
              Nuestras tiendas
            </h3>
            {sucursales.map((sucursal) => (
              <p key={sucursal.nombre}>
                {sucursal.nombre} — {sucursal.direccion}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-foreground/70">Contacto</h3>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-turquoise"
          >
            WhatsApp: +{WHATSAPP_NUMBER}
          </a>
          {INSTAGRAM_URL && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-turquoise"
            >
              Instagram
            </a>
          )}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs">
        © {new Date().getFullYear()} Fragancias Perfumería
      </p>
    </footer>
  );
}
