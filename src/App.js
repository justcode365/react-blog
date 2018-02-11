import React, { Fragment } from 'react'
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import asyncload from 'utils/asyncload'
import 'App.css'

const Router = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

export default () => (
  <Router>
    <Fragment>
      <header className="App-header container">
        <h2>React Blog</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Route path="/" exact component={asyncload(() => import('containers/Home'))} />
      <Route path="/login" component={asyncload(() => import('containers/SignIn'))} />
      <Route path="/register" component={asyncload(() => import('containers/SignUp'))} />
      <Route path="/@:username" component={asyncload(() => import('containers/Profile'))} />
      <Route path="/article/:title" component={asyncload(() => import('containers/Article'))} />
    </Fragment>
  </Router>
)
