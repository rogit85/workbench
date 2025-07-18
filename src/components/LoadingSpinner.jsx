import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'medium', color = 'sompo-red' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className={`absolute inset-0 rounded-full border-4 border-gray-200`}></div>
        <div className={`absolute inset-0 rounded-full border-4 border-${color} border-t-transparent`}></div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner 