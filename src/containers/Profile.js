import React, { Component, Fragment } from 'react'
import './Profile.css'

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
    console.log(this.state)
    const { profile, articles, articlesCount } = this.state
    return (
      <Fragment>
        <section className="profile">
          <img src={profile.image} alt="" />
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <div className="container">
            <button>+ Follow {profile.username}</button>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default Profile
