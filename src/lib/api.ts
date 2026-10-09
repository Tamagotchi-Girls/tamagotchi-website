export interface ApplicationData {
  name: string
  career: string
  semester: string
  institutionalEmail: string
  github: string
  motivation: string
}

export interface ApplicationResponse {
  success: boolean
  message: string
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || null

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
      }),
    })
  } catch {
    throw new Error('No pudimos enviar tu solicitud, intenta de nuevo')
  }

  let json: any = null
  try {
    json = await res.json()
  } catch {
    // JSON parse failed but the request itself succeeded; treat as success.
  }

  if (json && json.success === false) {
    throw new Error('No pudimos enviar tu solicitud, intenta de nuevo')
  }

  return { success: true, message: 'Solicitud enviada correctamente.' }
}
