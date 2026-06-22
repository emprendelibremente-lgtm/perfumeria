"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import PerfumesGrid from "@/components/PerfumesGrid";

const FILTROS = ["Todos", "Hombre", "Mujer", "Unisex"];

export default function CatalogoPage() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function fetchPerfumes() {
      const { data } = await supabase
        .from("perfumes")
        .select("*")
        .order("nombre");
      setPerfumes(data ?? []);
      setLoading(false);
    }
    fetchPerfumes();
  }, []);

  const perfumesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return perfumes.filter((perfume) => {
      const coincideGenero = filtro === "Todos" || perfume.genero === filtro;
      const coincideBusqueda =
        !termino ||
        perfume.nombre?.toLowerCase().includes(termino) ||
        perfume.marca?.toLowerCase().includes(termino);
      return coincideGenero && coincideBusqueda;
    });
  }, [perfumes, filtro, busqueda]);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Catálogo</h1>
          <p className="mt-3 text-foreground/60">
            Explora nuestra selección de fragancias originales
          </p>
        </div>

        {/* Filtros y buscador */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FILTROS.map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() => setFiltro(opcion)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filtro === opcion
                    ? "bg-turquoise text-background"
                    : "border border-border text-foreground/70 hover:border-turquoise hover:text-turquoise"
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>

          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre o marca..."
            className="w-full max-w-xs rounded-full border border-border bg-surface px-5 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-turquoise focus:outline-none"
          />
        </div>

        {/* Resultados */}
        <div className="mt-12">
          {loading ? (
            <p className="text-center text-foreground/60">
              Cargando catálogo...
            </p>
          ) : (
            <PerfumesGrid
              perfumes={perfumesFiltrados}
              emptyMessage="No se encontraron perfumes con estos criterios."
            />
          )}
        </div>
      </div>
    </section>
  );
}
