import React from 'react'

const QuizFinalResult = ({ player, score, finishTimeSeconds, bounty, reset }) => (
  <div className="last-step animated zoomIn">
    <h3>YOUR RESULT</h3>
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Player
        <span className="badge badge-primary">{ player }</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Score
        <span className="badge badge-primary">{`${score} / 20`}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Time
        <span className="badge badge-primary">{ finishTimeSeconds }</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Bounty
        <span className="badge badge-primary">{ bounty }</span>
      </li>
    </ul>
    
    <div className="mt-3">
      <button
        className="btn btn-block btn-success btn-lg"
        onClick={ () => reset() }
        type="button"
      >
        Novo Jogo
      </button>
    </div>
  </div>
)

export default QuizFinalResult