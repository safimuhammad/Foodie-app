import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux'
import { Image } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { addOrderToDb, getAllMenu } from '../../config/firebase'
import { storeMenu } from '../../store/actions/menuAction'
import { useDispatch } from 'react-redux'

// import { Button } from 'react-native-elements/dist/buttons/Button';

export default function Details({ navigation, route }) {
    const [currentRestaurantDetails, setCurrentRestaurantDetails] = useState()
    // const [order, setOrders] = useState()
    // const [allOrders, setAllOrders] = useState([])
    const [placeholder, setPlaceholder] = useState("Place Your Orders")
    const [restaurantMenu, setRestaurantMenu] = useState()
    const [takeOrder, setTakeOrder] = useState()
    const [fullOrder, setFullOrder] = useState([])

    const [loading, setloading] = useState(true)
    const { itemId } = route.params;
    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.resReducer.res)
    const user = useSelector(state => state.authReducer.user)
    const menu = useSelector(state => state.menuReducer.res)

    console.log("item id ", itemId)
    console.log("user", user.uid)

    useEffect(() => {
        getAllMenu().then(res => {
       
            dispatch(storeMenu(res))

        })

        getRestaurantDetails()
        setRestaurantMenu(menu[0].allMenuItems)



    }, [])
    console.log("this is order",takeOrder)
    console.log("this is ALL order",fullOrder)

    const getRestaurantDetails = () => {
        const restaurantDetails = []

        restaurant.forEach(doc => {
            console.log("doc", doc.currentUserID)


            if (itemId === doc.currentUserID) {
                restaurantDetails.push({ doc, id: doc.id })
            }
            setCurrentRestaurantDetails(restaurantDetails)
            setloading(false)

        })






    }
   const  cart = () =>{
       const list = [...fullOrder]
      
       list.push(takeOrder)
      
      
       var filtered = list.filter(function (el) {
        return el != null;
      });
      
      
      setFullOrder(filtered)
   }

   


    const sendOrder = () => {
        addOrderToDb({ Order: fullOrder, orderSender: user.uid, restaurantId: itemId }).then(res => {
            Alert.alert("Your Order is Successfully Placed")
            navigation.goBack()
        })
    }




    console.log("restaurantDetails", currentRestaurantDetails)
    
    return (

        <View style={styles.container}>
            <Text style={{ fontSize: 32, fontStyle: 'italic', color: '#6495ED', }}>{loading ? <Image
                source={{ uri: 'https://i.pinimg.com/originals/72/b7/2f/72b72ff0c392a16c6b12e80bbe3473c5.gif' }}
            /> : currentRestaurantDetails.map(item => { return item.doc.restaurantName })


            }

            </Text>
            <Text style={styles.content}>Kindly Pick Your Order</Text>

            <Text style={styles.menu}> {loading ? <Image
                source={{ uri: 'https://i.pinimg.com/originals/72/b7/2f/72b72ff0c392a16c6b12e80bbe3473c5.gif' }}
            /> : restaurantMenu.map(item => {
                return (<TouchableOpacity style={styles.menu} onPress={()=> {setTakeOrder({item: item.item ,price:item.price});cart()}}>
                    
                    <Text style={{color:'white',fontSize:22}}>{item.item}    {"\n"}</Text>
                    <Text style={{ color: "red" ,fontSize:22}}>{item.price}  {"\n"}</Text>
           




                    </TouchableOpacity>)
            })}</Text>
            <Button onPress={()=> sendOrder()} title="place Order"/>

        



        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',








    },
    content: {
        flex: 0.09,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: '100%',
        margin: 15,
        fontSize: 22,
        fontStyle: 'italic',
        color: '#6495ED',
        paddingLeft: 65







    },
    input: {




        borderWidth: 1,
        width: '60%',
        borderRadius: 15,
        height: 35

    },
    btn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'


    },
    text: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',


    },
    menu: {
       alignItems:"center",
       flexDirection:"row",
       justifyContent:"space-around",
        backgroundColor: '#1E90FF',
       
        padding: 1,
        borderRadius: 20,
        margin:15

    }

})