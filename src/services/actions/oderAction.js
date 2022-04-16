import {baseUrl, checkResponse} from "../../utils/consts";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'


export function getOrder({order}) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetch(`${baseUrl}/orders/orders:${order}`)
            .then(checkResponse)
            .then(data => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    answer: data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: GET_ORDER_FAILED
                });
            });
    };
}

