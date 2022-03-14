import {urlPost} from "../../utils/consts";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'


export function getOrder({order}) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetch(`${urlPost}/${order}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    answer: data
                });
            })
            .catch(e => {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            });
    };
}
