import React from 'react'

const Admin = ({history}) => {
  // const [state, setState] = useState({
  //   loading: false
  // })

  // useEffect(() => {
  //   console.log('< ADMIN : STATE > ', state)
  // })


  return (
    <div className="Admin animated fadeIn">
      <div className="container">
        
        <div className="row">
          <div className="col-sm-6 ml-auto mr-auto">
            <h1>Admin</h1>
            <button
              type="button"
              className="btn btn-lg btn-success"
              onClick={ () => history.push('/') }
            >
              HOME
            </button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Admin
