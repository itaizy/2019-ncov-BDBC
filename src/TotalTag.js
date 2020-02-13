import React from 'react'
import './TotalTag.css'

function TotalTag ({ children, number, total, className }) {
  return (
    <div className="totaltag">
      { children }
      <div className={className}>
        { total }
      </div>
      较昨日<div className={"total"+ className}>{ number > 0 ? ('+' + number): number}</div>
    </div>
  )
}

export default TotalTag
