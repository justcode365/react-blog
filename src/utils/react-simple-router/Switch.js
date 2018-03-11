import React from 'react'
import { Consumer } from './Router'
import matchPath from './utils/match'

class Switch extends React.Component {
  render() {
    const { children, router } = this.props

    let child
    React.Children.forEach(children, element => {
      if (!child) {
        const { path, exact } = element.props

        if (matchPath(path, router, exact)) {
          child = element
        }
      }
    })

    return child ? React.cloneElement(child) : null
  }
}

export default props => <Consumer>{({ router }) => <Switch {...props} router={router} />}</Consumer>
