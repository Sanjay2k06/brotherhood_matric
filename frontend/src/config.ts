// API and Backend configuration
// When deployed on Vercel or Netlify, set VITE_API_URL in the dashboard environment variables
// Example: VITE_API_URL=https://brotherhood-backend.onrender.com
export const BACKEND_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;
