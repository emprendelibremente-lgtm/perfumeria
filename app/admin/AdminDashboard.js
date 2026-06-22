"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const GENEROS = ["Hombre", "Mujer", "Unisex"];

const EMPTY_FORM = {
  nombre: "",
  marca: "",
  genero: "Unisex",
  tipo: "",
  descripcion: "",
  imagen_url: "",
  disponible: true,
  tiempo_llegada: "",
};

const inputClass =
  "rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-turquoise focus:outline-none";

export default function AdminDashboard() {
  const router = useRouter();
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPerfumes();
  }, []);

  async function fetchPerfumes() {
    setLoading(true);
    const { data } = await supabase
      .from("perfumes")
      .select("*")
      .order("nombre");
    setPerfumes(data ?? []);
    setLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function openNewForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setFormOpen(true);
  }

  function openEditForm(perfume) {
    setEditingId(perfume.id);
    setForm({
      nombre: perfume.nombre ?? "",
      marca: perfume.marca ?? "",
      genero: perfume.genero ?? "Unisex",
      tipo: perfume.tipo ?? "",
      descripcion: perfume.descripcion ?? "",
      imagen_url: perfume.imagen_url ?? "",
      disponible: Boolean(perfume.disponible),
      tiempo_llegada: perfume.tiempo_llegada ?? "",
    });
    setError("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.nombre.trim() || !form.marca.trim()) {
      setError("Nombre y marca son obligatorios.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      genero: form.genero,
      tipo: form.tipo.trim(),
      descripcion: form.descripcion.trim(),
      imagen_url: form.imagen_url.trim(),
      disponible: form.disponible,
      tiempo_llegada: form.disponible ? null : form.tiempo_llegada.trim(),
    };

    console.log("payload:", JSON.stringify({ id: editingId, ...payload }));

    const response = await fetch("/api/admin/perfumes", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    setSaving(false);

    if (!response.ok) {
      setError("No se pudo guardar el perfume. Intenta de nuevo.");
      return;
    }

    closeForm();
    fetchPerfumes();
  }

  async function toggleDisponible(perfume) {
    const disponible = !perfume.disponible;
    const tiempo_llegada = disponible ? null : perfume.tiempo_llegada;

    setPerfumes((prev) =>
      prev.map((p) =>
        p.id === perfume.id ? { ...p, disponible, tiempo_llegada } : p
      )
    );

    await fetch("/api/admin/perfumes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: perfume.id, disponible, tiempo_llegada }),
    });
  }

  async function updateTiempoLlegada(perfume, value) {
    setPerfumes((prev) =>
      prev.map((p) =>
        p.id === perfume.id ? { ...p, tiempo_llegada: value } : p
      )
    );

    await fetch("/api/admin/perfumes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: perfume.id, tiempo_llegada: value }),
    });
  }

  async function handleDelete(perfume) {
    if (
      !window.confirm(
        `¿Eliminar "${perfume.nombre}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    setPerfumes((prev) => prev.filter((p) => p.id !== perfume.id));
    await fetch("/api/admin/perfumes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: perfume.id }),
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Panel de Administración
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            {perfumes.length} perfumes registrados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openNewForm}
            className="rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light"
          >
            + Agregar Perfume
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-turquoise hover:text-turquoise"
          >
            Salir
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-foreground/60">Cargando perfumes...</p>
      ) : perfumes.length === 0 ? (
        <p className="text-center text-foreground/60">
          Aún no hay perfumes registrados.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{perfume.nombre}</h3>
                  <span className="text-sm text-foreground/60">
                    {perfume.marca}
                  </span>
                  {perfume.genero && (
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground/60">
                      {perfume.genero}
                    </span>
                  )}
                  {perfume.tipo && (
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground/60">
                      {perfume.tipo}
                    </span>
                  )}
                </div>

                {!perfume.disponible && (
                  <input
                    type="text"
                    defaultValue={perfume.tiempo_llegada ?? ""}
                    onBlur={(event) =>
                      updateTiempoLlegada(perfume, event.target.value.trim())
                    }
                    placeholder="Tiempo estimado de llegada (ej. 2 semanas)"
                    className={`mt-2 max-w-xs ${inputClass}`}
                  />
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleDisponible(perfume)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    perfume.disponible
                      ? "border border-turquoise/30 bg-turquoise/10 text-turquoise"
                      : "border border-border text-foreground/60"
                  }`}
                >
                  {perfume.disponible ? "Disponible" : "Agotado"}
                </button>

                <button
                  type="button"
                  onClick={() => openEditForm(perfume)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground/70 transition-colors hover:border-turquoise hover:text-turquoise"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(perfume)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:border-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">
              {editingId ? "Editar perfume" : "Agregar perfume"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <Field label="Nombre">
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, nombre: event.target.value }))
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Marca">
                <input
                  type="text"
                  value={form.marca}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, marca: event.target.value }))
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Género">
                <select
                  value={form.genero}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, genero: event.target.value }))
                  }
                  className={inputClass}
                >
                  {GENEROS.map((genero) => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Tipo">
                <input
                  type="text"
                  value={form.tipo}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, tipo: event.target.value }))
                  }
                  placeholder="Eau de Parfum, Eau de Toilette..."
                  className={inputClass}
                />
              </Field>

              <Field label="Descripción">
                <textarea
                  value={form.descripcion}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, descripcion: event.target.value }))
                  }
                  rows={3}
                  className={inputClass}
                />
              </Field>

              <Field label="Imagen (URL)">
                <input
                  type="url"
                  value={form.imagen_url}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, imagen_url: event.target.value }))
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>

              <label className="flex items-center gap-2 text-sm text-foreground/80">
                <input
                  type="checkbox"
                  checked={form.disponible}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, disponible: event.target.checked }))
                  }
                  className="accent-turquoise"
                />
                Disponible
              </label>

              {!form.disponible && (
                <Field label="Tiempo estimado de llegada">
                  <input
                    type="text"
                    value={form.tiempo_llegada}
                    onChange={(event) =>
                      setForm((f) => ({
                        ...f,
                        tiempo_llegada: event.target.value,
                      }))
                    }
                    placeholder="Ej. 2 semanas"
                    className={inputClass}
                  />
                </Field>
              )}

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-turquoise hover:text-turquoise"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-foreground/70">{label}</span>
      {children}
    </label>
  );
}
