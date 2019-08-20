import React, { useState, useEffect } from 'react'

/** utils */
import { formatSeconds } from '../utils/formatTime'

let loop = null
const Timer = ({ seconds, reset }) => {
  const [state, setState] = useState({
    time: seconds,
    porcentage: 100
  })

  useEffect(() => {

    const countdown = () => {
      // const initialTime = seconds /** freeze time */
      let expire = seconds

      setState({
        ...state,
        time: formatSeconds(seconds)
      })

      loop = setInterval(() => {
        setState({
          ...state,

          time: formatSeconds(expire),
          porcentage: Math.floor(expire * 100 / seconds)
        })

        expire--

        if (expire === -1) {
          clearInterval(loop)
          // console.log('< EXPIRED TIME >')
          reset()
        }
      }, 1000)

    }
    countdown()

    return () => {
      // console.log('< will unmount >')
      clearInterval(loop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="timer mb-3">
      <h6>Timer: {state.time}</h6>
      <div className="progress">
        <div
          style={{ width: `${state.porcentage}%`}}
          className="progress-bar progress-bar-striped bg-success" 
          role="progressbar" 
          aria-valuenow="0" 
          aria-valuemin="0"
          aria-valuemax="100" 
        />
      </div>
    </div>
  )
}

export default Timer