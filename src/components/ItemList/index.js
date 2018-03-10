import React, { Component } from 'react'
import Pagination from './Pagination'
import ItemInfo from './ItemInfo'
import ItemContent from './ItemContent'
import styled from 'styled-components'

export default class ItemList extends Component {
  render() {
    const { articles, page, setPage, toggleLike } = this.props

    if (articles.length === 0)
      return (
        <div style={{ borderTop: ' 1px solid #ddd', padding: '20px 0' }}>
          <h4>No articles are here... yet.</h4>
        </div>
      )

    return (
      <div>
        {articles.map((post, index) => (
          <Section key={index}>
            <ItemInfo post={post} itemIndex={index} toggleLike={toggleLike} />
            <ItemContent post={post} />
          </Section>
        ))}
        <Pagination current={page} onChange={setPage} />
      </div>
    )
  }
}

const Section = styled.section`
  border-top: 1px solid #ddd;
  padding: 20px 0;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
  }
`
