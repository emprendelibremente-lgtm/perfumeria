import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function getAdminSessionToken() {
  return crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD || "")
    .update("fragancias-admin")
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value === getAdminSessionToken();
}
