import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

/** components */
import Loading from '../components/Loading'

/** actions */
import { fetchListService } from '../store/actions/ranking/rankingActions'

const List = (props) => {
  const { front, back, others, loading } = props.state.ranking
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
          <div className="col-sm-8 ml-auto mr-auto">
            <h1>Sympla Quiz Ranking</h1>
          </div>
        </div>

        {loading && (
          <Loading text='Atualizando ranking...' />
        )}

        {!loading && (
          <div className="row ranking-list animated fadeIn">

            <div className="col-sm-4">
              <h4 className="display-5 text-center">Ranking Front-End</h4>

              {front.length > 0 && 
                front.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp">
                  <span className="name">{index+1} {item.player}</span>
                  <span className="email">{item.email}</span>
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{item.score}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
            </div>

            <div className="col-sm-4">
              <h4 className="display-5 text-center">Ranking Back-End</h4>

              {back.length > 0 && 
                back.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp">
                  <span className="name">{index+1} {item.player}</span>
                  <span className="email">{item.email}</span>
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{item.score}</span>
                </ol>
              ))
              .filter((item, index) => index < 10)
              }
            </div>

            <div className="col-sm-4">
              <h4 className="display-5 text-center">Ranking Aventureiro</h4>

              {others.length > 0 && 
                others.map((item, index) => (
                <ol key={`${item.player}${item.email}`} className="breadcrumb animated fadeInUp">
                  <span className="name">{index+1} {item.player}</span>
                  <span className="email">{item.email}</span>
                  <span className="time">{item.time}</span>
                  <span className="score badge badge-success badge-pill">{item.score}</span>
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
  fetchListService: () => dispatch( fetchListService() )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

/*
  DOC: https://firebase.google.com/docs/firestore/query-data/listen
*/