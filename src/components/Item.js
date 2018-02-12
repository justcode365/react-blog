import React from 'react'
import Like from './Like'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Section = styled.section`
  border-top: 1px solid #ddd;
  padding: 20px 0;

  .date {
    color: #bbb;
    font-size: 10px;
    margin-top: 3px;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
  }

  .username {
    flex: 1;
  }

  .tagList > span {
    display: inline-block;
    height: 20px;
    padding: 3px 10px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 5px;
    border-radius: 20px;
    border: 1px solid #ccc;
    color: #ccc;
  }
`

export default ({ post }) => (
  <Section>
    <div>
      <img src={post.author.image} alt="avatar" />
      <div className="username">
        <Link to={'@' + post.author.username}>{post.author.username}</Link>
        <p className="date">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <Like />
    </div>
    <Link to={'/article/' + post.slug}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </Link>
    <div>
      <Link to={'/article/' + post.slug}>Read more...</Link>
      <div className="tagList">{post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</div>
    </div>
  </Section>
)
