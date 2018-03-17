import React, { Component } from 'react'
import { Link, Redirect } from 'utils/react-simple-router'
import Form from 'components/Form'
import Button from 'components/Button'
import styled from 'styled-components'
import { Consumer } from '../App'

export default () => <Consumer>{context => <SignUp {...context} />}</Consumer>

class SignUp extends Component {
  state = { username: '', email: '', password: '', errors: null, redirect: false }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { username, email, password } = this.state
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user: { username, email, password } })
    }

    const res = await fetch(`${window.API}/users`, options)
    const info = await res.json()
    if (info.errors) {
      this.setState({ errors: info.errors })
      return
    }

    this.props.setUser(info.user)
    this.setState({ redirect: true })
  }

  render() {
    const { username, email, password, errors, redirect } = this.state

    if (redirect) return <Redirect to="/" />

    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          <header>
            <h1>Sign Up</h1>
            <Link to="/signin">Have an account?</Link>
          </header>

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
              type="text"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
              value={username}
            />
          </p>
          <p>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </p>
          <p>
            <Button size="big" type="submit">
              Sign up
            </Button>
          </p>
        </Form>
      </SignWrapper>
    )
  }
}

export const SignWrapper = styled.div`
  width: 600px;
  margin: 0 auto;

  a {
    color: var(--green);
  }

  p:last-child {
    text-align: right;
  }
`
