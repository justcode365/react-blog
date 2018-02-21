import React, { Component, createContext } from 'react'
import Home from './Home'
import Header from 'components/Header'

const router = {
  '/': Home,
  '/home': Home
  // '/login': asyncload(() => import('./SignIn'))
  // '/one': One,
  // '/async': asyncload(() => import('./components/Async')),
  // '/@:user': User
}

const routeConfig = {
  ...router,
  params: Object.keys(router).filter(v => v.includes(':'))
}

const store = {
  text: 'hello world!'
}

const ctx = createContext(store)

const { Provider, Consumer } = ctx

export { Consumer }

class Router extends Component {
  constructor() {
    super()

    const { pathname } = window.location
    this.state = { route: pathname }
  }

  componentDidMount() {
    // 浏览器 前进 后退
    window.onpopstate = e => {
      this.setState({ route: e.state.pathname })
    }
  }

  handleClick = e => {
    // 阻止页面跳转刷新
    e.preventDefault()
    const { pathname } = e.target
    console.warn(pathname)

    this.setState({ route: pathname })
    // 改变 地址
    window.history.pushState({ pathname }, '', pathname)
  }

  matchRouter = route => {
    console.log(routeConfig)
    const C = routeConfig[route]

    if (C) {
      return <C />
    } else {
      for (const param of routeConfig.params) {
        const match = route.match(new RegExp(param.replace(/:[^\s/]+/g, '([\\w-]+)')))
        if (match) {
          const D = routeConfig[param]
          const value = match[1]
          const key = param.split(':')[1].split('/')[0]
          return <D params={{ [key]: value }} />
        } else {
          throw new Error('路由有错误')
        }
      }
    }
  }

  render() {
    const { route } = this.state
    return (
      <Provider value={{ router: this.handleClick }}>
        <Header />
        {this.matchRouter(route)}
      </Provider>
    )
  }
}

function asyncload(importComponent) {
  return class extends Component {
    state = { component: null }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }
}

export default Router
