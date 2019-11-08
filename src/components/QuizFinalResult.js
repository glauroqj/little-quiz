import React, { useEffect } from 'react'

/** imgs */
// import socksImg from '../assets/images/sock.png'
// import mugsImg from '../assets/images/mugs.png'
// import phoneImg from '../assets/images/phone.png'

const QuizFinalResult = ({ player, score, finishTimeSeconds, bounty, reset }) => {

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }, [])

  // const chooseImg = () => {

  //   switch (bounty) {
  //     case 'mugs':
  //       return mugsImg
  //     case 'socks':
  //       return socksImg
  //     case 'headphones':
  //       return phoneImg
  //     default:
  //       return ''
  //   }

  // }

  return (
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
          <span className="badge badge-primary">
            { bounty }
            {/* <img className="ml-2 img-icon" src={chooseImg()} alt="bountys" /> */}
          </span>
        </li>
      </ul>
      
      <div className="mt-3">
        <button
          className="btn btn-block btn-success btn-lg"
          onClick={ () => reset('ok') }
          type="button"
        >
          Novo Jogo
        </button>
      </div>
    </div>
  )
}

export default QuizFinalResult