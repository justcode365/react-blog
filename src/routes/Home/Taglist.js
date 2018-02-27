import React, { Component } from 'react'

export default class TagList extends Component {
  state = { tags: [] }

  async componentDidMount() {
    const res = await fetch(`${process.env.REACT_APP_API}/tags`)
    const { tags } = await res.json()
    this.setState({ tags })
  }

  render() {
    const { tags } = this.state

    return (
      <div className="Home-taglist">
        <h4>Popular Tags</h4>
        {tags ? (
          <div>
            {tags.map(tag => (
              <a href="/" key={tag} className="Tag" onClick={() => this.props.fetchArticles(tag)}>
                {tag}
              </a>
            ))}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    )
  }
}
