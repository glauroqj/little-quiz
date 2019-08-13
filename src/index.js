import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

/** routes */
import App from './pages/App'
import List from './pages/List'

/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'

/** css */
import './assets/css/main.scss'


firebase.initializeApp(credentials)

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/list" component={List} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(routes() ,document.getElementById('root'))