import { combineReducers } from 'redux';
import {mainInfoReducer} from './mainInfoReducer'
import {getObjectModal} from './modalReducer'
import {itemsConstructor} from './constructorReducer'
import {orderReducer} from './orderReducer'


export const rootReducer = combineReducers({
    info: mainInfoReducer,
    modal: getObjectModal,
    constructorItems: itemsConstructor,
    order: orderReducer
})
