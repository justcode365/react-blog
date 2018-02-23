import React, { Component, Fragment } from 'react'
import { Consumer } from 'routes'
import './User.css'

export default class User extends Component {
  state = { articles: [], articlesCount: 0 }
  async componentDidMount() {
    // const { username } = this.props.match.params
    // const res = await fetch(
    //   `${process.env.REACT_APP_API}/articles?author=${username}&limit=5&offset=0`
    // )
    // const { profile } = await profilePromise.json()
    // const { articles, articlesCount } = await articlesPromise.json()
    // this.setState({ profile, articles, articlesCount })
  }

  render() {
    const { articles } = this.state
    return (
      <Fragment>
        <Consumer>
          {({ user = {} }) => (
            <section className="User">
              <img src={user.image} alt="" />
              <h2>{user.username}</h2>
              <p>{user.bio}</p>
              <div className="container">
                <button>+ Follow {user.username}</button>
              </div>
            </section>
          )}
        </Consumer>
      </Fragment>
    )
  }
}
