import { Geist, Geist_Mono, Cormorant_Garamond, Dancing_Script } from "next/font/google";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import Footer from "@/components/Footer";
import CarritoFlotante from "@/components/CarritoFlotante";
import { CarritoProvider } from "@/context/CarritoContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["700"],
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Fragancias Perfumería | Perfumes originales en San Cristóbal",
    template: "%s | Fragancias Perfumería",
  },
  description:
    "Perfumería en San Cristóbal, Venezuela. Catálogo de fragancias originales y de lujo. Consulta disponibilidad, precios y retiros por WhatsApp.",
  keywords: [
    "perfumes",
    "fragancias",
    "perfumería",
    "San Cristóbal",
    "Venezuela",
    "perfumes originales",
    "perfumes de lujo",
  ],
  openGraph: {
    title: "Fragancias Perfumería | Perfumes originales en San Cristóbal",
    description:
      "Perfumería en San Cristóbal, Venezuela. Catálogo de fragancias originales y de lujo. Consulta disponibilidad, precios y retiros por WhatsApp.",
    locale: "es_VE",
    type: "website",
  },
};

const NAV_LINKS = [
  { href: "/#novedades", label: "Novedades" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#como-comprar", label: "Cómo Comprar" },
  { href: "/tiendas", label: "Tiendas" },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CarritoProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
              <Link
                href="/"
                className="flex items-baseline gap-2 whitespace-nowrap"
              >
                <span className="font-serif text-xl font-bold text-foreground">
                  FRAGANCIAS
                </span>
                <span className="text-foreground/30">|</span>
                <span className="font-script text-2xl text-turquoise">
                  perfumería
                </span>
              </Link>

              <div className="hidden items-center gap-8 text-sm font-medium md:flex">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 transition-colors hover:text-turquoise"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href={getWhatsAppLink(
                  "Hola, me gustaría conocer más sobre sus fragancias."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
              >
                WhatsApp
              </a>
            </nav>
          </header>

          <main className="flex flex-1 flex-col">{children}</main>

          <Footer />

          <CarritoFlotante />
        </CarritoProvider>
      </body>
    </html>
  );
}
