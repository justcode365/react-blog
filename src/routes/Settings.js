import React, { Component } from 'react'
import Form from 'components/Form'
import styled from 'styled-components'

export default class Settings extends Component {
  state = { image: '', username: '', bio: '', email: '', password: '' }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && !prevState.username) {
      const { image, username, bio, email } = nextProps.user
      return { image, username, bio, email }
    }

    return null
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleUpdate = async e => {
    e.preventDefault()
    const { image, username, bio, email } = this.state
    const user = { image, username, bio, email }

    const res = await fetch(`${process.env.REACT_APP_API}/user`, {
      method: 'PUT',
      headers: {
        authorization: localStorage.getItem('token'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user })
    })

    const info = await res.json()
    this.props.setUser(info.user)
    this.props.redirect('/')
  }

  handleLogOut = () => {
    const { setUser, redirect } = this.props
    localStorage.removeItem('token')
    setUser(null)
    redirect('/')
  }

  render() {
    const { image, username, bio, email, password } = this.state
    return (
      <div style={{ width: 600 }} className="container">
        <Form>
          <h1 style={{ textAlign: 'center' }}>Your Settings</h1>
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
              type="email"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
              placeholder="Email"
              value={email}
              required
              pattern=".+@.+.com"
            />
          </p>
          <p>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              value={password}
              placeholder="New Password"
            />
          </p>

          <Submit>
            <input type="submit" onClick={this.handleUpdate} value="Update Settings" />
          </Submit>

          <input
            className="danger"
            type="submit"
            onClick={this.handleLogOut}
            value="Or click here to logout."
          />
        </Form>
      </div>
    )
  }
}

const Submit = styled.p`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`
