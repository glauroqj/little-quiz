import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'

import Loading from '../components/Loading'

const List = () => {

  const [state, setState] = useState({
    list: [],
    front: [],
    back: [],
    loading: true
  })

  useEffect(() => {
    const db = firebase.firestore()
    
    db.collection('users')
    .onSnapshot(querySnapshot => {
      let list = []
      querySnapshot.forEach(doc => list.push(doc.data()))

      if (state.list.length < list.length) {
        console.log('< REAL TIME DATA : OK > ')
        setState({
          ...state,
          list,
          front: list.filter(item => item.type === 'front').sort((item1, item2) => (item1.score < item2.score) ? 1 : -1),
          back: [],
          loading: false
        })
      }
    },
    (error) => { 
      console.log('< REAL TIME DATA : ERROR > ', error)
    })

  })

  return (
    console.log(state),
    <div className="List animated fadeIn">
      <div className="container">

        <div className="row">
          <div className="col-sm-8 ml-auto mr-auto">
            <h1>Sympla Quiz Ranking</h1>
          </div>
        </div>

        {state.loading && (
          <Loading text='Atualizando ranking...' />
        )}

        {!state.loading && (
          <div className="row animated fadeIn">

            <div className="col-sm-6">
              <h4 className="display-5 text-center">Ranking Front-End</h4>

              {state.front.map((item, index) => (
                <ol key={`${item.player}${item.score}`} className="breadcrumb animated fadeInLeft">
                  <li className="breadcrumb-item active">{index+1} - {item.player} - {item.score} - {item.time}</li>
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

export default List

/*
  DOC: https://firebase.google.com/docs/firestore/query-data/listen
*/