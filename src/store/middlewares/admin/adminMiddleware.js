import firebase from 'firebase/app'
import 'firebase/firestore'

const fetchConfigurationMiddleware = () => {
  const db = firebase.firestore()
  return new Promise(resolve => {

    db.collection('admin')
      .doc('configuration')
      .get()
      .then(doc => {
        resolve( doc.data() )
      })
      .catch(error => {
        console.log('< ADMIN MIDDLEWARE : ERROR > ', error)
        resolve(false)
      })
  })
}

export {
  fetchConfigurationMiddleware
}