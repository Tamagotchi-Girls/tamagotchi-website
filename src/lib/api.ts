export interface ApplicationData {
  name: string
  career: string
  semester: string
  institutionalEmail: string
  github: string
  motivation: string
  website: string // honeypot: real users leave it empty
}

export interface ApplicationResponse {
  success: boolean
  message: string
  alreadySubmitted?: boolean
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || null

const GENERIC_ERROR = 'No pudimos enviar tu solicitud, intenta de nuevo :('
const BUSY_ERROR = 'Hay muchas solicitudes ahora mismo, intenta de nuevo en unos minutos :('
const DOMAIN_ERROR = 'Usa tu correo institucional de tu universidad (udg.mx - tec.mx - iteso.mx ó similar).'

function errorMessageFor(code: unknown): string {
  switch (code) {
    case 'rate_limit':
    case 'quota':
    case 'busy':
      return BUSY_ERROR
    case 'invalid_domain':
      return DOMAIN_ERROR
    default:
      return GENERIC_ERROR
  }
}

export async function submitApplication(data: ApplicationData): Promise<ApplicationResponse> {
  if (!APPS_SCRIPT_URL) {
    // Demo mode: simulate network delay and success without hitting any real endpoint.
    console.warn('VITE_APPS_SCRIPT_URL no está definida: modo demo')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return { success: true, message: 'Application received (demo mode).' }
  }

  let res: Response
  try {
    res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: data.name,
        career: data.career,
        semester: data.semester,
        institutionalEmail: data.institutionalEmail,
        github: data.github,
        motivation: data.motivation,
        website: data.website,
      }),
    })
  } catch {
    throw new Error(GENERIC_ERROR)
  }

  let json: any = null
  try {
    json = await res.json()
  } catch {
    // JSON parse failed but the request itself succeeded; treat as success.
  }

  if (json && json.success === false) {
    if (json.error === 'duplicate') {
      return { success: true, message: 'Solicitud ya registrada.', alreadySubmitted: true }
    }
    throw new Error(errorMessageFor(json.error))
  }

  return { success: true, message: 'Solicitud enviada correctamente.' }
}
