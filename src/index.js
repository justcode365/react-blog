import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import reducers from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
