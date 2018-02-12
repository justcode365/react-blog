import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background-color: #f3f3f3;
  text-align: center;
  padding: 30px 100px;

  img {
    width: 100px;
    border-radius: 50%;
  }

  button {
    float: right;
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

class Profile extends Component {
  state = { profile: {}, articles: [], articlesCount: 0 }
  async componentDidMount() {
    const { username } = this.props.match.params

    const [profilePromise, articlesPromise] = await Promise.all([
      fetch(`${process.env.REACT_APP_API}/profiles/${username}`),
      fetch(`${process.env.REACT_APP_API}/articles?author=${username}&limit=5&offset=0`)
    ])

    const { profile } = await profilePromise.json()
    const { articles, articlesCount } = await articlesPromise.json()
    this.setState({ profile, articles, articlesCount })
  }

  render() {
    const { profile, articles, articlesCount } = this.state
    return (
      <Fragment>
        <Section>
          <img src={profile.image} alt="" />
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <div className="container">
            <button>+ Follow {profile.username}</button>
          </div>
        </Section>
      </Fragment>
    )
  }
}

export default Profile
