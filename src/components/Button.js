import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
  --red: #b85c5c;
  border: none;
  color: #fff;
  padding: 15px 23px;
  border-radius: 5px;
  font-size: 18px;
  background-color: var(--main-color);
  cursor: pointer;

  &:hover {
    background-color: #449d44;
  }

  ${props =>
    props.danger &&
    css`
      background-color: #fff;
      color: var(--red);
      border: 1px solid var(--red);
      &:hover {
        background-color: var(--red);
        color: #fff;
      }
    `};
`

export default Button
