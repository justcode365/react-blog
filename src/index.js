import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

window.API = 'https://conduit.productionready.io/api'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
