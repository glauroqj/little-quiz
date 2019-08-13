import React, { useState, useEffect } from 'react'

import QuizForm from '../components/QuizForm'

const App = () => {

  const [state, setState] = useState({
    name: '',
    type: false,
    startQuiz: false
  })

  useEffect(() => {
    console.log('< APP : STATE > ', state)
  })

  const resetForm = () => {
    setState({
      name: '',
      type: false,
      startQuiz: false
    })
  }

  return (
    <div className="App animated fadeIn">
      <div className="container">
        
        <div className="row">
          <div className="col-xs-12 ml-auto mr-auto">
            <h1>Sympla Quiz</h1>
          </div>
        </div>

        {/** QUIZ FORM */}
        {state.startQuiz && (
          <div className={`row animated ${state.startQuiz ? 'fadeInDown' : 'fadeOutDown'}`}>
            <div className="col-xs-12 ml-auto mr-auto">
              <QuizForm player={state.name} type={state.type} reset={ resetForm } />
            </div>
          </div>
        )}

        <div className={`row animated ${state.startQuiz ? 'zoomOutDown' : 'fadeIn'}`}>
          <div className="col-xs-12 ml-auto mr-auto">
            <form>

              <div className="form-group-lg">
                <label htmlFor="name" className="lead">Nome & Sobrenome</label>
                <input
                  type="text"
                  className="form-control form-control-lg lead"
                  id="name"
                  placeholder="Pedro Maneiro"
                  value={ state.name }
                  onChange={ e => { setState({ ...state, name: e.target.value }) } }
                />
                <small className="lead">Pode ser só seus 2 primeiros nomes mesmo =]</small>
              </div>

              {state.name !== '' && state.name.length > 3 && (
                <div className="form-group mt-3 animated fadeIn">
                  <label htmlFor="name" className="lead">Escolha sua área</label>
                  <div className="" onChange={ e => { setState({ ...state, type: e.target.value }) } }>
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="front"
                        checked={ state.type === 'front' }
                        onChange={ e => { setState({ ...state, type: e.target.value }) } }
                      />
                      Front-End
                    </label>
                  </div>
                  <div className="" onChange={ e => { setState({ ...state, type: e.target.value }) } }>
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="back"
                        checked={ state.type === 'back' }
                        onChange={ e => { setState({ ...state, type: e.target.value }) } }
                      />
                      Back-End
                    </label>
                  </div>
                  {state.type !== false && (
                    <div className="animated fadeIn mt-3">
                      <button
                        className="btn btn-lg btn-success btn-block"
                        type="button"
                        onClick={ () => { setState({ ...state, startQuiz: true }) } }
                      >
                        Iniciar Quiz
                      </button>
                    </div>
                  )}
                </div>
              )}

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
