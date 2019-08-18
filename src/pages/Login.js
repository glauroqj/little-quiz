import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

/** actions */
import { loginService } from '../store/actions/user/userActions'

const Login = ({history}) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false
  })

  const login = async () => {
    setState({ ...state, loading: true })

    const result = await dispatch( loginService({ email: state.email, password: state.password }) )

    if (result) history.push('/admin')

  }

  return (
    <div className="App animated fadeIn">
      <div className="container">
        
        <div className="row">
          <div className="col-sm-6 ml-auto mr-auto">
            <h1>Sympla Admin</h1>
          </div>
        </div>

        <div className={`row animated fadeIn`}>
          <div className="col-sm-6 ml-auto mr-auto">
            <form onKeyDown={ e => {
              if (e.key === 'Enter') e.preventDefault()
            }}>

              <div className="form-group-lg">
                <label htmlFor="email" className="lead">Email</label>
                <input
                  type="text"
                  className="form-control form-control-lg lead"
                  id="email"
                  placeholder="email@test.com"
                  value={ state.email }
                  onChange={ e => { setState({ ...state, email: e.target.value }) } }
                />
              </div>

              <div className="form-group-lg mt-3">
                <label htmlFor="senha" className="lead">Senha</label>
                <input
                  type="password"
                  className="form-control form-control-lg lead"
                  id="senha"
                  placeholder="*****"
                  value={ state.password }
                  onChange={ e => { setState({ ...state, password: e.target.value }) } }
                />
              </div>

              <div className="form-group-lg mt-3">
                <button
                  className="btn btn-lg btn-success btn-block"
                  type="button"
                  disabled={state.loading}
                  onClick={ () => login() }
                >
                  Entrar
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
