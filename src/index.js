import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

/** redux */
import { Provider } from 'react-redux'
import { store } from './store/store'

/** routes */
import App from './pages/App'
import List from './pages/List'

/** offline component */
import OfflineSupport from './components/OfflineSupport'

/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'

/** css */
import './assets/css/main.scss'


firebase.initializeApp(credentials)

const routes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <OfflineSupport/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/list" component={List} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(routes() ,document.getElementById('root'))

/**
  DOC react-redux: https://react-redux.js.org/
  DOC redux: https://redux.js.org/api/applymiddleware
  DOC create redux store: https://redux.js.org/recipes/configuring-your-store
*/