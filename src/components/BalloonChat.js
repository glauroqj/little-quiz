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
      case false:
        return 'Olá bem-vindo ao nosso quiz, vamos começar?'
      default:
        return 'Olá Aventureiro, sabia que na Sympla tem muitas vagas...'
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