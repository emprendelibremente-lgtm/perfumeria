"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Contraseña incorrecta.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 rounded-2xl border border-border bg-surface p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Panel de Administración</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Ingresa la contraseña para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Contraseña"
          autoFocus
          className="rounded-full border border-border bg-background px-5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-turquoise focus:outline-none"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-turquoise-light disabled:opacity-60"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
