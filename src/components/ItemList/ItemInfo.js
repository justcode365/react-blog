import React from 'react'
import Like from './Like'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default ({ post }) => (
  <ItemInfo>
    <Link to={'@' + post.author.username}>
      <img src={post.author.image || process.env.PUBLIC_URL + '/img/unknow.png'} alt="avatar" />
    </Link>

    <ItemUser>
      <Link to={'@' + post.author.username}>{post.author.username}</Link>
      <p>{new Date(post.createdAt).toDateString()}</p>
    </ItemUser>

    <Like post={post} />
  </ItemInfo>
)

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    color: var(--green);
  }

  p {
    color: #bbb;
    font-size: 10px;
    margin-top: 3px;
  }
`

const ItemUser = styled.div`
  flex: 1;
  a {
    display: block;
    height: 14px;
    line-height: 14px;
  }
`
