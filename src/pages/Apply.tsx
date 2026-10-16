import { Routes, Route } from 'react-router-dom'
import { APPLICATIONS_OPEN } from '../config/features'
import ApplicationForm from '../components/ApplicationForm'
import SuccessState from '../components/SuccessState'
import ApplicationsClosed from '../components/ApplicationsClosed'

export default function Apply() {
  if (!APPLICATIONS_OPEN) return <ApplicationsClosed />

  return (
    <Routes>
      <Route index element={<ApplicationForm />} />
      <Route path="exito" element={<SuccessState />} />
    </Routes>
  )
}
