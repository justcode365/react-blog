import React, { Component } from 'react'
import { Consumer } from './Router'

class Redirect extends Component {
  componentDidMount() {
    const { to, redirect } = this.props
    redirect(to)
  }

  render() {
    return null
  }
}

export default props => (
  <Consumer>{({ redirect }) => <Redirect {...props} redirect={redirect} />}</Consumer>
)
