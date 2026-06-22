"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PerfumeCard from "@/components/PerfumeCard";

const PAGE_SIZE = 12;
const GENDERS = ["Todos", "Hombre", "Mujer", "Unisex"];

export default function PerfumesGrid({
  perfumes,
  emptyMessage = "Muy pronto encontrarás aquí nuestra selección de fragancias.",
}) {
  const [data, setData] = useState(perfumes ?? []);
  const [loading, setLoading] = useState(perfumes === undefined);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("Todos");
  const [categoria, setCategoria] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (perfumes !== undefined) return;

    let active = true;
    async function fetchPerfumes() {
      const { data, error } = await supabase
        .from("perfumes")
        .select("*")
        .order("nombre");

      if (active) {
        setData(data ?? []);
        setError(error);
        setLoading(false);
      }
    }
    fetchPerfumes();
    return () => {
      active = false;
    };
  }, [perfumes]);

  const list = perfumes ?? data;

  if (loading) {
    return <p className="text-center text-foreground/60">Cargando...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error al cargar perfumes: {error.message}
      </p>
    );
  }

  if (!list.length) {
    return <p className="text-center text-foreground/60">{emptyMessage}</p>;
  }

  const filtered = list
    .filter((p) => gender === "Todos" || p.genero === gender)
    .filter((p) => !categoria || p.categoria === categoria)
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        p.nombre?.toLowerCase().includes(q) ||
        p.marca?.toLowerCase().includes(q)
      );
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleGender(g) {
    setGender(g);
    setPage(1);
  }

  function handleCategoria() {
    setCategoria((prev) => (prev === "Estuche" ? null : "Estuche"));
    setPage(1);
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar fragancia o marca..."
        className="w-full mb-4 px-4 py-2 rounded-lg bg-[#111] border border-[#333] text-white placeholder-white/40 focus:outline-none focus:border-turquoise"
      />

      <div className="flex flex-wrap gap-2 mb-3">
        {GENDERS.map((g) => (
          <button
            key={g}
            onClick={() => handleGender(g)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              gender === g
                ? "bg-turquoise text-black border-turquoise"
                : "bg-transparent text-white/70 border-white/30 hover:border-turquoise hover:text-turquoise"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleCategoria}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            categoria === "Estuche"
              ? "bg-turquoise text-black border-turquoise"
              : "bg-transparent text-white/70 border-white/30 hover:border-turquoise hover:text-turquoise"
          }`}
        >
          Estuches
        </button>
      </div>

      <p className="text-sm text-foreground/60 mb-6">
        {filtered.length > 0
          ? `${filtered.length} fragancias encontradas`
          : "No encontramos fragancias con ese criterio."}
      </p>

      {paginated.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {paginated.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-5 py-2 rounded-lg border border-turquoise text-turquoise bg-transparent hover:bg-turquoise hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-sm text-foreground/60">
            Página {safePage} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-5 py-2 rounded-lg border border-turquoise text-turquoise bg-transparent hover:bg-turquoise hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
