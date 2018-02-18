import React, { Component } from 'react'
import './Settings.css'

export default class Settings extends Component {
  render() {
    return (
      <section className="container Settings">
        <h1>Your Settings</h1>
        <input
          className="input"
          type="text"
          style={{
            fontSize: 30
          }}
        />
      </section>
    )
  }
}
