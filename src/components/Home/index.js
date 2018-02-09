import React, { Component, Fragment } from 'react'
import Article from '../Article'

const API = 'https://conduit.productionready.io/api'

class Home extends Component {
  state = { tags: [], articles: [], articlesCount: 0, page_no: 0 }

  async componentDidMount() {
    // 并行请求
    const [tagsResponse, articlesPromise] = await Promise.all([
      fetch(`${API}/tags`),
      fetch(`${API}/articles?limit=5&offset=0`)
    ])

    const { tags } = await tagsResponse.json()
    const { articles, articlesCount } = await articlesPromise.json()
    this.setState({ tags, articles, articlesCount })
  }

  setPage = async index => {
    const { page_no } = this.state
    const res = await fetch(
      `${API}/articles?limit=5&offset=${page_no + index * 10}`
    )

    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no: page_no + index })
  }

  getTagArticles = async tag => {
    const res = await fetch(`${API}/articles?tag=${tag}&limit=5&offset=0`)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no: 0 })
  }

  render() {
    const { tags, articles, articlesCount, page_no } = this.state

    return (
      <Fragment>
        <section className="App-banner">
          <h1>React Blog</h1>
          <h3>A place to share your knowledge.</h3>
        </section>

        <div className="App-blog container">
          <main>
            <h3>
              <a href="#">Global Feed</a>
            </h3>
            {articles.map((post, i) => <Article key={i} post={post} />)}
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
        </div>
      </Fragment>
    )
  }
}

export default Home
