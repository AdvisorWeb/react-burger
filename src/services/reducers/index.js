import { combineReducers } from 'redux';
import {mainInfoReducer} from './mainInfoReducer'
import {itemsConstructor} from './constructorReducer'
import {orderReducer} from './orderReducer'
import {authReducer} from './authReducer'


export const rootReducer = combineReducers({
    info: mainInfoReducer,
    constructorItems: itemsConstructor,
    order: orderReducer,
    authState: authReducer
})
