import React, { Component, createContext } from 'react'
import Home from './Home'
import Settings from './Settings'
import Header from 'components/Header'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const { Provider, Consumer } = createContext()

const App = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={Settings} />
    </div>
  </Router>
)

export default hot(module)(App)
export { Consumer }
