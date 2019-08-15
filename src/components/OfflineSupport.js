import React, { useState, useEffect } from 'react'

const OfflineSupport = () => {

  const[state, setState] = useState({ status: true })

  useEffect(() => {

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {

        // if (window.location.hostname === 'localhost') return false

        navigator.serviceWorker.register('/service-worker-custom.js', { scope: '/', updateViaCache: 'imports' })
        .then((registration) => {
          console.log('< SERVICE WORKER : OK > ', registration)
        }).catch((registrationError) => {
          console.log('< SERVICE WORKER : FAIL >', registrationError)
        })

      })

      navigator.serviceWorker.addEventListener('message', event => {
        const { status } = state
        // console.log('Listener SERVICE WORKER: ', event.data)
        if (status !== event.data.isOnline) {
          setState({
            status: event.data.isOnline
          })
        }
      })
    }

  }, [state])

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