import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import './css/base.css'
import './css/tabs.css'
import './css/form.css'
import './css/sign.css'

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
