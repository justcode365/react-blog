import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from 'components/Header'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Settings from './Settings'
import Editor from './Editor'
import User from './User'
import Article from './Article'

const NotFound = () => <h1 style={{ textAlign: 'center' }}>Not Found Url</h1>

const App = () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/settings" component={Settings} />
        <Route path="/editor" component={Editor} />
        <Route path="/@:user" component={User} />
        <Route path="/article/:title" component={Article} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default hot(module)(App)
