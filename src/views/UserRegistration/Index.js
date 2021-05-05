import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput, ImageBackground,TouchableOpacity,ScrollView, Image,Button} from 'react-native';
import { Text } from 'react-native-elements';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux'
import { addUserToDb } from '../../config/firebase'



export default function UserRegistration({navigation}) {
    const [userLocation, setUserLocation] = useState("awaiting location")
    const user = useSelector(state => state.authReducer.user)
   
    
    

    useEffect(() => {
        getCurrentLocation()
        addUserToDb({Name:user.displayName,uid:user.uid,photo:user.photoURL,userLocation:userLocation})

        navigation.navigate('UserDash')

    }, [])
    
    
    
    
const getCurrentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
          let  location  = await Location.getCurrentPositionAsync({});
          const { coords: { latitude, longitude } } = location
          console.log('location user ===>', location)
          setUserLocation({ latitude, longitude, latitudeDelta: 0.0005, longitudeDelta: 0.0005 }); }
          console.log('location user state ===>', userLocation)
          console.log('User DATA ===>', user)








   
          return (
        <View style={styles.container}>
          <Text style={{fontSize:15}}>REGISTERING YOU..</Text>
            <Image
                source={{ uri: 'https://cdn.dribbble.com/users/2571470/screenshots/5402707/ezgif.com-gif-maker-6.gif' }}
                style={{ height: 200, width: 200 }} />
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },})
