import { env } from "cloudflare:workers";
export function database(){if(!env.DB)throw new Error("Waitlist storage unavailable");return env.DB;}
export async function tokenHash(token:string){const data=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(token));return Array.from(new Uint8Array(data),v=>v.toString(16).padStart(2,"0")).join("");}
export function validOrigin(request:Request){const origin=request.headers.get("origin");return origin!==null&&origin===new URL(request.url).origin;}
