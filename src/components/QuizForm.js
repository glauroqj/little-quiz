import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'

import {
  format,
  differenceInSeconds,
  differenceInMilliseconds
} from 'date-fns'

/** components */
import Loading from '../components/Loading'
import Timer from '../components/Timer'
import QuizFinalResult from '../components/QuizFinalResult'

const QuizForm = ({ player, email, type, stock, reset }) => {

  const [form, setForm] = useState({
    player,
    questions: require(`../questions/${type}`)[type],
    steps: '',
    actualStep: 1,
    score: 0,
    startTime: new Date(),
    finishTime: '',
    finishTimeSeconds: '',
    bounty: false,
    loading: false
  })


  useEffect(() => {

    if (form.steps === '') {
      setForm({
        ...form,
        questions: form.questions.sort(() => Math.random() - 0.5 ),
        steps: form.questions.length
      })
    }

  }, [form])

  const setAnswer = async (choice, index) => {
    // console.log('< ANSWER > ', choice, index)
    const { questions, steps, score, finishTime, finishTimeSeconds, actualStep, startTime } = form
    const payloadAsk = questions[index]

    let increaseScore = score
    let setFinishTime = finishTime
    let setFinishTimeSeconds = finishTimeSeconds
    let bounty = false

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

      bounty = await getBounty(stock)
      /** send to firestore */
      const payload = {
        player,
        email,
        seconds: differenceInSeconds(setFinishTime, startTime),
        time: setFinishTimeSeconds,
        score: increaseScore,
        start: form.startTime,
        finish: setFinishTime,
        type,
        bounty
      }

      /** change colletion to event name */
      await db.collection('tech-summit').add(payload)
      .then(() => {
        console.log('< SAVED IN FIREBASE >')
      })
      .catch(error => console.warn('< PROBLEM TO SAVE IN DB > ', error))


      if (bounty !== 'Algo deu errado, verifique o estoque :(') {
        await db.collection('stock').doc('quantity').set({
          [bounty]: stock[bounty] - 1
        }, {merge: true})
      }
    }

    setForm({
      ...form,
      score: increaseScore,
      actualStep: (actualStep+1),
      finishTime: setFinishTime,
      finishTimeSeconds: setFinishTimeSeconds,
      bounty,
      loading: false
    })

  }


  const getBounty = perks => {
    return new Promise(resolve => {
      let result = randomArray(perks)

      /** verify stock */
      if (stock[result] !== 0) resolve(result)

      if (stock[result] === 0) {
        let count = 0

        const tryAgain = setInterval(() => {

          result = randomArray(perks)

          if (stock[result] !== 0) {
            clearInterval(tryAgain)
            resolve(result)
          }

          if (count === 7) {
            clearInterval(tryAgain)
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
  
  return (
    <div className="quiz-form">

        {!form.finishTime && (
          <Timer
            seconds={180}
            reset={ () => reset('timeout') }
          />
        )}

      {/* <ol className="breadcrumb">
        <li className="breadcrumb-item active">SCORE: { form.score }</li>
        <li className="breadcrumb-item active">STEP: { form.actualStep }</li>
      </ol> */}

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
        <QuizFinalResult
          {...form}
          reset={ () => reset() }
        />
      )}
    </div>
  )
}

export default QuizForm