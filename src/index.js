import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './css/base.css'
import './css/tabs.css'
import './css/form.css'
import './css/sign.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
