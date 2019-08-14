import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'

import {
  format,
  differenceInMilliseconds
} from 'date-fns'

import Loading from '../components/Loading'

const QuizForm = ({ player, type, reset }) => {

  const [form, setForm] = useState({
    questions: require(`../questions/${type}`)[type],
    steps: '',
    actualStep: 1,
    score: 0,
    startTime: new Date(),
    finishTime: '',
    finishTimeSeconds: '',
    loading: false
  })

  useEffect(() => {
    console.log('< QUIZ FORM : STATE > ', form)

    if (form.steps === '') {
      setForm({
        ...form,
        steps: form.questions.length
      })
    }

  }, [form])

  const setAnswer = async (choice, index) => {
    console.log('< ANSWER > ', choice, index)
    const { questions, steps, score, finishTime, finishTimeSeconds, actualStep, startTime } = form
    const payloadAsk = questions[index]

    let increaseScore = score
    let setFinishTime = finishTime
    let setFinishTimeSeconds = finishTimeSeconds

    if (payloadAsk.correct === choice) {
      increaseScore += payloadAsk.value
    }

    /** finished quiz */
    if (actualStep === steps) {
      setForm({
        ...form,
        loading: true
      })

      const db = firebase.firestore()
      setFinishTime = new Date()

      const timeSeconds = differenceInMilliseconds(setFinishTime, startTime)

      setFinishTimeSeconds = format(timeSeconds, 'mm:ss')

      /** send to firestore */
      const payload = {
        player,
        time: setFinishTimeSeconds,
        score: increaseScore,
        start: form.startTime,
        finish: setFinishTime,
        type
      }

      await db.collection('users').add(payload)
      .then(() => {
        console.log('< SAVED IN FIREBASE >')
      })
      .catch(error => console.warn('< PROBLEM TO SAVE IN DB > ', error))
    }

    setForm({
      ...form,
      score: increaseScore,
      actualStep: (actualStep+1),
      finishTime: setFinishTime,
      finishTimeSeconds: setFinishTimeSeconds,
      loading: false
    })

  }
  
  return (
    <div className="quiz-form">

      <ol className="breadcrumb">
        <li className="breadcrumb-item active">SCORE: { form.score }</li>
        <li className="breadcrumb-item active">STEP: { form.actualStep }</li>
      </ol>

      {form.finishTime === '' &&
      form.questions.length > 0 &&
      form.questions.map((item, index) => (
        <div className="box mb-5 animated fadeIn" key={index}>

          {form.loading && (
            <Loading text='Somando pontuação...' />
          )}
          
          {!form.loading && (
            <>
              {item.image && (
                <img className="img-fluid" src={item.image} alt="" />
              )}

              <div className="header mt-2">{`${index+1}- ${item.ask}`}</div>

              <div className="list-group mt-2">
                {item.options.map((option, i) => (
                  <div
                  key={`${option}-${i}`}
                  className="list-group-item list-group-item-action"
                  onClick={ () => { setAnswer(option, index) } }
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className="author mt-3">
                <p>Pergunta criada por:</p>
                <div className="box-info">
                  <img className="img-fluid" src={item.author.photo} alt="" />
                  <p>{item.author.name}</p>
                </div>
              </div>
            </>
          )}

        </div>
      ))
      .filter((question, i) => (i+1) === form.actualStep)
      /** show exactly the question in position of array of questions */
      }

      {form.finishTime && (
        <div className="last-step animated zoomIn">
          <h3>YOUR RESULT</h3>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Player
              <span className="badge badge-primary">{ player }</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Score
              <span className="badge badge-primary">{ form.score }</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Time
              <span className="badge badge-primary">{ form.finishTimeSeconds }</span>
            </li>
          </ul>
          
          <div className="mt-3">
            <button
              className="btn btn-block btn-success btn-lg"
              onClick={ () => { reset() } }
              type="button"
            >
              Novo Jogo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizForm