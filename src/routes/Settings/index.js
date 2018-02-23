import React, { Component } from 'react'
import { Consumer } from '../index'
import './Settings.css'
import '../Sign/Sign.css'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { image: '', username: '', bio: '', email: '' }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.warn(nextProps)
    if (nextProps.user) {
      const { image, username, bio, email } = nextProps.user
      return { image, username, bio, email }
    }

    return null
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleUpdate = e => {
    e.preventDefault()
    const { image, username, bio, email } = this.state
    const user = { image, username, bio, email }
    // this.props.dispatch(updateUser(user))
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({ redirectToHome: true })
  }

  render() {
    const { image, username, bio, email } = this.state
    return (
      <form className="Settings container Form">
        <h1>Your Settings</h1>
        <p>
          <input
            name="image"
            type="text"
            onChange={this.handleChange}
            placeholder="URL of profile picture"
            value={image}
          />
        </p>
        <p>
          <input
            name="username"
            type="text"
            onChange={this.handleChange}
            placeholder="Username"
            value={username}
          />
        </p>
        <p>
          <textarea
            name="bio"
            type="text"
            onChange={this.handleChange}
            placeholder="Short bio about you"
            value={bio}
          />
        </p>
        <p>
          <input
            type="text"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
            placeholder="Email"
            value={email}
          />
        </p>
        <p>
          <input
            name="password"
            type="text"
            onChange={this.handleChange}
            // value={user.password}
            placeholder="New Password"
          />
        </p>

        <p>
          <input type="submit" onClick={this.handleUpdate} value="Update Settings" />
        </p>

        <input
          className="danger"
          type="submit"
          onClick={this.handleLogOut}
          value="Or click here to logout."
        />
      </form>
    )
  }
}

export default () => <Consumer>{({ user }) => <Settings user={user} />}</Consumer>
