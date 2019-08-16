import ReactDOM from 'react-dom'

/** routes */
import routes from './routes/routes'

/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'

/** css */
import './assets/css/main.scss'

firebase.initializeApp(credentials)

ReactDOM.render(routes() ,document.getElementById('root'))

/**
  DOC react-redux: https://react-redux.js.org/
  DOC redux: https://redux.js.org/api/applymiddleware
  DOC create redux store: https://redux.js.org/recipes/configuring-your-store
*/