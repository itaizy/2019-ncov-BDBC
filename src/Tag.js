import React from 'react'
import './Tag.css'

function Tag ({ children, number, className }) {
  return (
    <div className="tag">
      <div className={className}>
        { number }
      </div>
      { children }
    </div>
  )
}

export default Tag