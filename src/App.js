import React, { Fragment } from 'react'
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import asyncload from './utils/asyncload'
import './App.css'

const Router =
  process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

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

      <Route path="/" exact component={Home} />
      <Route
        path="/login"
        component={asyncload(() => import('./components/SignIn'))}
      />
      <Route
        path="/register"
        component={asyncload(() => import('./components/SignUp'))}
      />
      <Route
        path="/@:username"
        component={asyncload(() => import('./components/Profile'))}
      />
    </Fragment>
  </Router>
)
