import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

export { Consumer }

export default class Router extends Component {
  constructor(props) {
    super(props)

    const { pathname } = window.location
    this.state = { router: pathname }
  }

  componentDidMount() {
    // 浏览器 前进 后退
    window.onpopstate = e => {
      this.setState({ router: e.state.pathname })
    }
  }

  redirect = pathname => {
    this.setState({ router: pathname })
    window.history.pushState({ pathname }, '', pathname) // 改变 地址
  }

  render() {
    const { router } = this.state
    return <Provider value={{ redirect: this.redirect, router }}>{this.props.children}</Provider>
  }
}
