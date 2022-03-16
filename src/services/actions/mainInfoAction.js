import {baseUrl, checkResponse} from "../../utils/consts";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'

export const ADD_ITEMS_OTHER_COUNT = 'ADD_ITEMS_OTHER_COUNT'
export const ADD_ITEMS_BUN_COUNT = 'ADD_ITEMS_BUN_COUNT'
export const REMOVE_ITEMS_COUNT = 'REMOVE_ITEMS_COUNT'
export const REFRESH_ITEMS_COUNT = 'REFRESH_ITEMS_COUNT'




export function getItems() {
    return function (dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(data => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: data.data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: GET_ITEMS_FAILED
                });
            });
    };
}
