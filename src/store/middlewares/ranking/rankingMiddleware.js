// import firebase from 'firebase/app'
// import 'firebase/firestore'

// const fetchListMiddleware = async () => {
//   const db = firebase.firestore()
//   // console.log('Check FETCH LIST START: ',userId )
//   return new Promise((resolve) => {
    
//     db.collection('users')
//     .where('score', '<', 20)
//     .orderBy('score', 'desc')
//     .onSnapshot(querySnapshot => {
//       let list = []

//       querySnapshot.forEach(doc => list.push(doc.data()))

//       resolve(list)
//     },
//     (error) => {
//       console.log('< REAL TIME DATA : ERROR > ', error)
//       resolve('error')
//     })

//   })
// }

// export {
//   fetchListMiddleware
// }



// db.collection(`users`).doc(userId).get()
// .then((response) => {
//   const userList = response.data().friends
//   // console.log('Database: ',  userList )
//   if (userList) resolve(userList)
//   if (!userList) resolve(false)
// })
// .catch((error) => {
//   console.log('Error fetch list: ', error)
// })