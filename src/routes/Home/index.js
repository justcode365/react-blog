import React, { Component } from 'react'
import Articles from 'components/Articles'
import Taglist from './Taglist'
import './Home.css'

export default class Home extends Component {
  state = {
    activeTab: 'Global Feed',
    articles: [],
    articlesCount: 0,
    page: 1
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.fetchFeed()
    } else {
      this.fetchArticles('Global Feed')
    }
  }

  fetchArticles = async (tagname, page = 1) => {
    let tagQuery = ''
    if (tagname !== 'Global Feed') {
      tagQuery = `tag=${tagname}&`
    }
    const queryString = `?${tagQuery}limit=5&offset=${page - 1}`
    const res = await fetch(`${process.env.REACT_APP_API}/articles${queryString}`)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page, activeTab: tagname })
  }

  fetchFeed = async (page = 1) => {
    const queryString = `?limit=5&offset=${page - 1}`

    const res = await fetch(`${process.env.REACT_APP_API}/articles/feed${queryString}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page })
  }

  render() {
    const { activeTab, articles, articlesCount, page } = this.state
    return (
      <div>
        {!localStorage.getItem('token') && (
          <section className="Home-banner">
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </section>
        )}

        <main className="Home-main container">
          <div className="Home-articles">
            <ul className="tabs">
              {localStorage.getItem('token') && (
                <li className={activeTab === 'Your Feed' ? 'active' : ''}>
                  <a>Your Feed</a>
                </li>
              )}

              <li className={activeTab === 'Global Feed' ? 'active' : ''}>
                <a>Global Feed</a>
              </li>

              {activeTab !== 'Global Feed' && (
                <li className="active">
                  <a># {activeTab}</a>
                </li>
              )}
            </ul>
            <Articles
              setPage={page => {
                activeTab === 'Your Feed'
                  ? this.fetchFeed(page)
                  : this.fetchArticles(activeTab, page)
              }}
              articles={articles}
              articlesCount={articlesCount}
              page={page}
            />
          </div>

          <Taglist fetchArticles={this.fetchArticles} />
        </main>
      </div>
    )
  }
}
