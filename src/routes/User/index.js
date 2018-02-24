import React, { Component, Fragment } from 'react'
import { Consumer } from 'routes'
import Tabs from 'components/Tabs'
import Articles from 'components/Articles'
import { Settings } from 'react-feather'

import './User.css'

class User extends Component {
  state = {
    articles: [],
    articlesCount: 0,
    tabs: ['My Articles', 'Favorited Articles'],
    activeTabIndex: 0,
    page_no: 0
  }
  componentDidMount() {
    console.log('User mount')
    this.fetchArticles('My Articles')
  }

  fetchArticles = async (tagname, page_no = 0) => {
    let activeTabIndex = 0
    let queryName = 'author'

    if (tagname === 'Favorited Articles') {
      activeTabIndex = 1
      queryName = 'favorited'
    }
    const { matchParams: { user: username } } = this.props

    const url = `${process.env.REACT_APP_API}/articles?${queryName}=${username}&limit=5&offset=0`
    const res = await fetch(url)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no, activeTabIndex })
  }

  render() {
    const { articles, tabs, activeTabIndex, articlesCount, page_no } = this.state
    const { user = {} } = this.props
    console.log()

    return (
      <Fragment>
        <section className="User">
          <img src={user.image} alt="" />
          <h2>{user.username}</h2>
          <p style={{ color: '#aaa' }}>{user.bio}</p>
          <div className="container">
            {user.username === this.props.matchParams.user ? (
              <button>
                <Settings size="14" style={{ marginRight: 5 }} /> Edit Profile Settings
              </button>
            ) : (
              <button> + Follow {user.username}</button>
            )}
          </div>
        </section>

        <section className="User-articles">
          <Tabs {...{ tabs, activeTabIndex, fetchArticles: this.fetchArticles }} />
          <Articles articles={articles} articlesCount={articlesCount} page_no={page_no} />
        </section>
      </Fragment>
    )
  }
}

export default ({ matchParams }) => (
  <Consumer>{context => <User {...context} matchParams={matchParams} />}</Consumer>
)
