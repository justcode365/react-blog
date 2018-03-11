import React, { Component } from 'react'
import styled, { css } from 'styled-components'

export default class Pagination extends Component {
  render() {
    const { onChange, current, total } = this.props

    return (
      <Ul>
        {[...new Array(total).keys()].map(i => (
          <li key={i}>
            <A onClick={() => onChange(i + 1)} active={current === i + 1}>
              {i + 1}
            </A>
          </li>
        ))}
      </Ul>
    )
  }
}

const Ul = styled.ul`
  list-style: none;
  border-radius: 4px;
  padding: 0;

  li {
    display: inline-block;
  }
`

const A = styled.a`
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  margin-left: -1px;
  margin-top: -1px;
  cursor: pointer;
  color: var(--green);

  &:hover {
    background-color: #eceeef;
  }

  ${props =>
    props.active &&
    css`
      border: 1px solid var(--green);
      background-color: var(--green);
      color: #fff;
    `};
`
