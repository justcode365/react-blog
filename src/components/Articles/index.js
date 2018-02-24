import React, { Component } from 'react'
import Item from './Item'
import './Articles.css'

export default class TagList extends Component {
  render() {
    const { articles, articlesCount, page_no, fetchArticles } = this.props

    return (
      <div className="Articles">
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
      </div>
    )
  }
}