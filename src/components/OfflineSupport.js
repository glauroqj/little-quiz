import React, { useState, useEffect } from 'react'

const OfflineSupport = () => {

  const[state, setState] = useState({ status: true })

  useEffect(() => {
    
    if ('serviceWorker' in navigator) {
      
      if (window.location.hostname !== 'localhost') {

        navigator.serviceWorker.register('/service-worker-custom.js', { scope: '/', updateViaCache: 'imports' })
        .then((registration) => {
          console.log('< SERVICE WORKER : OK > ', registration)
        }).catch((registrationError) => {
          console.log('< SERVICE WORKER : FAIL >', registrationError)
        })
        
      }
      
      setInterval(() => {
        const connection = navigator ? navigator.onLine : ''

        if (state.status !== connection) {
          setState({
            ...state,
            status: connection
          })
        }

      }, 5000)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!state.status) {
    return (
      <div className="alert-offline">
        Estamos offline produção =[
      </div>
    )
  }

  return ''
}

export default OfflineSupport