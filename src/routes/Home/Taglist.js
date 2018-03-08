import React, { Component } from 'react'
import styled from 'styled-components'

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
      <Taglist>
        <h4>Popular Tags</h4>
        {tags ? (
          <div>
            {tags.map(tag => (
              <a key={tag} onClick={() => this.props.fetchArticles(tag)}>
                {tag}
              </a>
            ))}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </Taglist>
    )
  }
}

const Taglist = styled.div`
  width: 24%;
  padding: 10px;
  background-color: #f3f3f3;
  border-radius: 5px;

  a {
    color: #fff;
    font-size: 0.8rem;
    display: inline-block;
    padding: 0.1rem 0.6rem;
    border-radius: 10rem;
    background-color: #818a91;
    margin-top: 0.4rem;
    margin-right: 3px;
    cursor: pointer;
  }

  a:hover {
    background-color: #687077;
  }
`
