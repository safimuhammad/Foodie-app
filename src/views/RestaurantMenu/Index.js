import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Alert, TouchableOpacity, Text, TextInput,ScrollView } from 'react-native';
import { addMenuToDb } from '../../config/firebase'
import { useSelector } from 'react-redux'


import { Icon } from 'react-native-elements'

export default function RestaurantMenu({navigation}) {
    const [item, setItem] = useState()
    const [price, setPrice] = useState()
    const [allMenuItems, setAllMenuItems] = useState([])

 

    const addItem = () => {
        const menu = [...allMenuItems]
        menu.push({ item: item, price: price })
        setAllMenuItems(menu)
        setItem("")
        setPrice("")

    }
  const deleteItem = (index) =>{

   const list = [...allMenuItems]
   list.splice(index)
   setAllMenuItems(list)
  }

  const addMenu = () =>{
    
    const restaurantID = useSelector(state => state.authReducer.user.uid)
    console.log('restaurantID',restaurantID)


    addMenuToDb({allMenuItems, restaurantID: restaurantID}).then(res=>{
        Alert.alert("Menu Uploaded")
        navigation.navigate('RestaurantDash')
    })

  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Insert Menu </Text>
            <TextInput style={styles.input} placeholder="Add Item" value={item} onChangeText={(text) => setItem(text)} />
            <TextInput style={styles.input} placeholder="Add Price" value={price} onChangeText={(text) => setPrice(text)} />
            <Icon

                reverse
                name='add'
                type='ionicon'
                color='#6495ED'
                style={styles.btn}
                onPress={() => addItem()}



            />
            <View style={styles.content}>
                <Text style={styles.text}>
                <Text style={{fontSize:22,fontStyle:'italic'}}>ITEM AND PRICE</Text> {"\n"}
                    {allMenuItems.map((item,index) => {
                        return <>
                            
                            <Text style={{fontSize:18,fontStyle:'normal',color:'#6495ED'}}>{item.item}:  </Text>{"\n"}
                          
                            <Text style={{fontSize:18,fontStyle:'normal',color:'red'}}>{item.price}</Text>{"\n"}
                            <Button title="delete item" onPress={()=>deleteItem(index)}/>{"\n"}
                        </>
                    })}
                </Text>
            </View>
            <Button title="Add Menu" onPress={()=>addMenu()}/>


        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',








    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      
      

        width: '100%',

        fontSize: 22,
        fontStyle: 'italic',
        color: '#6495ED',
        // paddingLeft: 65







    },
    input: {




        borderWidth: 1,
        width: '60%',
        borderRadius: 15,
        height: 35,
        margin: 10

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
    // container2: { 
    //     flex: 1,
    //     padding: 18,
    //     paddingTop: 35,
    //     backgroundColor: '#ffffff' 
    //   },
    //   HeadStyle: { 
    //     height: 50,
    //     alignContent: "center",
    //     backgroundColor: '#ffe0f0'
    //   },
    //   TableText: { 
    //     margin: 10
    //   }


})