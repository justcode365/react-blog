import React from 'react'
import styled from 'styled-components'
const linkClick = () => {}

export default ({ post }) => (
  <div>
    <Content href={'/article/' + post.slug}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </Content>
    <ItemLink>
      <a href={'/article/' + post.slug} onClick={linkClick}>
        Read more...
      </a>
      <Tags>{post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</Tags>
    </ItemLink>
  </div>
)

const Tags = styled.div`
  & > span {
    display: inline-block;
    padding: 1px 6px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 20px;
    border: 1px solid #ccc;
    color: #aaa;
  }
`

const Content = styled.a`
  color: inherit;
  & > p {
    font-weight: 300;
    color: #999;
    font-size: 1rem;
    margin-top: 0;
  }
`

const ItemLink = styled.a`
  display: flex;
  justify-content: space-between;
  & > a {
    color: #bbb;
    font-size: 0.8rem;
    font-weight: 300;
    flex-basis: 200px;
  }
`
