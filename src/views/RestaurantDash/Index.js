import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { storeRes } from '../../store/actions/resAction'
import { removeUser } from '../../store/actions/authAction'
import { storeOrder, removeOrder } from '../../store/actions/orderAction'
import { useDispatch } from 'react-redux'
import { getAllAds, getAllOrders, logout, resLogout } from '../../config/firebase'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';

import { Image, Icon } from 'react-native-elements';

export default function RestaurantDash({ navigation }) {
  const [restaurants, setRestaurants] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [currentUserDetails, setCurrentUserDetails] = useState()
  const [currentOrder, setCurrentOrder] = useState()
  const [onlyOrders, setOnlyOrders] = useState()
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  const user = useSelector(state => state.authReducer.user)
  const restaurant = useSelector(state => state.resReducer.res)
  const orders = useSelector(state => state.orderReducer.res)
  console.log("order", orders)








  useEffect(() => {
    // getAllAds().then(res => {
    //   dispatch(storeRes(res)) //action
    // })

    // getAllOrders().then(res => {
    //   dispatch(storeOrder(res))

    // })






    getUserDetails()
    getOrder()

  }, [])



  const getUserDetails = () => {
    const userDetails = []

    restaurant.forEach(doc => {
      console.log("doc", doc.currentUserID)
      console.log("userUID", user.uid)

      if (user.uid === doc.currentUserID) {
        userDetails.push({ doc, id: doc.id })
      }
      setCurrentUserDetails(userDetails)

      setloading(false)

    })
    console.log("userDetails", userDetails)





  }


  const getOrder = () => {
    const restaurantOrder = []

    orders.forEach(doc => {

      if (user.uid === doc.restaurantId) {
        restaurantOrder.push({ doc, id: doc.id })
      }
      setCurrentOrder(restaurantOrder)
      setOnlyOrders(doc.Order)


    })
    // console.log("restaurantOrder",restaurantOrder)





  }








  const userOut = () => {
    // dispatch(removeUser())



    logout()

    navigation.navigate('Login')



  }




  return (

    <View style={styles.container}>

      {/* <StatusBar animated={true}
                backgroundColor='#6495ED'
                barStyle='default'
            /> */}

      <Text style={{
        fontSize: 42, color: 'white', textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
      }}>

        {loading ? <Image
          source={{ uri: 'https://i.pinimg.com/originals/72/b7/2f/72b72ff0c392a16c6b12e80bbe3473c5.gif' }} />

          : currentUserDetails.map(item => { return item.doc.restaurantName })}



      </Text>





      <View style={styles.contnt}>
        <Icon

          reverse
          name="log-out-outline"
          type='ionicon'
          color='green'
          onPress={() => userOut()}





        />

        <Text style={{
          fontSize: 22, fontStyle: 'italic', color: '#6495ED', textShadowColor: '#6495ED',
          textShadowOffset: { width: 5, height: 5 },
          textShadowRadius: 10,
        }}>
          Current Order {"\n"}
        </Text>





        <ScrollView >
          <Text style={{ fontStyle: 'italic', color: '#6495ED' }}>Order Sent by ID :{orders[0].orderSender}  {"\n"}</Text>

          <Text style={{
            fontSize: 22, fontStyle: 'italic', color: '#6495ED', textShadowColor: '#6495ED',
            textShadowOffset: { width: 5, height: 5 },
            textShadowRadius: 10,
          }}>
            ITEM AND PRICE {"\n"}</Text>
          
          <Text> {loading ? <Image
            source={{ uri: 'https://i.pinimg.com/originals/72/b7/2f/72b72ff0c392a16c6b12e80bbe3473c5.gif' }} />

            :
            onlyOrders.map(item => {
              return <>
                <Text style={{ fontSize: 20, color: "#6495ED" }}>{item.item} </Text>{"\n"}
                <Text>---------------------------------------------------------------------</Text>
                <Text style={{ fontSize: 20, color: "red" }}>{item.price} </Text>{"\n"}



              </>
            })}

            <Text>___________________________________________________</Text>
          </Text>
        </ScrollView>


      </View>



    </View>
  )
}
const styles = StyleSheet.create({
  container: {

    flex: 1,

    backgroundColor: '#6495ED',
    flexDirection: 'column',







  },
  contnt: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingTop: 15,



  },
  text: {
    fontSize: 20,



  }
});

