import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

/** redux */
import { Provider } from 'react-redux'
import { store } from '../store/store'

/** routes */
import App from '../pages/App'
import List from '../pages/List'

/** offline component */
import OfflineSupport from '../components/OfflineSupport'

import { isAuthenticated } from './authService'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

const routes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <OfflineSupport/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/list" component={List} />
          {/* <PrivateRoute exact path="/admin" component={Admin} /> */}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default routes

/*
  DOC: https://auth0.com/blog/react-router-4-practical-tutorial/
  DOC: https://blog.rocketseat.com.br/reactjs-autenticacao/
*/
