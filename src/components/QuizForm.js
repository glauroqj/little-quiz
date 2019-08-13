import React, { useState, useEffect } from 'react'

const QuizForm = ({ type }) => {

  const [form, setForm] = useState({
    questions: '',
    steps: [1, 2, 3]
  })

  useEffect(() => {

    console.log('< use Effect > ', type)

    function loadQuestions(type) {

      switch (type) {
        case 'front':
          const frontJSON = require('../questions/front.js')
          return frontJSON.front
        
        default:
          return 'error'
      }
      // const Back = await '../questions/back.json'
    }

    
    setForm({
      ...form,
      questions: loadQuestions(type)
    })
    
  }, [])
  
  return (
    console.log('< QUIZ PAYLOAD TYPE > ', form),
    <div>FORM</div>
  )
}

export default QuizForm