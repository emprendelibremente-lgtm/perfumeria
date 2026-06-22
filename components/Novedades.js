"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PerfumeCard from "@/components/PerfumeCard";

const NOMBRES_DESTACADOS = [
  "Sauvage Eau de Parfum",
  "Bleu de Chanel",
  "Good Girl Eau de Parfum",
  "Libre Eau De Parfum",
  "Miss Dior Eau de Parfum",
  "La Vie Est Belle Eau De Parfum",
  "212 VIP Rose",
  "Eros",
  "Donna Born in Roma",
  "La Belle",
  "Erba Pura",
  "Ombré Leather",
];

export default function Novedades() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchDestacados() {
      const { data } = await supabase
        .from("perfumes")
        .select("*")
        .in("nombre", NOMBRES_DESTACADOS);

      if (active) {
        const orden = new Map(NOMBRES_DESTACADOS.map((n, i) => [n, i]));
        const ordenados = (data ?? []).sort(
          (a, b) => (orden.get(a.nombre) ?? 99) - (orden.get(b.nombre) ?? 99)
        );
        setPerfumes(ordenados);
        setLoading(false);
      }
    }
    fetchDestacados();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-center text-foreground/60">Cargando...</p>;
  }

  if (!perfumes.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
}
