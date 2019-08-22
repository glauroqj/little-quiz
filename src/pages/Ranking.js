import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

/** components */
import Loading from '../components/Loading'

/** actions */
import { fetchListService } from '../store/actions/ranking/rankingActions'

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

      querySnapshot.forEach(doc => list.push(doc.data()))

      /** call action */
      console.log('< REAL TIME DATA : OK > ')
      dispatch( fetchListService(list) )
    },
    (error) => {
      console.warn('< REAL TIME DATA : ERROR > ', error)
      fetchListService(false)
    })

  }, [dispatch])

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
                  <span className="score badge badge-success badge-pill">{`${item.score} / 20`}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Back-End</h4>

              {back.length > 0 && 
                back.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                  <span className="name">{index+1} {item.player}</span>
                  {/* <span className="email">{item.email}</span> */}
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{`${item.score} / 20`}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Android</h4>

              {android.length > 0 && 
                android.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                  <span className="name">{index+1} {item.player}</span>
                  {/* <span className="email">{item.email}</span> */}
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{`${item.score} / 20`}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
            </div>

            <div className="col-sm-3">
              <h4 className="display-5 text-center">Ranking Aventureiro</h4>

              {others.length > 0 && 
                others.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp" title={`NAME: ${item.player} \nEMAIL: ${item.email} \nBOUNTY: ${item.bounty}`}>
                  <span className="name">{index+1} {item.player}</span>
                  {/* <span className="email">{item.email}</span> */}
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{`${item.score} / 20`}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
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