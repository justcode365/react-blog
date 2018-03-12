import React, { Component } from 'react'
import Form from 'components/Form'
import Button from 'components/Button'
import { Link, Redirect } from 'utils/react-simple-router'
import { SignWrapper } from './SignUp'
import { Consumer } from '../App'

class SignIn extends Component {
  state = { email: '', password: '', errors: null, redirect: false }
  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state

    const url = 'https://conduit.productionready.io/api/users/login'
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    }

    try {
      const res = await fetch(url, options)
      const info = await res.json()
      if (info.errors) {
        this.setState({ errors: info.errors })
        return
      }

      this.props.setUser(info.user)
      this.setState({ redirect: true })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, errors, redirect } = this.state

    if (redirect) return <Redirect to="/" />

    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          <header>
            <h1>Sign In</h1>

            <Link to="/signup">Need an account?</Link>
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
              autoComplete="email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Button size="big" type="submit">
              Sign in
            </Button>
          </p>
        </Form>
      </SignWrapper>
    )
  }
}

export default () => <Consumer>{context => <SignIn {...context} />}</Consumer>
