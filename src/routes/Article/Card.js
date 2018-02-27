import React from 'react'
import './Card.css'

export default ({ content, footer }) => (
  <div className="Card">
    <div className="Card-content">{content}</div>
    <div className="Card-footer">{footer}</div>
  </div>
)
