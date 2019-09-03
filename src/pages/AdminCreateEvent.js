import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** components */
import Navbar from '../components/Navbar'
// import Loading from '../components/Loading'

/** notification */
import { toast } from 'react-toastify'

/** actions */
import { logoutService } from '../store/actions/user/userActions'

const AdminCreateEvent = ({state, history}) => {
  const dispatch = useDispatch()
  const [createEventState, setCreateEventState] = useState({
    eventName: '',
    perks: [ ]
  })

  useEffect(() => {

  }, [])

  const logOut = async () => {

    const result = await dispatch( logoutService() )

    if (result) {
      history.push('/')
      toast.success('Logout concluído')
    }
    if (!result) toast.error('Tente novamente :(')
  }

  return (
    <div className="Admin">
      <Navbar user={state.user.account} logout={ () => { logOut() } }  />
      <div className="container-fluid">

        {/* {loading &&
          <Loading text='Carregando form...' />
        } */}

        <div className="row mt-3 animated fadeIn">

          <div className="col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-header">Create Event</div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Event Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value='' />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
)(AdminCreateEvent)
