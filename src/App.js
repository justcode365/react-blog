import React, { Component } from 'react'
import { HashRouter, BrowserRouter, Route } from 'react-router-dom'
import asyncload from 'utils/asyncload'
import Header from './components/Header'
import Home from './components/Home'

const Router = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

export default class App extends Component {
  state = { user: null }

  setUser = user => this.setState({ user })
  render() {
    const { user } = this.state
    return (
      <Router>
        <div>
          <Header user={user} />
          <Route path="/" exact render={() => <Home setUser={this.setUser} user={user} />} />
          <Route path="/login" component={asyncload(() => import('components/SignIn'))} />
          <Route path="/register" component={asyncload(() => import('components/SignUp'))} />
          <Route path="/@:username" component={asyncload(() => import('components/Profile'))} />
          <Route path="/article/:title" component={asyncload(() => import('components/Article'))} />
          <Route path="/settings" component={asyncload(() => import('components/Settings'))} />
        </div>
      </Router>
    )
  }
}
