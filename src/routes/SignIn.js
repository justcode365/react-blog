import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'components/Button'
import Input from 'components/Input'
// import Section from './Style.js'

export default class SignIn extends Component {
  state = { email: '', password: '', redirectToHome: false }
  handleSubmit = async event => {
    event.preventDefault()
    const { email, password } = this.state

    const url = 'https://conduit.productionready.io/api/users/login'
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    }

    const res = await fetch(url, options)
    const { user } = await res.json()

    localStorage.setItem('token', 'Token ' + user.token)

    this.setState({ redirectToHome: true })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, redirectToHome } = this.state

    if (redirectToHome) return <Redirect to="/" />
    return (
      <Section>
        <form className="SignIn" onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <Link to="register">Need an account?</Link>
          <p>
            <Input placeholder="Email" name="email" onChange={this.handleChange} />
          </p>
          <p>
            <Input placeholder="Password" name="password" onChange={this.handleChange} />
          </p>
          <p className="signin">
            <Button type="submit">Sign in</Button>
          </p>
        </form>
      </Section>
    )
  }
}
