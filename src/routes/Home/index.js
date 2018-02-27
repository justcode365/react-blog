import React, { Component } from 'react'
import Tabs, { Tab } from 'components/Tabs'
import Articles from 'components/Articles'
import Taglist from './Taglist'
import { Consumer } from 'routes'
import './Home.css'

export default class Home extends Component {
  state = {
    tabs: ['Global Feed'],
    activeTabIndex: 0,
    articles: [],
    articlesCount: 0,
    page_no: 0
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.fetchFeed()
    } else {
      this.fetchArticles('Global Feed')
    }
  }

  fetchArticles = async (tagname, page_no = 0) => {
    let tagQuery = ''
    let tabs = ['Global Feed']
    let activeTabIndex = 0
    if (tagname !== 'Global Feed') {
      tagQuery = `tag=${tagname}&`
      tabs = ['Global Feed', tagname]
      activeTabIndex = 1
    }
    const queryString = `?${tagQuery}limit=5&offset=${page_no}`

    const res = await fetch(`${process.env.REACT_APP_API}/articles${queryString}`)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no, tabs, activeTabIndex })
  }

  fetchFeed = async (page_no = 0) => {
    const res = await fetch(`${process.env.REACT_APP_API}/articles/feed?limit=5&offset=0`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    const { articles, articlesCount } = await res.json()
    const tabs = ['Your Feed', 'Global Feed']
    const activeTabIndex = 0
    this.setState({ articles, articlesCount, page_no, tabs, activeTabIndex })
  }

  render() {
    const { tabs, activeTabIndex, articles, articlesCount, page_no } = this.state

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
            <Tabs>
              {tabs.map((tab, i) => (
                <Tab key={i} active={i === activeTabIndex}>
                  <a
                    onClick={tab => {
                      if (tab !== 'Global Feed') {
                        this.fetchArticles('Global Feed')
                      } else {
                        this.fetchFeed()
                      }
                    }}
                  >
                    {tab}
                  </a>
                </Tab>
              ))}
            </Tabs>
            <Articles
              setPage={page => {
                this.fetchArticles(tabs[activeTabIndex], page)
              }}
              articles={articles}
              articlesCount={articlesCount}
              page_no={page_no}
            />
          </div>

          <Taglist fetchArticles={this.fetchArticles} />
        </main>
      </div>
    )
  }
}
