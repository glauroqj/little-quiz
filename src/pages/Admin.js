import React, { useState, useEffect } from 'react'

const Admin = () => {
  const [state, setState] = useState({
    loading: false
  })

  useEffect(() => {
    console.log('< ADMIN : STATE > ', state)
  })


  return (
    <div className="Admin animated fadeIn">
      <div className="container">
        
        <div className="row">
          <div className="col-sm-6 ml-auto mr-auto">
            <h1>Admin</h1>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Admin
