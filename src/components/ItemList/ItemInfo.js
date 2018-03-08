import React from 'react'
import Like from './Like'
import styled from 'styled-components'

export default ({ post }) => (
  <ItemInfo>
    <img src={post.author.image || process.env.PUBLIC_URL + '/img/unknow.png'} alt="avatar" />
    <ItemUser>
      <a href={'@' + post.author.username} onClick={() => {}}>
        {post.author.username}
      </a>
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
