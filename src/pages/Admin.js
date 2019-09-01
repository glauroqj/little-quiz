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
        <div className="row mt-3">

          <div className="col-sm-4">
            <div className="card border-primary mb-3">
              <div className="card-header">Configurations</div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-12 col-form-label">Event Name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" value="Devday" />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-12 col-form-label">Timer</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" value="600" />
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
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-12 col-form-label">Headphone</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" value="20" />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-12 col-form-label">Mugs</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" value="20" />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-12 col-form-label">Socks</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" value="20" />
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
)(Admin)
