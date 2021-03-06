import React, { Component } from 'react'
import Form from 'components/Form'
import Button from 'components/Button'
import styled from 'styled-components'
import { Redirect } from 'utils/react-simple-router'
import { Consumer } from '../App'

class Settings extends Component {
  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    token: '',
    redirect: false,
    errors: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.username) {
      const { image, username, bio, email, token } = nextProps.user
      return { image, username, bio, email, token }
    }

    return null
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { image, username, bio, email, token, password } = this.state
    const user = { image, username, bio, email, password }

    const res = await fetch(`${window.API}/user`, {
      method: 'PUT',
      headers: {
        authorization: 'Token ' + token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user })
    })

    const info = await res.json()

    if (info.errors) {
      this.setState({ errors: info.errors })
      return
    }

    this.props.setUser(info.user)
    this.setState({ redirect: true })
  }

  handleLogOut = () => {
    this.props.removeUser()
    this.setState({ redirect: true })
  }

  render() {
    const { image, username, bio, email, password, redirect, errors } = this.state
    if (redirect) return <Redirect to="/" />

    return (
      <div style={{ width: 600 }} className="container">
        <Form onSubmit={this.handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>Your Settings</h1>

          {errors && (
            <ul style={{ color: 'var(--red)', fontWeight: 'bold' }}>
              {Object.keys(errors).map((key, i) => (
                <li key={i}>
                  {key} {errors[key].join(', ')}
                </li>
              ))}
            </ul>
          )}

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
              autoComplete="off"
            />
          </p>

          <Submit>
            <Button size="big" type="submit" name="update">
              Update Settings
            </Button>
          </Submit>
        </Form>
        <p>
          <Button danger onClick={this.handleLogOut}>
            Or click here to logout
          </Button>
        </p>
      </div>
    )
  }
}

export default () => <Consumer>{context => <Settings {...context} />}</Consumer>

const Submit = styled.p`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`
