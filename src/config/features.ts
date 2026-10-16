// Feature flags. Set in Vercel (or .env.local) and rebuild to apply.

// When false, /solicitud shows ApplicationsClosed and the landing buttons point to /novedades.
export const APPLICATIONS_OPEN = import.meta.env.VITE_APPLICATIONS_OPEN === 'true'
