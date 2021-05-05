import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions,Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux'


export default function Map (props) {
  const [location, setLocation] = useState();


  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

   
  }
 const lat= props.location.lat

  const marker = {
    latlng: {
      latitude: props.location.lat,
      longitude: props.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },


  }
  console.log("marker data", marker)

 

  return (
    <View >
      <MapView 
        style={styles.map}
        region={ marker.latlng}
      >
          <Marker
          coordinate={ marker.latlng}
         
          
      />
      </MapView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    // width: Dimensions.get('window').width,

    width:330,
    height:200
    // height: Dimensions.get('window').height,

  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
    flexDirection: 'row'
  },
  cameraBtn: {
    alignSelf: 'flex-end',
    width: Dimensions.get('window').width,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  txtInput: {
    width: 150,
    height: 40,
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'gray',
    color: 'black'
  },
  img: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  customBtn: {
    height: 80,
    width: 150,
    backgroundColor: 'pink',
    color: 'red'
  },
  btnText: {
    fontSize: 30
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});