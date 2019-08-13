import React, { useState, useEffect } from 'react'

const QuizForm = ({ type }) => {

  const [form, setForm] = useState({
    questions: require(`../questions/${type}`)[type],
    steps: [1, 2, 3],
    actualStep: 1
  })

  useEffect(() => {
    console.log('< QUIZ FORM : STATE > ', form)
  }, [form])  
  
  return (
    <div className="quiz-form">
      {form.questions.length > 0 && form.questions.map((item, index) => (
        <div className="box mb-5" >
          <div className="header">{`${index+1}- ${item.ask}`}</div>

          <div className="list-group">
            {item.options.map((option, i) => (
              <div
              key={i}
              className="list-group-item list-group-item-action"
              onClick={ () => { setForm({ ...form, actualStep: (form.actualStep+1) }) } }
              >
                {option}
              </div>
            ))}
          </div>

        </div>
      ))
      .filter((question, i) => (i+1) === form.actualStep)
      }

      {form.actualStep > form.questions.length && (
        <div>
          CONTAGEM
        </div>
      )}
    </div>
  )
}

export default QuizForm