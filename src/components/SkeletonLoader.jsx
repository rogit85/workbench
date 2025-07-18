import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLoader = ({ type = 'text', className = '' }) => {
  const baseClasses = 'bg-gray-200 rounded animate-pulse relative overflow-hidden'
  
  const typeClasses = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    card: 'h-64 w-full',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32',
    image: 'h-48 w-full'
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <div className="flex items-start justify-between mb-4">
      <SkeletonLoader type="avatar" />
      <SkeletonLoader type="button" className="w-20" />
    </div>
    <SkeletonLoader type="title" className="mb-3" />
    <SkeletonLoader type="text" className="mb-2" />
    <SkeletonLoader type="text" className="w-4/5 mb-4" />
    <div className="flex items-center space-x-4">
      <SkeletonLoader type="button" className="w-24" />
      <SkeletonLoader type="text" className="w-16" />
    </div>
  </div>
)

export default SkeletonLoader 