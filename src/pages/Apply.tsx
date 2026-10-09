import { Routes, Route } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import SuccessState from '../components/SuccessState'

export default function Apply() {
  return (
    <Routes>
      <Route index element={<ApplicationForm />} />
      <Route path="exito" element={<SuccessState />} />
    </Routes>
  )
}
