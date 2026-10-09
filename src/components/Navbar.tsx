import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="fixed top-0 left-0 z-50 p-4 md:p-8"
    >
      <button
        onClick={() => navigate('/solicitud')}
        className="pixel-btn font-pixel text-[10px] px-3 py-1.5 bg-[#ffe857] border-2 border-black cursor-pointer"
        style={{ boxShadow: '3px 3px 0 #1a1a2e' }}
      >
        ME INTERESA
      </button>
    </motion.header>
  )
}
