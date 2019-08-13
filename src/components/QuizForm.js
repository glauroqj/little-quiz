import React, { useState, useEffect } from 'react'

const QuizForm = ({ type }) => {

  const [form, setForm] = useState({
    questions: require(`../questions/${type}`).type,
    steps: [1, 2, 3]
  })

  useEffect(() => {
    console.log('< QUIZ FORM : STATE > ', form)
  })  
  
  return (
    console.log('< QUIZ PAYLOAD TYPE > ', form),
    <div>FORM</div>
  )
}

export default QuizForm