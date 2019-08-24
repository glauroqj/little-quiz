import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

/** components */
import Loading from '../components/Loading'

/** actions */
import { fetchListService } from '../store/actions/ranking/rankingActions'

/** imgs */
import socksImg from '../assets/images/sock.png'
import mugsImg from '../assets/images/mugs.png'
import phoneImg from '../assets/images/phone.png'

import ingressinhoPeso from '../assets/images/ingressinho-peso.png'
import ingressinhoParaQuedas from '../assets/images/ingressinho-paraquedas.png'
import ingressinhoTriste from '../assets/images/ingressinho-triste.png'
import ingressinhoTriste2 from '../assets/images/ingressinho-triste2.png'

const Ranking = props => {
  const { front, back, android, others, loading } = props.state.ranking
  const dispatch = useDispatch()

  useEffect(() => {

    const db = firebase.firestore()
    
    db.collection('users')
    .where('score', '<', 20)
    .orderBy('score', 'desc')
    .onSnapshot(querySnapshot => {
      let list = []
      let listSeconds = []
      let listFinal = []
      querySnapshot.forEach(doc => list.push( doc.data() ))

      /** prepare list */
      listSeconds = list.sort((item1, item2) => item1.seconds < item2.seconds ? 1 : -1) /** reorder lower seconds  */
      listFinal = listSeconds.sort((item1, item2) => item1.score < item2.score ? 1 : -1) /** reorder higher score */

      /** call action */
      console.log('< REAL TIME DATA : OK > ')
      dispatch( fetchListService(listFinal) )
    },
    (error) => {
      console.warn('< REAL TIME DATA : ERROR > ', error)
      fetchListService(false)
    })

  }, [dispatch])

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

  return (
    <div className="List animated fadeIn">
      <div className="container-fluid">

        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Sympla Quiz Ranking</h1>
          </div>
        </div>

        {loading && (
          <Loading text='Atualizando ranking...' />
        )}

        {!loading && (
          <div className="row ranking-list animated fadeIn">

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Front-End</h4>

              {front.length > 0 &&
                front.map((item, index) => (
                  <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                    <span className="name">{index+1} {item.player}</span>
                    {/* <span className="email">{item.email}</span> */}
                    <span className="time">{item.time}</span>
                    <span className="score badge badge-success badge-pill">
                      {`${item.score} / 20`}
                      <img className="ml-2 img-icon" src={chooseImg(item.bounty)} alt="bounty" />
                    </span>
                  </ol>
                ))
                .filter((item, index) => index < 10)
              }
              {front.length === 0 && (
                <img className="img-fluid" src={ingressinhoTriste2} alt="ingressinho" />
              )}
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Back-End</h4>

              {back.length > 0 && 
                back.map((item, index) => (
                  <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                    <span className="name">{index+1} {item.player}</span>
                    {/* <span className="email">{item.email}</span> */}
                    <span className="time">{item.time}</span>
                    <span className="score badge badge-success badge-pill">
                      {`${item.score} / 20`}
                      <img className="ml-2 img-icon" src={chooseImg(item.bounty)} alt="bounty" />
                    </span>
                  </ol>
                ))
                .filter((item, index) => index < 10)
              }
              {back.length === 0 && (
                <img className="img-fluid" src={ingressinhoPeso} alt="ingressinho" />
              )}
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Android</h4>

              {android.length > 0 && 
                android.map((item, index) => (
                  <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                    <span className="name">{index+1} {item.player}</span>
                    {/* <span className="email">{item.email}</span> */}
                    <span className="time">{item.time}</span>
                    <span className="score badge badge-success badge-pill">
                      {`${item.score} / 20`}
                      <img className="ml-2 img-icon" src={chooseImg(item.bounty)} alt="bounty" />
                    </span>
                  </ol>
                ))
                .filter((item, index) => index < 10)
              }
              {android.length === 0 && (
                <img className="img-fluid" src={ingressinhoTriste} alt="ingressinho" />
              )}
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Aventureiro</h4>

              {others.length > 0 && 
                others.map((item, index) => (
                  <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                    <span className="name">{index+1} {item.player}</span>
                    {/* <span className="email">{item.email}</span> */}
                    <span className="time">{item.time}</span>
                    <span className="score badge badge-success badge-pill">
                      {`${item.score} / 20`}
                      <img className="ml-2 img-icon" src={chooseImg(item.bounty)} alt="bounty" />
                    </span>
                  </ol>
                ))
                .filter((item, index) => index < 10)
              }
              {others.length === 0 && (
                <img className="img-fluid" src={ingressinhoParaQuedas} alt="ingressinho" />
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = dispatch => ({
  fetchListService: (list) => dispatch( fetchListService(list) )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ranking)

/*
  DOC: https://firebase.google.com/docs/firestore/query-data/listen
*/