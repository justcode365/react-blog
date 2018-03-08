import React, { Component } from 'react'
import Pagination from './Pagination'
import ItemInfo from './ItemInfo'
import ItemContent from './ItemContent'
import styled from 'styled-components'

export default class Articles extends Component {
  render() {
    const { articles, page, setPage } = this.props

    return (
      <div>
        {articles.map((post, i) => (
          <Section key={i}>
            <ItemInfo post={post} />
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
