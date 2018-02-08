import React, { Component, Fragment } from 'react'
import Article from './components/Article'
import './App.css'

class App extends Component {
  state = { text: '', tags: [], articles: [], articlesCount: 0 }

  async componentDidMount() {
    // 并行请求
    const [tagsResponse, articlesPromise] = await Promise.all([
      fetch('https://conduit.productionready.io/api/tags'),
      fetch('https://conduit.productionready.io/api/articles?limit=10&offset=0')
    ])
    
    const { tags } = await tagsResponse.json()
    const { articles, articlesCount } = await articlesPromise.json()
    this.setState({ tags, articles, articlesCount })
  }

  handleClick = async () => {
    const { moduleA } = await import('./components/ModuleA')
    this.setState({ text: moduleA })
  }
  render() {
    console.log(this.state)
    const { tags, articles, articlesCount } = this.state
    return (
      <Fragment>
        <header className="App-header container">
          <h2>React Blog</h2>
          <nav>
            <ul>
              <li>Home</li>
              <li>Sign in</li>
              <li>Sign up</li>
            </ul>
          </nav>
        </header>
        <section className="App-banner">
          <h1>React Blog</h1>
          <h3>A place to share your knowledge.</h3>
        </section>

        <div className="App-blog container">
          <main>
            <h3>Global Feed</h3>
            {articles.map((post, i) => <Article key={i} post={post} />)}
            <p>
              <a href=""> {'<'} </a>
              1
              <a href=""> {'>'} </a>
               共 {articlesCount}
            </p>
          </main>
          <aside>
            <p>Popular Tags</p>
            {tags.map(tag => <a key={tag}>{tag}</a>)}
            <hr />
            <button onClick={this.handleClick}>dynamic import</button>
            Text : {this.state.text}
          </aside>
        </div>
      </Fragment>
    )
  }
}

export default App
