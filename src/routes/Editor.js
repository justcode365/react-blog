import React, { Component } from 'react'
import { Consumer } from '../App'
import Form from '../components/Form'
import { SignWrapper } from './SignUp'

class Editor extends Component {
  state = { email: '', password: '', error: '' }
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
        this.setState({ error: 'email or password is invalid' })
        return
      }

      localStorage.setItem('token', 'Token ' + info.user.token)
      this.props.redirect('/')
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, error } = this.state

    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          {error && <li className="form-error">{error}</li>}

          <p>
            <input
              type="text"
              placeholder="Article Title"
              name="title"
              value={email}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder="What's this article about?"
              name="title"
              value={email}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <textarea
              placeholder="Write your article (in markdown)"
              name="title"
              value={email}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder="Enter tags"
              name="title"
              value={email}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <input type="submit" name="password" value="Publish Article" />
          </p>
        </Form>
      </SignWrapper>
    )
  }
}

export default () => <Consumer>{context => <Editor {...context} />}</Consumer>
