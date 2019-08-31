import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({user, logout}) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to='/admin'>Sympla Quiz Admin</Link>
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <div className="nav-link disabled">Account: {user.email}</div>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link btn btn-link"
              onClick={ () => logout() }
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

// Navbar.defaultProps = {
//   active: ''
// }

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default Navbar
