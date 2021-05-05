import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity, Text, ImageBackground, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { removeUser} from '../../store/actions/authAction'
import { useDispatch } from 'react-redux'
import { logout } from '../../config/firebase'
import { useSelector } from 'react-redux'
import { Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Map from '../Map/Index'


import { TextInput } from 'react-native-gesture-handler';

export default function UserDash({ navigation }) {
    const [loading, setloading] = useState(true)
    const [restaurants, setRestaurants] = useState()
    const [location, setLocation] = useState();
    
    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)
    const restaurant = useSelector(state => state.resReducer.res)


    useEffect(() => {





        if (restaurant) {
            setRestaurants(restaurant)
            console.log('restaurant', restaurants)
        }
        setloading(false)



    }, [])

    console.log("restaurant at user dash", user)



const logOutUser = () =>{
    console.log("logout working")
    // dispatch(removeUser())
    
    logout()
    navigation.navigate('Login')


}


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar animated={true}
                backgroundColor='#6495ED'
                barStyle='default'
            />
            <View style={styles.head}>

                <ImageBackground source={{ uri: 'https://media.cntraveler.com/photos/5f5fad3f7557491753644e3b/3:2/w_4050,h_2700,c_limit/50States50Cuisines-2020-AmberDay-Lede%20Option.jpg' }}
                    style={styles.mainImage}>

                    <Image
                        source={{ uri: 'https://i.pinimg.com/originals/fe/c4/09/fec409ee127af1cdc1b5283cc6520234.jpg' }}
                        style={styles.insideImage}

                    />
                </ImageBackground>

            </View>
            <Text></Text>
            <Icon

                reverse
                name="log-out-outline"
                type='ionicon'
                color='#6495ED'
                onPress={()=> logOutUser()}
                



            />






            <TextInput placeholder="   search Restaurants..." style={styles.search} />






            {loading ? <Image
                source={{ uri: 'https://i.pinimg.com/originals/72/b7/2f/72b72ff0c392a16c6b12e80bbe3473c5.gif' }} />

                : restaurants.map(item => {
                    return <Card style={{ width: 500, height: 500 }}>
                        <Card.Title style={{ fontSize: 30, color: '#6495ED', fontStyle: 'italic' }}>{item.restaurantName}</Card.Title>
                        <Card.Divider />


                        <Text style={{ marginBottom: 10, fontSize: 16, color: '#6495ED', fontStyle: 'italic' }}>
                            Check Restaurant Location on Map
               </Text>
                        <View style={{ width: 250, height: 250 }}>
                            <Map location={item.restaurantLocation} />

                        </View>



                        <Button
                            icon={<Icon name='restaurant' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='OPEN RESTAURANT'
                            onPress={() => navigation.navigate('Details', {
                                itemId: item.currentUserID
                            })}
                        />

                    </Card>
                })}








            <Text >



            </Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white',
        flexDirection: 'column',







    },
    contnt: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',



    },
    head: {
        width: '100%',
        flex: 0.6,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,

    },
    mainImage: {

        resizeMode: "cover",
        justifyContent: "space-around",
        width: '100%',
        height: 70,
        flexDirection: 'column'

    },
    insideImage: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        width: 110,
        flexDirection: 'row'

    },
    search: {
        height: 35,
        margin: 12,
        borderWidth: 1,
        width: '90%',
        borderRadius: 15,

    },
   });

