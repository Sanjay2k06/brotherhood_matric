// API and Backend configuration
// In local development, connects to local backend
// When deployed on Vercel/Netlify, connects automatically to Render backend (or custom VITE_API_URL)
const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const defaultBackendHost = isLocal 
  ? "http://localhost:8000" 
  : "https://brotherhood-api-ysb1.onrender.com";

let rawBackendUrl = (import.meta.env.VITE_API_URL || defaultBackendHost).trim();
// Auto-correct any typo in hostname (e.g. ysbt -> ysb1)
rawBackendUrl = rawBackendUrl.replace("brotherhood-api-ysbt.onrender.com", "brotherhood-api-ysb1.onrender.com");

export const BACKEND_URL = rawBackendUrl.replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;
