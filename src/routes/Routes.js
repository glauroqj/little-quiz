import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

/** offline component */
import OfflineSupport from '../components/OfflineSupport'
import Loading from '../components/Loading'

/** actions */
import { fetchUserService } from '../store/actions/user/userActions'

/** routes */
import App from '../pages/App'
import Ranking from '../pages/Ranking'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import AdminCreateEvent from '../pages/AdminCreateEvent'

const Routes = (props) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: true
  })

  useEffect(() => {
    const checkUser = async () => {
      await dispatch( fetchUserService() )
      setState({
        loading: false
      })
    }
    checkUser()
  }, [dispatch])
  
  const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={props => auth
        ? <Component {...props} /> 
        : <Redirect push to="/login" /> }
    />
  )
  
  if (state.loading) return <Loading text='Carregando...' />

  return (    
    <BrowserRouter>
      <OfflineSupport/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/admin" component={Admin} auth={props.state.user.account} />
        <PrivateRoute exact path="/admin/create-event" component={AdminCreateEvent} auth={props.state.user.account} />
        <Redirect push to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = dispatch => ({
  fetchUserService: () => dispatch( fetchUserService() )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)

/*
  DOC: https://auth0.com/blog/react-router-4-practical-tutorial/
  DOC: https://blog.rocketseat.com.br/reactjs-autenticacao/
  DOC: https://gist.github.com/abohannon/cca2dd998edf9dc2c2165f538eece4b2
*/
