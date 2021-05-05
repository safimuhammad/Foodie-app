import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, Button, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-elements';
import * as Location from 'expo-location';
import { allUsersData, addUserToDb, getAllAds,getAllOrders } from '../../config/firebase'
import { useDispatch } from 'react-redux'

import { storeUserRes } from '../../store/actions/userAction'
import { storeRes } from '../../store/actions/resAction'


// import { Card, ListItem,  Icon } from 'react-native-elements'

import { Image } from 'react-native-elements';






export default function LandingPage({ navigation }) {


    const [userLocation, setUserLocation] = useState()
    const [loading, setloading] = useState(true)
    const [userUID, setUserUID] = useState()
    const dispatch = useDispatch()





    const user = useSelector(state => state.authReducer.user)
    const userData = useSelector(state => state.userReducer.res)
    const restaurantData = useSelector(state => state.resReducer.res)

    useEffect(() => {

        // if (user !== null) {
        //     setUserUID(user.uid)
        //     console.log('user', userUID)
        //     setloading(false)
        // }else{
        //     setloading(true)
        // }





        console.log("login useEffect")
        allUsersData().then(res => {
            dispatch(storeUserRes(res))



        })
        getAllAds().then(res => {
            dispatch(storeRes(res))
            //action
        
        })
        // getAllOrders().then(res => {
        //     console.log("orders",res)
        //     dispatch(storeOrder(res))
      
        //   })
      


        // regChecker()

    }, [])




    useEffect(() => {
        console.log("calling use effect of landing page")

        if (user !== null) {
            setUserUID(user.uid)
            console.log('user', userUID)
            regChecker()
            // setloading(false)
        } else {
            // setloading(true)
        }



    });




    const regChecker = () => {
        console.log("INSIDE REGCHECKER")
        console.log("checking user", user)

        const alluserUID = userData.map(item => { return item.currentUserID })
        // const currentUID = user

        const resData = restaurantData.map(item => { return item.currentUserID })



        if (userUID === alluserUID[0]) {
            console.log("INSIDE IF FIRST CLAUSE")
            return navigation.navigate('UserDash')


        }
        else if (userUID === resData[0]) {
            console.log("INSIDE second IF clause")
            return navigation.navigate('RestaurantTabs')


        } else {

        }

        setloading(false)


    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const { coords: { latitude, longitude } } = location

        setUserLocation({ latitude, longitude, latitudeDelta: 0.0005, longitudeDelta: 0.0005 });
    }



    // const userAdder = () => {
    //     addUserToDb({ Name: user.displayName, currentUserID: user.uid, photo: user.photoURL })
    // }




    return (



        <View style={styles.container}>
            <StatusBar style="auto" />

            {loading ?<Text h4 style={styles.text}>CHECKING YOUR REGISTRATION</Text> : 
            
            <Text  h4 style={styles.text}>REGISTER YOURSELF</Text>}



            {loading ? <Image
               source={require('../../../assets/loading.gif')}
                style={{ height: 200, width: 200 }} />

                : <View style={styles.container}><TouchableOpacity
                    style={styles.button}


                >

                    <Image
                       source={require('../../../assets/landingPage1.jpg')}
                        style={{ width: 250, height: 150, borderRadius: 20 }}
                        onPress={() => navigation.navigate('RestaurantRegister')}
                    />
                    <Text h4 style={{ paddingTop: 20, height: 150, }}>Register Restaurant</Text>
                </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Image
                             source={require('../../../assets/landingPage2.jpg')}
                            style={{ width: 250, height: 150, borderRadius: 20 }}
                            onPress={() => { navigation.navigate('UserRegistration')}}
                        />
                        <Text h4 style={{ paddingTop: 20, height: 150 }}>Register as User</Text>
                    </TouchableOpacity>
                </View> 
               }

          










        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingTop: 28
    },
    button: {
        alignItems: "center",
        backgroundColor: "#6495ED",
        width: '65%',
        height: '35%',
        padding: 1,
        borderRadius: 20
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        color: '#6495ED'


    }
});

