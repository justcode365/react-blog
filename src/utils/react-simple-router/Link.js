import React, { Component } from 'react'
import { Consumer } from './Router'

class Link extends Component {
  handleClick = e => {
    if (this.props.onClick) this.props.onClick(e)

    e.preventDefault() // 阻止页面跳转刷新
    const { to, redirect } = this.props
    redirect(to)
  }

  render() {
    const { to, children, redirect, ...props } = this.props

    return (
      <a href={to} {...props} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export default props => (
  <Consumer>{({ redirect }) => <Link {...props} redirect={redirect} />}</Consumer>
)
