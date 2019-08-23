import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

/** components */
import QuizForm from '../components/QuizForm'
import BalloonChat from '../components/BalloonChat'

/** imgs */
import socksImg from '../assets/images/sock.png'
import mugsImg from '../assets/images/mugs.png'
import phoneImg from '../assets/images/phone.png'

/** utils */
import { isValidEmail } from '../utils/validates'

/** actions */
import { fetchStockService } from '../store/actions/stock/stockActions'

const App = props => {
  const { headphones, mugs, socks } = props.state.stock.quantity
  const dispatch = useDispatch()

  const [state, setState] = useState({
    name: '',
    email: '',
    type: false,
    startQuiz: false
  })

  useEffect(() => {
    
    const db = firebase.firestore()

    db.collection('stock').doc('quantity')
    .onSnapshot(doc => {
      console.log('< STOCK : OK > ' )
      dispatch( fetchStockService(doc.data()) )
    },
    (error) => { 
      console.warn('< REAL TIME DATA : ERROR > ', error)
      fetchStockService(false)
    })

  }, [dispatch])

  const resetForm = () => {
    setState({
      name: '',
      email: '',
      type: false,
      startQuiz: false
    })
  }

  return (
    <div className="App animated fadeIn">
      <div className="container">
        
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Sympla Quiz</h1>
          </div>
        </div>

        {/** QUIZ FORM */}
        {state.startQuiz && (
          <div className={`row animated ${state.startQuiz ? 'fadeInDown' : 'fadeOutDown'}`}>
            <div className="col-sm-8 ml-auto mr-auto">
              <QuizForm
                player={state.name}
                email={state.email}
                type={state.type}
                stock={props.state.stock.quantity}
                reset={ resetForm }
              />
            </div>
          </div>
        )}

        <div className={`row animated ${state.startQuiz ? 'zoomOutDown' : 'fadeIn'}`}>

          <div className="col-sm-6 ml-auto mr-auto">
            <label className="lead">Algumas Regrinhas</label>
            <blockquote className="blockquote">
              <p className="mb-1">- Cada participante só poderá jogar uma vez</p>
              <p className="mb-1">- Após preencher os campos, escolha uma modalidade</p>
              <p className="mb-1">- Responda apenas clickando na opção</p>
              <p className="mb-1">- Você terá 3 minutos para terminar o quiz</p>
              <p className="mb-1">- Serão 10 perguntas, com pontuação máxima de 20</p>
              <p className="mb-1">- No final você terá seu resultado!</p>
              <footer className="blockquote-footer">Good luck have fun!</footer>
            </blockquote>

            <div className="mt-3">
              <label className="lead">Nossos brindes restantes</label>
              <blockquote className="blockquote">
                <p className="mb-1"><span className="badge badge-pill badge-primary">
                  {headphones}</span> Headphones <img className="img-icon" src={phoneImg} />
                </p>
                <p className="mb-1"><span className="badge badge-pill badge-primary">
                  {mugs}</span> Canecas <img className="img-icon" src={mugsImg} />
                </p>
                <p className="mb-1"><span className="badge badge-pill badge-primary">
                  {socks}</span> Meias <img className="img-icon" src={socksImg} />
                </p>
              </blockquote>
            </div>
          </div>

          <div className="col-sm-6 ml-auto mr-auto">
            <form onKeyDown={ e => {
              if (e.key === 'Enter') e.preventDefault()
            }}>

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
                {/* <small className="lead">Pode ser só seus 2 primeiros nomes mesmo =]</small> */}
              </div>

              <div className="form-group-lg mt-3">
                <label htmlFor="email" className="lead">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg lead"
                  id="email"
                  placeholder="pedrinho@email.com"
                  required
                  value={ state.email }
                  onChange={ e => { setState({ ...state, email: e.target.value }) } }
                  onBlur={ e => { setState({ ...state, email: isValidEmail(e.target.value) ? e.target.value : '' }) } }
                />
              </div>

              {state.name !== '' && 
                state.name.length > 3 &&
                state.email !== '' && (
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
                      Front-End [ javascript, html, css ]
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
                      Back-End [ php ]
                    </label>
                  </div>
                  <div className="" onChange={ e => { setState({ ...state, type: e.target.value }) } }>
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="android"
                        checked={ state.type === 'android' }
                        onChange={ e => { setState({ ...state, type: e.target.value }) } }
                      />
                      Android
                    </label>
                  </div>
                  <div className="" onChange={ e => { setState({ ...state, type: e.target.value }) } }>
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="others"
                        checked={ state.type === 'others' }
                        onChange={ e => { setState({ ...state, type: e.target.value }) } }
                      />
                      Aventureira(o) [ filmes, curiosidades entre outros ]
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

              <BalloonChat type={state.type} />

            </form>
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
  fetchStockService: () => dispatch( fetchStockService() )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
