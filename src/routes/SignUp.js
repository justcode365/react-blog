import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from 'components/Form'
import Button from 'components/Button'
import styled from 'styled-components'

export default class SignUp extends Component {
  handleChange = () => {}

  handleSubmit = () => {}
  render() {
    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          <header>
            <h1>Sign Up</h1>
            <Link to="/signin">Have an account?</Link>
          </header>
          <p>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
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
