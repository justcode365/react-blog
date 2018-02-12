import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const Form = styled.form`
  width: 600px;
  margin: 0 auto;
  text-align: center;

  input[type='text'] {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 20px;
    padding: 5px 20px;
  }

  input[type='submit'] {
    float: right;
    border: none;
    color: #fff;
    padding: 15px 23px;
    border-radius: 5px;
    font-size: 18px;
    background-color: #5cb85c;
    cursor: pointer;
  }
`

class SignIn extends Component {
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
    const data = await res.json()

    this.props.dispatch({ type: '@login', data })
    this.setState({ email: '', password: '', redirectToHome: true })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, redirectToHome } = this.state

    if (redirectToHome) return <Redirect to="/" />
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        <Link to="register">Need an account?</Link>
        <p>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
            name="email"
          />
        </p>
        <p>
          <input
            type="text"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            name="password"
          />
        </p>

        <p>
          <input type="submit" value="Sign in" />
        </p>
      </Form>
    )
  }
}

export default connect()(SignIn)
