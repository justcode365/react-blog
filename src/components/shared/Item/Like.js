import React from 'react'
import './Like.css'

export default ({ count, liked }) => (
  <div className={'Like ' + liked ? 'liked' : ''}>
    <i />
    <div>{count}</div>
  </div>
)
