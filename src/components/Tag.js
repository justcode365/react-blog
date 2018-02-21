import React from 'react'
import './Tag.css'

export default ({ children, onClick }) => (
  <a
    href="/"
    className="Tag"
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    {children}
  </a>
)
