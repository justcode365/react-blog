import React, { Component } from 'react'
import Articles from 'components/Articles'
import Tabs from 'components/Tabs'
import Taglist from './Taglist'
import styled from 'styled-components'

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
          <Banner>
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </Banner>
        )}

        <Main className="container">
          <div style={{ flex: 1, marginRight: 10 }}>
            <Tabs>
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
            </Tabs>
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
        </Main>
      </div>
    )
  }
}

const Banner = styled.section`
  background-color: var(--green);
  color: #fff;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 0;
  }

  p {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 0;
  }
`

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

// const Articles = styled.div`
//   flex: 1;
//   margin-right: 20px;
// `
