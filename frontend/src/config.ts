// API and Backend configuration
// In local development, connects to local backend
// When deployed on Vercel/Netlify, connects automatically to Render backend (or custom VITE_API_URL)
const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const defaultBackendHost = isLocal 
  ? "http://localhost:8000" 
  : "https://brotherhood-api-ysbt.onrender.com";

export const BACKEND_URL = (import.meta.env.VITE_API_URL || defaultBackendHost).replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;
