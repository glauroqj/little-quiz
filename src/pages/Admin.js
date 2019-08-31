import React from 'react'
import { connect, useDispatch } from 'react-redux'

/** components */
import Navbar from '../components/Navbar'

/** notification */
import { toast } from 'react-toastify'

/** actions */
import { logoutService } from '../store/actions/user/userActions'

const Admin = ({state, history}) => {
  const dispatch = useDispatch()

  // const [state, setState] = useState({
  //   loading: false
  // })

  // useEffect(() => {
  //   console.log('< ADMIN : STATE > ', state)
  // })

  const logOut = async () => {

    const result = await dispatch( logoutService() )

    if (result) {
      history.push('/')
      toast.success('Logout concluído')
    }
    if (!result) toast.error('Tente novamente :(')
  }

  return (
    <div className="Admin animated fadeIn">
      <Navbar user={state.user.account} logout={ () => { logOut() } }  />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1>Admin</h1>
            <button
              type="button"
              className="btn btn-lg btn-success"
              onClick={ () => history.push('/') }
            >
              HOME
            </button>
          </div>
        </div>


      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = dispatch => ({
  logoutService: () => dispatch( logoutService() )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
