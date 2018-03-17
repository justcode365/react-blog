import React, { Component } from 'react'
import ItemList from 'components/ItemList'
import Tabs, { Tab } from 'components/Tabs'
import Taglist from './Taglist'
import styled from 'styled-components'

export default class Home extends Component {
  token = localStorage.getItem('token')

  state = {
    activeTab: this.token ? 'Your Feed' : 'Global Feed',
    articles: [],
    articlesCount: 0,
    page: 1
  }

  componentDidMount() {
    try {
      if (this.token) {
        this.fetchFeed()
      } else {
        this.fetchArticles('Global Feed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  fetchArticles = async (tagname, page = 1) => {
    let tagQuery = ''
    if (tagname !== 'Global Feed') {
      tagQuery = `tag=${tagname}&`
    }
    const queryString = `?${tagQuery}limit=10&offset=${page - 1}`
    const res = await fetch(`${window.API}/articles${queryString}`)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page, activeTab: tagname })
    window.scrollTo(0, 0)
  }

  fetchFeed = async (page = 1) => {
    const queryString = `?limit=10&offset=${page - 1}`

    const res = await fetch(`${window.API}/articles/feed${queryString}`, {
      headers: { authorization: this.token }
    })
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page, activeTab: 'Your Feed' })
    window.scrollTo(0, 0)
  }

  toggleLike = index => {
    const { favorited, slug } = this.state.articles[index]
    const options = {
      method: favorited ? 'delete' : 'post',
      headers: { authorization: this.token }
    }
    fetch(`${window.API}/articles/${slug}/favorite`, options)
      .then(res => res.json())
      .then(data => {
        const articles = [...this.state.articles]
        articles[index] = data.article
        this.setState({ articles })
      })
  }

  render() {
    const { activeTab, articles, articlesCount, page } = this.state

    return (
      <div>
        {!this.token && (
          <Banner>
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </Banner>
        )}

        <Main className="container">
          <div style={{ flex: 1, marginRight: 20 }}>
            <Tabs activeKey={activeTab}>
              {this.token && (
                <Tab key="Your Feed">
                  <a onClick={() => this.fetchFeed(page)}>Your Feed</a>
                </Tab>
              )}

              <Tab key="Global Feed">
                <a onClick={() => this.fetchArticles('Global Feed')}>Global Feed</a>
              </Tab>

              {activeTab !== 'Global Feed' &&
                activeTab !== 'Your Feed' && (
                  <Tab key={activeTab}>
                    <a># {activeTab}</a>
                  </Tab>
                )}
            </Tabs>

            <ItemList
              setPage={page => {
                activeTab === 'Your Feed'
                  ? this.fetchFeed(page)
                  : this.fetchArticles(activeTab, page)
              }}
              toggleLike={this.toggleLike}
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
  padding-bottom: 50px;
`
