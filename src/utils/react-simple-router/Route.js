import React, { Component } from 'react'
import { Consumer } from './Router'
import matchPath from './utils/match'

class Route extends Component {
  render() {
    const { component, path, router, exact } = this.props
    const match = matchPath(path, router, exact)

    return match ? React.createElement(component, { match }) : null
  }
}

export default props => <Consumer>{({ router }) => <Route {...props} router={router} />}</Consumer>
