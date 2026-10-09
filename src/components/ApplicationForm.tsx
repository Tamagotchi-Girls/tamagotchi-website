import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { submitApplication } from '../lib/api'
import PixelButton from './PixelButton'

interface FormData {
  name: string
  career: string
  semester: string
  institutionalEmail: string
  github: string
  motivation: string
}

interface FormErrors {
  name?: string
  career?: string
  semester?: string
  institutionalEmail?: string
  motivation?: string
}

const SEMESTER_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1))

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-[10px] text-black mb-1.5">
      {children}{required && <span className="text-[#f5a0c8] ml-1">*</span>}
    </label>
  )
}

function ErrorMsg({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="font-mono text-[8px] mt-1 px-2 py-1 border-l-2 border-[#f5a0c8]"
          style={{ color: '#c0004e', background: '#fff0f6' }}
          role="alert"
        >
          ⚠ {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

const inputClass = `w-full border-2 border-black px-3 py-2 font-mono text-[11px] bg-white
  focus:outline-none focus:border-[#c5a0e8] focus:shadow-[2px_2px_0_#c5a0e8] transition-all`

export default function ApplicationForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>({
    name: '', career: '', semester: '', institutionalEmail: '', github: '', motivation: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'El nombre es obligatorio.'
    if (!form.career.trim()) e.career = 'La carrera es obligatoria.'
    if (!form.semester) e.semester = 'Selecciona tu semestre.'
    if (!form.institutionalEmail.trim()) {
      e.institutionalEmail = 'El correo es obligatorio.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.institutionalEmail)) {
      e.institutionalEmail = 'Ingresa un correo válido.'
    }
    if (!form.motivation.trim()) e.motivation = 'Este campo es obligatorio.'
    else if (form.motivation.trim().length < 30) e.motivation = 'Cuéntanos un poco más (mínimo 30 caracteres).'
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErr = document.querySelector('[data-error-field]')
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    setSubmitError(null)
    try {
      await submitApplication({
        name: form.name.trim(),
        career: form.career.trim(),
        semester: form.semester,
        institutionalEmail: form.institutionalEmail.trim(),
        github: form.github.trim(),
        motivation: form.motivation.trim(),
      })
      navigate('/solicitud/exito')
    } catch (err: any) {
      setSubmitError(err.message || 'Error al enviar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 grid-bg" style={{ background: '#b3eef5' }}>
      <div className="max-w-2xl mx-auto">
        {/* Status tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1" style={{ background: '#a8e890' }}>
            <span className="font-mono text-black text-[8px]">● NEW_APPLICATION.form — ready</span>
          </div>
        </motion.div>

        {/* Form window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="retro-window"
        >
          {/* Window bar */}
          <div className="flex items-center justify-between px-3 py-2" style={{ background: '#c5a0e8' }}>
            <div className="flex gap-1">
              <div className="w-2 h-2 border border-black/20" style={{ background: '#f5a0c8' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#ffe857' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#a8e890' }} />
            </div>
            <span className="font-mono text-black text-[9px]">SOLICITUD DE INGRESO</span>
            <span className="font-mono text-black text-[8px]">v1.0</span>
          </div>

          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-6"
            >
              <h1 className="font-pixel text-[14px] md:text-[16px] leading-relaxed text-black mb-1">
                SOLICITUD DE INGRESO
              </h1>
              <p className="font-body text-sm text-black/60">Cuéntanos un poco sobre ti.</p>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                {/* Nombre */}
                <div data-error-field={errors.name ? 'name' : undefined}>
                  <FieldLabel htmlFor="name" required>Nombre completo:</FieldLabel>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    aria-required="true"
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    aria-invalid={!!errors.name}
                    placeholder="Tu nombre completo"
                  />
                  <span id="err-name"><ErrorMsg msg={errors.name} /></span>
                </div>

                {/* Carrera */}
                <div data-error-field={errors.career ? 'career' : undefined}>
                  <FieldLabel htmlFor="career" required>Carrera:</FieldLabel>
                  <input
                    id="career"
                    name="career"
                    type="text"
                    value={form.career}
                    onChange={handleChange}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.career}
                    placeholder="Ej: Ingeniería en Computación"
                  />
                  <ErrorMsg msg={errors.career} />
                </div>

                {/* Semestre */}
                <div data-error-field={errors.semester ? 'semester' : undefined}>
                  <FieldLabel htmlFor="semester" required>Semestre:</FieldLabel>
                  <select
                    id="semester"
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.semester}
                  >
                    <option value="">— Selecciona tu semestre —</option>
                    {SEMESTER_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}° semestre</option>
                    ))}
                  </select>
                  <ErrorMsg msg={errors.semester} />
                </div>

                {/* Email */}
                <div data-error-field={errors.institutionalEmail ? 'institutionalEmail' : undefined}>
                  <FieldLabel htmlFor="institutionalEmail" required>Correo electrónico institucional:</FieldLabel>
                  <input
                    id="institutionalEmail"
                    name="institutionalEmail"
                    type="email"
                    value={form.institutionalEmail}
                    onChange={handleChange}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.institutionalEmail}
                    placeholder="tu.nombre@universidad.edu"
                  />
                  <ErrorMsg msg={errors.institutionalEmail} />
                </div>

                {/* GitHub */}
                <div>
                  <FieldLabel htmlFor="github">Link de perfil de GitHub: <span className="text-black/40">(opcional)</span></FieldLabel>
                  <input
                    id="github"
                    name="github"
                    type="url"
                    value={form.github}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://github.com/tu-usuario"
                  />
                </div>

                {/* Motivation */}
                <div data-error-field={errors.motivation ? 'motivation' : undefined}>
                  <FieldLabel htmlFor="motivation" required>¿Por qué te gustaría ser parte de Tamagotchi Girls Org?</FieldLabel>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={form.motivation}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-y min-h-[100px]`}
                    aria-required="true"
                    aria-invalid={!!errors.motivation}
                    placeholder="Cuéntanos sobre ti, tus intereses y por qué quieres unirte..."
                  />
                  <ErrorMsg msg={errors.motivation} />
                </div>

                {/* Submit error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-2 border-black px-4 py-3 font-mono text-[9px]"
                      style={{ background: '#fff0f6', borderColor: '#f5a0c8' }}
                      role="alert"
                    >
                      ⚠ {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="pixel-btn w-full font-pixel text-[9px] px-4 py-3 border-2 border-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: '#ffe857', boxShadow: '4px 4px 0 #1a1a2e' }}
                    whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!loading ? { scale: 0.98, x: 2, y: 2, boxShadow: '2px 2px 0 #1a1a2e' } : {}}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                          className="inline-block"
                        >
                          ◌
                        </motion.span>
                        ENVIANDO...
                      </span>
                    ) : 'ENVIAR SOLICITUD ▸'}
                  </motion.button>
                </div>

                <p className="font-mono text-[8px] text-black/40 text-center">
                  Los campos marcados con <span className="text-[#f5a0c8]">*</span> son obligatorios.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
