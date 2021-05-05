import { combineReducers } from 'redux'
import {authReducer} from './reducers/authReducer'
import {resReducer} from './reducers/resReducer'
import {userReducer} from './reducers/userReducer'
import {orderReducer} from './reducers/orderReducer'
import {menuReducer} from './reducers/menuReducer'


export default combineReducers({
    authReducer,
    resReducer,
    userReducer,
    orderReducer,
    menuReducer
})