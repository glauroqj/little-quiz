import React from 'react'
import ReactDOM from 'react-dom'

/** redux */
import { Provider } from 'react-redux'
import { store } from './store/store'

/** routes */
import Routes from './routes/Routes'

/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'

/** css */
import './assets/css/main.scss'

firebase.initializeApp(credentials)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

/**
  DOC react-redux: https://react-redux.js.org/
  DOC redux: https://redux.js.org/api/applymiddleware
  DOC create redux store: https://redux.js.org/recipes/configuring-your-store
*/