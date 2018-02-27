import React, { Component } from 'react'
import Item from './Item'
import Pagination from './Pagination'
import './Articles.css'

export default class Articles extends Component {
  render() {
    const { articles, articlesCount, page_no, fetchArticles } = this.props

    return (
      <div className="Articles">
        {articles.map((post, i) => <Item key={i} post={post} />)}
        <Pagination page={1} />
      </div>
    )
  }
}
