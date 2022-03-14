import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from '../actions/oderAction'


const initialState = {
    answer: {},
    orderRequest: false,
    orderFailed: false,
    isLoading: true
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                answer: action.answer,
                orderRequest: false,
                isLoading: false
            };
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false, isLoading: false };
        }
        default: {
            return state;
        }
    }
}