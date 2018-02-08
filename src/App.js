import React, { Component, Fragment } from 'react'
import logo from './logo.svg'
import './App.css'
// import { moduleA } from './components/Button'

class App extends Component {
  state = { text: '', tags: [] }

  async componentDidMount() {
    const res = await fetch('https://conduit.productionready.io/api/tags')
    const { tags } = await res.json()
    this.setState({ tags })
  }

  handleClick = async () => {
    const { moduleA } = await import('./components/Button')
    console.warn(moduleA)
    this.setState({ text: moduleA })
  }
  render() {
    console.warn(this.state)
    const { tags } = this.state
    return (
      <Fragment>
        <header className="App-header">
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

        
        <div className="App-blog">
          <main>Global Feed</main>
          <aside >
            <p>Popular Tags</p>
            {tags.map(tag => <a key={tag}>{tag}</a>)}
            
            <hr/>
            <button onClick={this.handleClick}>
              Load
              {/* {moduleA} */}
            </button>
            Text : {this.state.text}
          </aside>
        </div>
      </Fragment>
    )
  }
}

export default App
