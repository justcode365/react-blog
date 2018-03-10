import React from 'react'
import { Heart } from 'react-feather'
import styled, { css } from 'styled-components'

export default ({ post, onClick }) => (
  <Button favorited={post.favorited} onClick={onClick}>
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

  svg {
    fill: var(--green);
    color: var(--green);
    margin-right: 3px;
  }

  &:hover {
    background-color: var(--green);
    color: #fff;
  }

  &:hover svg {
    fill: #fff;
    color: #fff;
  }

  ${props =>
    props.favorited &&
    css`
      background-color: var(--green);
      color: #fff;
      svg {
        fill: #fff;
        color: #fff;
      }

      &:hover {
        background-color: #449d44;
      }
    `};
`
