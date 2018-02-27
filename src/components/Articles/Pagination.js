import React, { Component } from 'react'
import './Pagination.css'

export default class Pagination extends Component {
  render() {
    const { onChange, current } = this.props

    return (
      <ul className="Pagination">
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
      </ul>
    )
  }
}
