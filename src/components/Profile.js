import React, { Component, Fragment } from 'react'

export default class Profile extends Component {
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
    const { profile } = this.state
    return (
      <Fragment>
        <section className="Profile">
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
