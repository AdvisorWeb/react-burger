import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/constant'
import {TOrderActions} from '../actions/oderAction'

export type TOrderState = {
    data: {
        order: {
            number: number
        }
    },
    orderRequest: boolean,
    orderFailed: boolean,
    isLoading: boolean,
};
const initialState: TOrderState = {
    data: {
        order: {
            number: 0
        }
    },
    orderRequest: false,
    orderFailed: false,
    isLoading: true,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                orderRequest: true,
                data: {
                    order: {
                        number: 0
                    }
                },
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