import React from 'react'

/** image */
import ingressinho from '../assets/images/ingressinho.png'

const BalloonChat = ({ type }) => {

  const chooseTemplate = () => {
    switch (type) {
      case 'front':
        return 'Olá dev Front-End, temos vagas na Sympla...'
      case 'back':
        return 'Olá dev Back-End, temos vagas na Sympla...'
      case 'android':
        return 'Olá dev Android, temos vagas na Sympla...'
      case 'draw':
        return 'Olá, vamos sortear o seu prêmio?'
      case 'draw-running':
          return 'Boa sorteee, estou torcendo por você?'
      case 'draw-done':
          return 'Parabéns, você ganhoooou!!!!'
      case false:
        return 'Olá bem-vindo ao nosso quiz, vamos começar?'
      default:
        return 'Olá Aventureira(o), sabia que na Sympla tem muitas vagas...'
    }
  }

  return (
    <div className="box-balloon">
      <div className="balloon">{ chooseTemplate() }</div>
      <div className="ingressinho">
        <img className="img-fluid" src={ingressinho} alt="ingressinho" />
      </div>
    </div>
  )
}

export default BalloonChat