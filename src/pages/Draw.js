import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

/** components */
import BalloonChat from '../components/BalloonChat'
import Loading from '../components/Loading'

/** notification */
import { toast } from 'react-toastify'

/** imgs */
import socksImg from '../assets/images/sock.png'
import mugsImg from '../assets/images/mugs.png'
import phoneImg from '../assets/images/phone.png'


/** actions */
import { fetchStockService } from '../store/actions/stock/stockActions'

const Draw = props => {
  const { headphones, mugs, socks } = props.state.stock.quantity
  const dispatch = useDispatch()

  const [state, setState] = useState({
    type: 'draw',
    startDraw: false,
    finalPerk: false
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
      type: 'draw',
      startDraw: false,
      finalPerk: false
    })
  }

  const shufflePerk = async () => {
    const db = firebase.firestore()
    const { quantity } = props.state.stock

    setState({
      ...state,
      startDraw: true,
      type: 'draw-running'
    })

    const bounty = await getBounty(quantity)
    console.log(bounty)

    setTimeout(async () => {
      
      if (bounty !== 'Algo deu errado, verifique o estoque :(') {
        await db.collection('stock')
        .doc('quantity')
        .set({
          [bounty]: quantity[bounty] - 1
        }, {merge: true})
      }

      setState({
        ...state,
        type: 'draw-done',
        startDraw: false,
        finalPerk: bounty
      })
    }, 5000)

  }

  const getBounty = perks => {
    return new Promise(resolve => {
      let result = randomArray(perks)
      
      /** verify stock */
      if (perks[result] !== 0) resolve(result)

      if (perks[result] === 0) {
        let count = 0

        const tryAgain = setInterval(() => {

          result = randomArray(perks)

          if (perks[result] !== 0) {
            clearInterval(tryAgain)
            resolve(result)
          }

          if (count === 4) {
            clearInterval(tryAgain)
            // resolve('no-perk')
            resolve('Algo deu errado, verifique o estoque :(')
          }

          count++
        }, 500)

      }

    })
  }

  const randomArray = perks => {
    const arrayPerks = Object.keys(perks)
    const rand = Math.random()
    const totalPerks = arrayPerks.length
    const randIndex = Math.floor(rand * totalPerks)
    return arrayPerks[randIndex]
  }

  const chooseImg = bounty => {
    switch (bounty) {
      case 'mugs':
        return mugsImg
      case 'socks':
        return socksImg
      case 'headphones':
        return phoneImg
      default:
        return ''
    }
  }

  const choosePerkName = bounty => {
    switch (bounty) {
      case 'mugs':
        return 'Caneca'
      case 'socks':
        return 'Meia'
      case 'headphones':
        return 'Headphones'
      case 'no-perk':
        return 'Não foi desta vez :('
      default:
        return ''
    }
  }

  return (
    <div className="App animated fadeIn">
      <div className="container">
        
        <div className="row mb-5">
          <div className="col-sm-12 text-center">
            <h1>Sympla Sorteio</h1>
          </div>
        </div>

        <div className={`row animated fadeIn`}>

          <div className="col-sm-6 ml-auto mr-auto">
            <div className="mt-0">
              <label className="lead">Nossos brindes restantes</label>
              <blockquote className="blockquote">
                <p className="mb-1"><span className="badge badge-pill badge-primary">
                  {headphones}</span> Headphones <img className="img-icon" src={phoneImg} alt="phones" />
                </p>
                <p className="mb-1"><span className="badge badge-pill badge-primary">
                  {socks}</span> Meias <img className="img-icon" src={socksImg} alt="socks" />
                </p>
              </blockquote>
            </div>
          </div>

          <div className="col-sm-6 ml-auto mr-auto">
            <form onKeyDown={ e => {
              if (e.key === 'Enter') e.preventDefault()
            }}>
              
              <div className="draw-box">
                {!state.startDraw && !state.finalPerk && (
                  <h2 className="animated fadeIn">Vamos ganhar brindes???</h2>
                )}
                
                {state.startDraw && (
                  <div className="animated fadeIn">
                    <Loading text='Sorteandoo...' />
                  </div>
                )}

                {state.finalPerk && (
                  <div className="animated flipInX">
                    {state.finalPerk !== 'no-perk' && (
                      <img className="" src={chooseImg(state.finalPerk)} alt="bounty" />
                    )}
                    <h3>{ choosePerkName(state.finalPerk) }</h3>
                  </div>
                )}

              </div>

              {!state.finalPerk && (
                <button
                  className="btn btn-lg btn-success btn-block"
                  type="button"
                  disabled={state.startDraw}
                  onClick={ () => shufflePerk() }
                >
                  Click para Sortear
                </button>
              )}

              {state.finalPerk && (
                <button
                  className="btn btn-lg btn-danger btn-block"
                  type="button"
                  disabled={state.startDraw}
                  onClick={ () => resetForm() }
                >
                  Sortear outro
                </button>
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
)(Draw)
