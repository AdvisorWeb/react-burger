import {v4 as uuidv4} from "uuid";
import {ADD_ITEMS_BUN_COUNT, ADD_ITEMS_OTHER_COUNT} from "./mainInfoAction";

export const ADD_ITEM_BUN = 'ADD_ITEM_BUN'
export const ADD_ITEM_OTHER = 'ADD_ITEM_OTHER'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const MOVE_ITEM = 'MOVE_ITEM'
export const REFRESH_ITEMS = 'REFRESH_ITEMS'

export const addItemConstructor = (card) => {
    const key = uuidv4()
    return function (dispatch) {
        if(card.type === 'bun'){
            dispatch({
                type: ADD_ITEM_BUN,
                payload: {
                    card: {...card, key, count: 2},
                }
            })
            dispatch({type: ADD_ITEMS_BUN_COUNT, card})
        }
        else{
            dispatch({
                type: ADD_ITEM_OTHER,
                payload: {
                    card: {...card, key},
                }
            })
            dispatch({type: ADD_ITEMS_OTHER_COUNT, card})
        }
    }
}
