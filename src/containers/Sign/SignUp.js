import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import Input from 'components/Input'
import Section from './Style.js'

class SignUp extends Component {
  handleChange = () => {}
  render() {
    return (
      <Section>
        <form className="SignIn">
          <h1>Sign Up</h1>
          <Link to="login">Have an account?</Link>
          <p>
            <Input placeholder="Username" name="username" onChange={this.handleChange} />
          </p>
          <p>
            <Input placeholder="Email" name="email" onChange={this.handleChange} />
          </p>
          <p>
            <Input placeholder="Password" name="password" onChange={this.handleChange} />
          </p>
          <p className="signin">
            <Button type="submit">Sign up</Button>
          </p>
        </form>
      </Section>
    )
  }
}

export default SignUp
