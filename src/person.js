import React from 'react'
import './Tag.css'

function Person ({ Icon, Name, Title, Organization }) {
  return (
    <div className="person">
      <div className="left" >
        <img src={Icon} width="100%"/>
      </div>
      <div className="right">
        <p>{Name}&nbsp;&nbsp; {Title}</p>
        <p>{Organization}</p>
        <p>北京航空航天大学</p>
      </div>
    </div>
  )
}

export default Person