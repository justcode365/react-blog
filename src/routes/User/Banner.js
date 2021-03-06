import React, { Component } from 'react'
import { Settings } from 'react-feather'
import styled from 'styled-components'
import { Redirect } from 'utils/react-simple-router'
import { Consumer } from '../../App'

export default class Banner extends Component {
  state = { profile: {}, redirect: false }

  async componentDidMount() {
    const { username } = this.props
    const token = localStorage.getItem('token')

    const options = token ? { headers: { authorization: token } } : {}
    const res = await fetch(`${window.API}/profiles/${username}`, options)

    const { profile } = await res.json()
    this.setState({ profile })
  }

  handleFollow = async e => {
    const { username } = this.props

    const res = await fetch(`${window.API}/profiles/${username}/follow`, {
      method: this.state.profile.following ? 'delete' : 'post',
      headers: { authorization: localStorage.getItem('token') }
    })
    const { profile } = await res.json()
    this.setState({ profile })
  }

  render() {
    const { profile, redirect } = this.state

    if (redirect) return <Redirect to="/settings" />
    return (
      <Section>
        <img src={profile.image} alt="" />
        <h2>{profile.username}</h2>
        <p style={{ color: '#aaa' }}>{profile.bio}</p>
        <div className="container">
          <Consumer>
            {({ user }) =>
              user.username === profile.username ? (
                <button onClick={() => this.setState({ redirect: true })}>
                  <Settings size="14" style={{ marginRight: 5 }} /> Edit Profile Settings
                </button>
              ) : (
                <button onClick={this.handleFollow}>
                  + {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
                </button>
              )
            }
          </Consumer>
        </div>
      </Section>
    )
  }
}

const Section = styled.section`
  background-color: #f3f3f3;
  text-align: center;
  padding: 30px 100px 20px;
  margin-bottom: 30px;

  img {
    width: 100px;
    border-radius: 50%;
  }

  button {
    float: right;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  button:hover {
    background-color: #ccc;
  }

  div {
    max-width: 800px;
    overflow: hidden; /* BFC */
  }

  button {
    border: 1px solid #999;
    background-color: transparent;
    color: #999;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    padding: 0 10px;
  }
`
