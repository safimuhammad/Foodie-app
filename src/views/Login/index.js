import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ImageBackground} from 'react-native';
import * as Facebook from 'expo-facebook';
import { useDispatch } from 'react-redux'
import { addUser,removeUser } from '../../store/actions/authAction'
import { storeOrder } from '../../store/actions/orderAction'
import { auth,logout,allUsersData, getAllAds,getAllOrders} from '../../config/firebase'
import { useSelector } from 'react-redux'
import * as firebase from 'firebase/app';
import "firebase/auth";
import { Image, Button } from 'react-native-elements';
import { storeUserRes } from '../../store/actions/userAction'
import { storeRes } from '../../store/actions/resAction'


// import { register, login } from '../../config/navigation'



export default function Login({ navigation }) {
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.authReducer.user)
  const userData = useSelector(state => state.userReducer.res)
  const restaurantData = useSelector(state => state.resReducer.res)
  const [loading, setloading] = useState(true)

  // console.log("uid 1",user)








  useEffect(() => {


    if(user === null){
      console.log("user value is null")
      // dispatch(addUser())

    }else{
      console.log("running remove")
      dispatch(removeUser())
      // logout()

    }


    getAllOrders().then(res => {
      console.log("orders",res)
      dispatch(storeOrder(res))

    })

   
  
   
    
   

   

  }, [])
 
 
 4
 
  async function logIn() {

    console.log("Login function ")
    try {
      await Facebook.initializeAsync({
        appId: '189975629352721',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {

        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        auth.signInWithCredential(credential).catch((error) => { console.log(error) })
    

        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      
    

        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
         navigation.navigate('Resgistration')


       
       
        
     
       
      
        
      
      







      } else {
        
        // type === 'cancel'
      }
  
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  }

        

 function userCheck (){

  if (user === null){
    console.log("null cond")
    navigation.navigate('Login')
   
  }else{
    console.log(" not null cond")
    navigation.navigate('Resgistration')

  

  }
}
 
 
  function regChecker(){
    console.log("INSIDE REGCHECKER")
    const alluserUID = userData.map(item =>{ return item.currentUserID})
    const currentUID = user.uid

    const resData = restaurantData.map(item =>{return item.currentUserID})



    if (currentUID === alluserUID[0]){
        console.log("INSIDE IF FIRST CLAUSE")
        return navigation.navigate('UserDash')


    }
    else if (currentUID === resData[0]){
         console.log("INSIDE second IF clause")
          return navigation.navigate('RestaurantTabs')

        
    }else{
      navigation.navigate('Resgistration')

    }
  

}















 





  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://media.cntraveler.com/photos/5f5fad3f7557491753644e3b/3:2/w_4050,h_2700,c_limit/50States50Cuisines-2020-AmberDay-Lede%20Option.jpg' }}
        style={styles.mainImage}>

        <Image
          source={{uri:'https://i.pinimg.com/originals/fe/c4/09/fec409ee127af1cdc1b5283cc6520234.jpg'}}
          style={styles.insideImage}
        />


        <Button   title="Login with Facebook"
          onPress={() =>{ logIn(); dispatch(addUser())}}
         
          
        />
        

      </ImageBackground>















      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  mainImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
    width: '100%',
    flexDirection:'column'

  },
  insideImage: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150,
    width: '100%',
    flexDirection:'row'

  },
  fbButton:{
    color:"white",
    width:'50%'

  }
});
