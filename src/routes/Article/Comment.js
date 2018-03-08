import React, { Component } from 'react'
import './Comment.css'

export default class Comment extends Component {
  state = { text: '' }

  render() {
    return (
      <form
        style={{
          width: 100,
          height: 60,
          border: '1px solid #e5e5e5'
        }}
      >
        <textarea />
      </form>
    )
  }
}
