import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** components */
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'

/** notification */
import { toast } from 'react-toastify'

/** actions */
import { logoutService } from '../store/actions/user/userActions'
import { fetchConfigurationService } from '../store/actions/admin/adminActions'

const Admin = ({state, history}) => {
  const dispatch = useDispatch()
  const { configurations, loading } = state.admin

  useEffect(() => {
    
    const getConfig = async () => {
      await dispatch( fetchConfigurationService() )
    }

    if (loading) getConfig()

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

        {loading &&
          <Loading text='Carregando dados...' />
        }

        <div className="row mt-3 animated fadeIn">

          <div className="col-sm-4">
            <div className="card border-primary mb-3">
              <div className="card-header">Configurations</div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Event Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={configurations.eventName} />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Timer</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={configurations.time} />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card border-primary mb-3">
              <div className="card-header">Stock</div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Headphone</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value="20" />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Mugs</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value="20" />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-group row">
                      <label className="col-sm-12 col-form-label">Socks</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value="20" />
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
  logoutService: () => dispatch( logoutService() ),
  fetchConfigurationService: () => dispatch( fetchConfigurationService()  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
