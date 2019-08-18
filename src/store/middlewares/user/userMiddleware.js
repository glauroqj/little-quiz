import firebase from 'firebase/app'
import 'firebase/auth'

const fetchUserMiddleware = () => {
  return new Promise(resolve => {
    // const user = firebase.auth().currentUser
    // if (user) resolve(user)
    // if (!user) resolve(false)
    firebase.auth()
    .onAuthStateChanged(user => {
      console.log('< FETCH USER MIDDLEWARE > ', user)
      if (user) resolve(user)
      if (!user) resolve(false)
    })
  })
}

const loginUserMiddleware = async (form) => {
  return new Promise((resolve) => {
    firebase.auth()
    .signInWithEmailAndPassword(form.email, form.password)
    .then(response => {
      console.log('< RESPONSE LOGIN > ', response)
      resolve(response.user)
    })
    .catch(err => {
      resolve(false)
    })
  })
}

export {
  fetchUserMiddleware,
  loginUserMiddleware
}