import React, { useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LandingPage from '../views/LandingPage/index'
import Login from '../views/Login/index'
import RestaurantRegister from '../views/RestaurantResgister/index'
import RestaurantDash from '../views/RestaurantDash/Index'
import UserRegistration from '../views/UserRegistration/Index'
import UserDash from '../views/UserDash/Index'
import Details from '../views/Details/Index'
import RestaurantMenu from '../views/RestaurantMenu/Index'
import Map from '../views/Map/Index'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch } from 'react-redux'
import { addUser,removeUser } from '../store/actions/authAction'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


export default function Navigation() {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(addUser())

  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name='Resgistration' component={LandingPage} />
        <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
        <Stack.Screen options={{ headerShown: false }} name='RestaurantRegister' component={RestaurantRegister} />
        <Stack.Screen options={{ headerShown: false }} name='RestaurantTabs' component={RestaurantTabs} />
        <Stack.Screen options={{ headerShown: false }} name='UserRegistration' component={UserRegistration} />
        <Stack.Screen options={{ headerShown: false }} name='UserDash' component={UserDash} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='Map' component={Map} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}
function RestaurantTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RestaurantDash" component={RestaurantDash} />
      <Tab.Screen name="RestaurantMenu" component={RestaurantMenu} />
    </Tab.Navigator>
  );
}
