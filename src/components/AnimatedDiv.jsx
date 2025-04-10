import React from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

function AnimatedDiv({ children }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <div ref={ref} className={`animated-div ${isVisible ? 'visible' : ''}`}>
        {children}
    </div>
  )
}

export default AnimatedDiv