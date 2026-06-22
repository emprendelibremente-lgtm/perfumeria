export const WHATSAPP_NUMBER = "584247435402";

export const INSTAGRAM_URL = ""; // TODO: agregar la URL de Instagram, ej. "https://instagram.com/fragancias.perfumeria"

export function buildWhatsAppLink(number, message = "") {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getWhatsAppLink(message = "") {
  return buildWhatsAppLink(WHATSAPP_NUMBER, message);
}
