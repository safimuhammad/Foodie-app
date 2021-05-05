import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput, ImageBackground, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { Text } from 'react-native-elements';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { IMAGE } from '../../../assets/trial.png'

import { addRestaurantToDb, register } from '../../config/firebase'


import { RNChipView } from 'react-native-chip-view'

import * as firebase from 'firebase/app';
import 'firebase/storage';








export default function RestaurantRegister({ navigation }) {
  const [venues, setVenues] = useState([])
  const [distanceUser, setDistanceUser] = useState()
  const [searchMode, setSearchMode] = useState(false)
  const [items, setItems] = useState([])
  const [showCat, setShowCat] = useState(false)
  const [catButton, setCatButton] = useState(true)








  const [restaurantName, setRestaurantName] = useState()
  const [since, setSince] = useState()
  const [timings, setTimings] = useState()
  const [addSearch, setAddSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [location, setlocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState()
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState([])
  const [currentUserID, setCurrentUserID] = useState()
  const [userType, setUserType] = useState('Restaurant')
  const [uniqueKey, setUniqueKey] = useState("")



  const user = useSelector(state => state.authReducer.user)








  useEffect(() => {
    getCurrentLocation()
    takePermissionForImagePicker()

    if (user) {
      setCurrentUserID(user.uid)

    }






  }, [])
  console.log('restaurantName', restaurantName)
  console.log('timings', timings)
  console.log('since', since)
  console.log('add Search', addSearch)
  console.log('categories', categories)
  console.log('location', location)
  console.log('restaurant location', restaurantLocation)
  // console.log('image',image)
  console.log('user', currentUserID)






  const getCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords: { latitude, longitude } } = location
    console.log('location ===>', location)
    setlocation({ latitude, longitude, latitudeDelta: 0.0005, longitudeDelta: 0.0005 });
  }


  const takePermissionForImagePicker = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync()
    setHasPermission(status === 'granted')
  }
  if (hasPermission === null) {
    return <View />;
  }





  const infoChecker = () => {
    if (restaurantName === undefined) {
      Alert.alert("Confirm Your restaurantName field is empty")

    }
    else if (since === undefined) {
      Alert.alert("Confirm Your since field is empty")

    }
    else if (timings === undefined) {
      Alert.alert("please upload your new timings")

    } else if (categories === undefined) {
      Alert.alert("please upload your categories")

    } else if (restaurantLocation === undefined) {
      Alert.alert("please upload your new timings")

    } else if (image === undefined) {
      Alert.alert("please upload your image")

    }
    else {
      resgister()


    }


  }











  const fourSqureApi = () => {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=${location.latitude},${location.longitude}&near=${location.latitude},${location.longitude}&client_id=B1BJPX2DC2B3ZBBJVBDPIYBV5XFN23Q41WZIQRREFCWYKDHK&client_secret=FJA3N1R255U54FVUIV525KIECGJZTQW2ERKLYVYIBYJUGBAW&v=20210925`).then(response => response.json())
      .then(json => setVenues(json.response.venues)
      )
  }


 
  const address = (text) => {
    setAddSearch(text)

  }

  const filteredAddres = venues.filter(items => {
    return items.name.toLowerCase().includes(addSearch.toLowerCase())
  })




  const catSetter = (cat) => {
    const ArrayCat = [...categories]
    ArrayCat.push(cat)

    let catWithoutDuplicates = Array.from(new Set(ArrayCat));

    console.log(catWithoutDuplicates);
    setCategories(catWithoutDuplicates)

  }






  const takePictureFromGallery = () => {

    const imageArray = [...image]

    ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    }).then((result) => {
      if (!result.cancelled) {

        // User picked an image
        const { height, width, type, uri } = result;
        console.log("in blob", uri)
        setUniqueKey(uri)




        return uriToBlob(uri);

      }

    }).then((blob) => {


      return uploadToFirebase(blob);

    }).then((snapshot) => {
      console.log("in upload", imageArray)
      firebase.storage().ref().child(`certificates/${uniqueKey}`).getDownloadURL().then(url => {
        console.log('url**', url)
        console.log("here")
        imageArray.push(url)
        setImage(imageArray);



      })



    }).catch((error) => {

      throw error;

    });

  }
  console.log(typeof uniqueKey)
  console.log("key", uniqueKey)

  uriToBlob = (uri) => {
    console.log("in urito blob")

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = (blob) => {
    console.log("uploading")

    return new Promise((resolve, reject) => {

      var storageRef = firebase.storage().ref();

      storageRef.child(`certificates/${uniqueKey}`).put(blob, {
        // contentType: 'jpeg'
      }).then((snapshot) => {

        blob.close();

        resolve(snapshot);
        Alert.alert("Image Uploaded")

      }).catch((error) => {
        // console.log(error)

        reject(error);

      });

    });


  }






  console.log("File uploaded", image);



  const catDlt = (index) => {
    const list = [...categories]
    list.splice(index)
    setCategories(list)
  }

  const resgister = () => {

    addRestaurantToDb({ restaurantName, since, timings, categories, restaurantLocation, image, currentUserID, userType }).then(res => {
      Alert.alert("Successfully Registered")
      navigation.navigate('RestaurantDash')
    })

  }
  console.log("cat check", categories)



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar animated={true}
        backgroundColor='#6495ED'
        barStyle='default'
      />
      <ImageBackground source={require('../../../assets/backgroundImage.jpg')}
        style={styles.mainImage}>
        <Image style={{ height: 125, width: '100%', }} source={require('../../../assets/appIcon.jpg')} />
        <Text h2 style={styles.head}>Restaurant Registration</Text>



        <TextInput style={styles.input} placeholder="         Name of Your Restaurant" onChangeText={(text) => setRestaurantName(text)} />
        <TextInput style={styles.input} placeholder="            Since" keyboardType="numeric" onChangeText={(text) => setSince(text)} />
        <TextInput style={styles.input} placeholder="           Timings" keyboardType="numeric" onChangeText={(text) => setTimings(text)} />
        <TextInput style={styles.input} placeholder="           Address" onChangeText={(text) => { address(text); setSearchMode(true); fourSqureApi() }} value={addSearch} />

        {searchMode ? <ScrollView style={styles.scrollView}>
          <Text>Places Near You</Text>
          {filteredAddres.map((items, index) => {
            console.log('item check', items)
            return <>


              <TouchableOpacity style={styles.item} onPress={() => { setAddSearch(items.name); setSearchMode(false); setRestaurantLocation({ lat: items.location.lat, lng: items.location.lng }) }}>
                <Text style={styles.text}>{items.name}</Text>
                <Text style={styles.text}>{items.location.distance} meters</Text>
              </TouchableOpacity>




            </>
          })}


        </ScrollView> : <View />}




        <TouchableOpacity>
          <Icon

            reverse
            name='camera'
            type='ionicon'
            color='#6495ED'


            onPress={() => takePictureFromGallery()}
          />
          <Text style={styles.cat}>Select certificates</Text>

        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={() => { setShowCat(!showCat); setCatButton(!catButton) }}>
          {catButton ? <Text style={styles.cat}>Show Categories</Text> : <Text style={styles.cat}>Hide Categories</Text>}
        </TouchableOpacity>





        {showCat ? <View style={styles.chips}>

          <RNChipView
            title={'BBQ'}
            avatar={true}
            
            onPress={() => catSetter('BBQ')}


          />


          <RNChipView
            title={'Chineese'}
            avatar={true}
            onPress={() => catSetter("chineese")}

          />

          <RNChipView
            title={'Italian'}
            avatar={true}
            onPress={() => catSetter("Italian")}

          />


        </View> : <View />}

        {showCat ? <View style={styles.chipsSecond}>
          <RNChipView
            title={'Fast Food'}
            avatar={true}
            onPress={() => catSetter("Fast Food")}


          />

          <RNChipView
            title={'Desi Cuisine'}
            avatar={true}
            onPress={() => catSetter("Desi Cuisine")}


          />

          <RNChipView
            title={'Sea Food'}
            avatar={true}
            selectable={false}

            onPress={() => catSetter("Sea Food")}

          />
          
          
        </View>
         : <View />}





        <Text style={{ fontSize: 18, color: 'white' }}>{categories.map((item, index) => {
          return <>

            <RNChipView
              title={item}
              avatar={true}

              onPress={() => catDlt(index)}



            />
          </>

        })}</Text>



        <Button title="Register" style={styles.btn} onPress={() => infoChecker()} />











      </ImageBackground>

    </ScrollView>




  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  btn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',



  },

  input: {
    height: 35,
    margin: 0,
    borderWidth: 1,
    width: '80%',
    borderRadius: 15,
    backgroundColor: 'white'
  },
  head: {
    flexDirection: 'row',


    justifyContent: 'flex-start',
    color: 'white',
    backgroundColor: '#6495ED',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,




  },
  search: {


    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',



  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 30,



  },
  text: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',


  },
  item: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10
  },
  chips: {
    flex: 0.1,
    justifyContent: 'space-around', //horizontally align,
    alignItems: 'flex-start', //vertically align
    flexDirection: 'row',
 
   

  },
  chipsSecond: {
    flex:0.1,
    justifyContent: 'space-around', //horizontally align,
    alignItems: 'flex-start', //vertically align
    flexDirection: 'row',
   

  },
  galleryBtn: {
    flex: 0.19,

    borderWidth: 1,
    borderRadius: 15,
    width: '30%',
    backgroundColor: '#6495ED',
    borderColor: '#6495ED',






  },
  mainImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
    width: '100%',
    flexDirection: 'column'

  },
  cat: {
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#6495ED',
    fontSize: 22,
    width: 200,
    height: 35,
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,

  },
  selectCat: {
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#6495ED',
    fontSize: 16,
    width: 150,
    height: 35

  }


})
//    fetch ('https://api.foursquare.com/v2/venues/search?ll=24.9167872,67.0564352&categoryId=4d4b7105d754a06374d81259&near=24.9167872,67.0564352&client_id=B1BJPX2DC2B3ZBBJVBDPIYBV5XFN23Q41WZIQRREFCWYKDHK&client_secret=FJA3N1R255U54FVUIV525KIECGJZTQW2ERKLYVYIBYJUGBAW&v=20210925') .then(response => response.json())
//         .then(json => setVenues(json.response.venues))