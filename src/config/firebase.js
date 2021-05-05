import * as firebase from 'firebase/app';

import "firebase/auth";
import  "firebase/firestore"
import "firebase/storage"


var firebaseConfig = {
  apiKey: "AIzaSyCxZzVdZ_0TwPlqZzM2qI3xIt3OougJKQ4",
  authDomain: "foodie-c60d4.firebaseapp.com",
  projectId: "foodie-c60d4",
  storageBucket: "foodie-c60d4.appspot.com",
  messagingSenderId: "219327175309",
  appId: "1:219327175309:web:94b4bb66300886e1ed20c4"
};

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}






const auth = firebase.auth()
const  db = firebase.firestore()
const storage = firebase.storage()



function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

function addRestaurantToDb(user) {
  return db.collection('Restaurants').add(user)
}
function addUserToDb(user) {
  return db.collection('User').add(user)


}
function addOrderToDb(order) {
  return db.collection('Orders').add(order)


}
function addMenuToDb(menu) {
  return db.collection('Menu').add(menu)


}


function allUsersData() {
  return new Promise((resolve) => {
    db.collection('User').get().then(snapshot => {
      const user = []
      snapshot.forEach(doc => {
        user.push({ ...doc.data(), id: doc.id })
      })
      resolve(user)
    })
  })
}




function getAllAds() {
  return new Promise((resolve) => {
    db.collection('Restaurants').get().then(snapshot => {
      const ads = []
      snapshot.forEach(doc => {
        ads.push({ ...doc.data(), id: doc.id })
      })
      resolve(ads)
    })
  })
}
function getAllOrders() {
  return new Promise((resolve) => {
    db.collection('Orders').get().then(snapshot => {
      const orders = []
      snapshot.forEach(doc => {
        orders.push({ ...doc.data(), id: doc.id })
      })
      resolve(orders)
    })
  })
}
function getAllMenu() {
  return new Promise((resolve) => {
    db.collection('Menu').get().then(snapshot => {
      const Menu = []
      snapshot.forEach(doc => {
        Menu.push({ ...doc.data(), id: doc.id })
      })
      resolve(Menu)
    })
  })
}
function logout() {
  return auth.signOut()
}

function resLogout() {
  const dispatch = useDispatch()
  dispatch(removeUser())
     
 
  return auth.signOut()
    
     
}


export {
  register,
  allUsersData,
  auth,
  db,
  addRestaurantToDb,
  getAllAds,
  addUserToDb,
  addOrderToDb,
  getAllOrders,
  getAllMenu,
  addMenuToDb,
  logout,
  resLogout
  
}