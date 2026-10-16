import { motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { APPLICATIONS_OPEN } from '../config/features'

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onNovedades = pathname === '/novedades' || pathname.startsWith('/novedades/')

  const target = onNovedades ? '/' : APPLICATIONS_OPEN ? '/solicitud' : '/novedades'
  const label = onNovedades ? 'VOLVER AL INICIO' : APPLICATIONS_OPEN ? 'ME INTERESA' : 'NOVEDADES'

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="fixed top-0 left-0 z-50 p-4 md:p-8"
    >
      <button
        onClick={() => navigate(target)}
        className="pixel-btn font-pixel text-[10px] px-3 py-1.5 bg-[#ffe857] border-2 border-black cursor-pointer whitespace-nowrap"
        style={{ boxShadow: '3px 3px 0 #1a1a2e' }}
      >
        {label}
      </button>
    </motion.header>
  )
}
