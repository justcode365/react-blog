import React, { Component } from 'react'
import './Comment.css'

export default class Comment extends Component {
  state = { text: '' }

  render() {
    return (
      <form className="Comment">
        <textarea />
      </form>
    )
  }
}
