// API and Backend configuration
// When deployed on Vercel or Netlify, set VITE_API_URL in the dashboard environment variables
// Example: VITE_API_URL=https://brotherhood-backend.onrender.com
const defaultBackendHost = typeof window !== "undefined" && window.location.hostname === "localhost" 
  ? "http://localhost:8000" 
  : "http://127.0.0.1:8000";

export const BACKEND_URL = (import.meta.env.VITE_API_URL || defaultBackendHost).replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;
