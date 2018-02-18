import React, { Component } from 'react'
import Input, { TextArea } from 'components/Input'
import Button from 'components/Button'
import Section from './Settings'
import { fetchUser, updateUser } from 'actions/user'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Settings extends Component {
  state = { image: '', username: '', bio: '', email: '', password: '', redirectToHome: false }

  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.setState({ ...nextProps.user })
    }

    if (this.props.user) {
      console.warn(1111)
    }
  }

  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleUpdate = e => {
    e.preventDefault()
    debugger
    const { image, username, bio, email, password } = this.state
    const user = { image, username, bio, email, password }
    this.props.dispatch(updateUser(user))
  }

  render() {
    const { image, username, bio, email, password, redirectToHome } = this.state

    if (redirectToHome) return <Redirect to="/" />

    return (
      <Section>
        <h1>Your Settings</h1>
        <p>
          <Input
            name="image"
            onChange={this.handleChange}
            placeholder="URL of profile picture"
            value={image}
          />
        </p>
        <p>
          <Input
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={username}
          />
        </p>
        <p>
          <TextArea
            name="bio"
            onChange={this.handleChange}
            placeholder="Short bio about you"
            value={bio}
          />
        </p>
        <p>
          <Input name="email" onChange={this.handleChange} placeholder="Email" value={email} />
        </p>
        <p>
          <Input
            name="password"
            onChange={this.handleChange}
            value={password}
            placeholder="New Password"
          />
        </p>

        <p className="update">
          <Button onClick={this.handleUpdate}>Update Settings</Button>
        </p>

        <Button type="danger">Or click here to logout.</Button>
      </Section>
    )
  }
}

export default connect(({ user }) => ({ user }))(Settings)
