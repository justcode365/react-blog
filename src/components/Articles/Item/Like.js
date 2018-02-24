import React from 'react'
import { Heart } from 'react-feather'

export default ({ count, liked }) => (
  <button className="Articles-like">
    <Heart size={12} />
    {count}
  </button>
)
