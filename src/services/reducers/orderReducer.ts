import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/constant'
import {TOrderActions} from '../actions/oderAction'
import {TItem} from "../../utils/tsTypes";

export type TOrderData = {
    name: string
    order: {
        createdAt:string
        ingredients: TItem[]
        name: string
        number: number
    }
    owner: {
        name: string
        email: string
        createdAt: string
        updatedAt: string
    }
    price: number
    status: string
    updatedAt:string
    _id: string
    success: boolean
}
export type TOrderState = {
    data: TOrderData | null
    orderRequest: boolean,
    orderFailed: boolean,
    isLoading: boolean,
};
const initialState: TOrderState = {
    data: null,
    orderRequest: false,
    orderFailed: false,
    isLoading: true,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                orderRequest: true,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                data: action.data,
                orderRequest: false,
                isLoading: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}