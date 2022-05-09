import {checkResponse} from "../../utils/consts";

import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from './constant'
import {AppDispatch, AppThunk} from "../types";
import {postOrder} from "../../utils/api";

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST
}

export const getOrderRequest = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
})

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS
    readonly data: Response
}

export const getOrderSuccess = (data: Response): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    data
})

export interface IGetOrderErrorAction {
    readonly type: typeof GET_ORDER_FAILED
    readonly error: Error
}

export const getOrderError = (error: Error): IGetOrderErrorAction => ({
    type: GET_ORDER_FAILED,
    error
})


export type TOrderActions =
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderErrorAction

export const getOrder: AppThunk = ({order}) => {
    return function (dispatch: AppDispatch) {
        dispatch(getOrderRequest());
        postOrder(order)
            .then(checkResponse)
            .then(data => {
                dispatch(getOrderSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(getOrderError(error));
            });
    };
}

