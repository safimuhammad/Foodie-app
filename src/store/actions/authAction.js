import { auth } from '../../config/firebase'

function addUser() {

  return dispatch => {
    auth.onAuthStateChanged(user => {

      console.log("addUser called",user)
      dispatch({
        type: 'ADD_USER',
        data: user
      })

    })
  }
}
console.log("in Auth action")
function removeUser() {
  return {
    type: 'REMOVE_USER',
    data: null
  }
}
export {
  addUser,
  removeUser
}
