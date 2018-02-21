import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
render()
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./routes', () => {
    render()
  })
}
