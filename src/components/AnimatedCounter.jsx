import React, { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = '', prefix = '', decimals = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest)
  })

  useEffect(() => {
    if (inView) {
      const animation = animate(count, to, { duration })
      return animation.stop
    }
  }, [inView, count, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default AnimatedCounter 