"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

const STORAGE_KEY = "carrito-fragancias";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial desde localStorage tras el montaje para evitar mismatch de hidratación
      if (guardado) setCarrito(JSON.parse(guardado));
    } catch {
      // localStorage no disponible o datos corruptos
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito, hidratado]);

  function agregarAlCarrito(perfume) {
    setCarrito((prev) => {
      if (prev.some((p) => p.id === perfume.id)) return prev;
      return [...prev, perfume];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  }

  function limpiarCarrito() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
}
