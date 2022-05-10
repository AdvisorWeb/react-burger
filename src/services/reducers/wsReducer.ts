import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE, WS_CONNECTION_START
} from '../actions/constant';
import {TWsActions} from "../actions/wsActions";

export type TOrder = {
    createdAt: string
    ingredients: string[]
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
}
export type TWsState = {
    wsConnected: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number
    personal: boolean | null
    isLoaded: boolean
}

const initialState: TWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    personal: null,
    isLoaded: false
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                personal: action.personal,
                isLoaded: false
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
                 isLoaded: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
                 isLoaded: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                wsConnected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                isLoaded: true
            };
        default:
            return state;
    }
};