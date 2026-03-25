import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

let _anonActor: backendInterface | null = null;
export async function getAnonymousActor(): Promise<backendInterface> {
  if (_anonActor) return _anonActor;
  _anonActor = await createActorWithConfig();
  return _anonActor;
}
