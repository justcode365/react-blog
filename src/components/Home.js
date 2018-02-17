import React, { Component } from 'react'
import Item from 'components/Item'
import Tabs from 'components/Tabs'
import './Home.css'

export default class Home extends Component {
  state = { tags: [], articles: [], articlesCount: 0, page_no: 0 }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const [tagsResponse, userPromise, feedPromise] = await Promise.all([
        fetch(`${process.env.REACT_APP_API}/tags`),
        fetch(`${process.env.REACT_APP_API}/user`, {
          header: { authorization: token }
        }),
        fetch(`${process.env.REACT_APP_API}/articles/feed?limit=10&offset=0`, {
          header: { authorization: token }
        })
      ])
    } else {
      const [tagsResponse, articlesPromise] = await Promise.all([
        fetch(`${process.env.REACT_APP_API}/tags`),
        fetch(`${process.env.REACT_APP_API}/articles?limit=5&offset=0`)
      ])

      const { tags } = await tagsResponse.json()
      const { articles, articlesCount } = await articlesPromise.json()
      this.setState({ tags, articles, articlesCount })
    }
  }

  setPage = async index => {
    const { page_no } = this.state
    const res = await fetch(
      `${process.env.REACT_APP_API}/articles?limit=5&offset=${page_no + index * 10}`
    )

    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no: page_no + index })
  }

  getTagArticles = async tag => {
    const res = await fetch(`${process.env.REACT_APP_API}/articles?tag=${tag}&limit=5&offset=0`)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no: 0 })
  }

  render() {
    const { tags, articles, articlesCount, page_no } = this.state

    return (
      <div className="Home">
        {!localStorage.getItem('token') && (
          <section className="Banner">
            <h1>React Blog</h1>
            <h3>A place to share your knowledge.</h3>
          </section>
        )}

        <section className="Blog container">
          <main>
            <Tabs tabs={['Your Feed', 'Global Feed']} activeIndex={0} />
            {articles.map((post, i) => <Item key={i} post={post} />)}
            <p>
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.setPage(-1)
                }}
              >
                {'<'}
              </a>
              {page_no + 1}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.setPage(+1)
                }}
              >
                {'>'}
              </a>
              共 {articlesCount}
            </p>
          </main>
          <aside>
            <p>Popular Tags</p>
            {tags.map(tag => (
              <a
                href=""
                key={tag}
                onClick={e => {
                  e.preventDefault()
                  this.getTagArticles(tag)
                }}
              >
                {tag}
              </a>
            ))}
          </aside>
        </section>
      </div>
    )
  }
}
