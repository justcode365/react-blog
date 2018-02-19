import React, { Component } from 'react'
import { HashRouter, BrowserRouter, Route } from 'react-router-dom'
import asyncload from 'utils/asyncload'
import Header from 'containers/Header'

const Router = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

export default () => (
  <Router>
    <div>
      <Header />
      <Route path="/" exact component={asyncload(() => import('containers/Home'))} />
      <Route path="/login" component={asyncload(() => import('containers/Sign/SignIn'))} />
      <Route path="/register" component={asyncload(() => import('containers/Sign/SignUp'))} />
      <Route path="/@:username" component={asyncload(() => import('components/Profile'))} />
      <Route path="/article/:title" component={asyncload(() => import('components/Article'))} />
      <Route path="/settings" component={asyncload(() => import('containers/Settings'))} />
    </div>
  </Router>
)
