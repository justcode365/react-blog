import React, { Component } from 'react'
import Item from './Item'
import Pagination from './Pagination'
import './Articles.css'

export default class Articles extends Component {
  render() {
    const { articles, articlesCount, page_no, setPage } = this.props
    console.warn(setPage)

    return (
      <div className="Articles">
        {articles.map((post, i) => <Item key={i} post={post} />)}
        <Pagination current={page_no + 1} onChange={setPage} />
      </div>
    )
  }
}
