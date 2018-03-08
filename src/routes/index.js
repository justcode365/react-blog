import React from 'react'
import Home from './Home'
import Settings from './Settings'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Header from 'components/Header'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/about" component={Settings} />
    </div>
  </Router>
)

export default hot(module)(App)
