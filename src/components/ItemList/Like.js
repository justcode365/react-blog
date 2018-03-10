import React from 'react'
import { Heart } from 'react-feather'
import styled from 'styled-components'

export default ({ post }) => (
  <Button>
    <Heart size={12} />
    {post.favoritesCount}
  </Button>
)

const Button = styled.button`
  width: 45px;
  height: 28px;
  border-radius: 4px;
  color: var(--green);
  border: 1px solid var(--green);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--green);
    color: #fff;
  }

  svg {
    fill: var(--green);
    color: var(--green);
    margin-right: 3px;
  }

  &:hover svg {
    fill: #fff;
    color: #fff;
  }
`
