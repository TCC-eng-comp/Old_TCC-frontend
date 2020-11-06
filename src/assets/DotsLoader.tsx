import React from 'react'

import { motion } from 'framer-motion'

interface DotsLoaderProps {
  size: number
  dotSize: number
  color: string
}

const DotsLoader: React.FC<DotsLoaderProps> = ({ size = 36, dotSize = 8, color = '#FCFCFC' }) => {
  const loadingContainer = {
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'space-around',
  }

  const loadingCircle = {
    display: 'block',
    width: dotSize,
    height: dotSize,
    backgroundColor: color,
    borderRadius: '50%',
  }

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const loadingCircleVariants = {
    start: {
      y: '50%',
    },
    end: {
      y: '150%',
    },
  }

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  }

  return (
    <motion.div
      className='DotsLoader'
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial='start'
      animate='end'
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />

      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />

      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  )
}

export default DotsLoader
