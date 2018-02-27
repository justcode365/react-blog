import React, { Component, Fragment } from 'react'
import { Consumer } from 'routes'
import Tabs, { Tab } from 'components/Tabs'
import Articles from 'components/Articles'
import { Settings } from 'react-feather'

import './User.css'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      articlesCount: 0,
      tabs: ['My Articles', 'Favorited Articles'],
      activeTabIndex: 0,
      page_no: 0
    }
  }

  componentDidMount() {
    console.log('User mount')
    const { activeTabIndex, tabs } = this.state

    this.fetchArticles(tabs[activeTabIndex])
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.match.path.includes('favorites') &&
      this.props.match.path.includes('favorites')
    ) {
      this.fetchArticles('Favorited Articles')
    }
  }

  fetchArticles = async (tagname, page_no = 0) => {
    let activeTabIndex = 0
    let queryName = 'author'

    if (tagname === 'Favorited Articles') {
      activeTabIndex = 1
      queryName = 'favorited'
    }
    const { params: { user: username } } = this.props.match

    const url = `${process.env.REACT_APP_API}/articles?${queryName}=${username}&limit=5&offset=0`
    const res = await fetch(url)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no, activeTabIndex })
  }

  render() {
    const { articles, tabs, activeTabIndex, articlesCount, page_no } = this.state
    const { user = {}, match, redirect, linkClick } = this.props

    return (
      <Fragment>
        <section className="User">
          <img src={user.image} alt="" />
          <h2>{user.username}</h2>
          <p style={{ color: '#aaa' }}>{user.bio}</p>
          <div className="container">
            {user.username === match.params.user ? (
              <button onClick={() => redirect('/settings')}>
                <Settings size="14" style={{ marginRight: 5 }} /> Edit Profile Settings
              </button>
            ) : (
              <button> + Follow {user.username}</button>
            )}
          </div>
        </section>

        <section className="User-articles">
          <Tabs>
            {tabs.map((tab, i) => (
              <Tab key={i} active={i === activeTabIndex}>
                <a
                  href={`/@${user.username}${tab === 'Favorited Articles' ? '/favorites' : ''}`}
                  onClick={linkClick}
                >
                  {tab}
                </a>
              </Tab>
            ))}
          </Tabs>
          <Articles articles={articles} articlesCount={articlesCount} page_no={page_no} />
        </section>
      </Fragment>
    )
  }
}

export default ({ match }) => <Consumer>{context => <User {...context} match={match} />}</Consumer>
