import React, { Component } from 'react'
import styled from 'styled-components'

export default class Pagination extends Component {
  render() {
    const { onChange, current } = this.props

    return (
      <Ul>
        <li>
          <a className={current === 1 ? 'disabled' : ''} onClick={() => onChange(current - 1)}>
            {'<'}
          </a>
        </li>
        <li>
          <a className={current === 1 ? 'active' : ''}>1</a>
        </li>
        <li>
          <a className={current === 2 ? 'active' : ''}>2</a>
        </li>
        <li>
          <a className="disabled">...</a>
        </li>
        <li>
          <a>100</a>
        </li>
        <li>
          <a onClick={() => onChange(current + 1)}>{'>'}</a>
        </li>
      </Ul>
    )
  }
}

const Ul = styled.ul`
  text-align: right;

  li {
    margin-right: 8px;
  }

  li a {
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  li a:hover {
    background-color: #eceeef;
  }

  li a.active {
    border: 1px solid var(--green);
    background-color: var(--green);
    color: #fff;
  }
`
