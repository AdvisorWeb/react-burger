import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from './constant';
import {TWsState} from "../reducers/wsReducer";

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string
    readonly personal: boolean
}
export const wsConnectionStart = (url: string, personal: boolean): IWsConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload: url,
    personal
});

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
});

export interface IWsConnectionError{
    readonly type: typeof WS_CONNECTION_ERROR;
}
export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR
});

export interface IWsConnectionClosed{
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export const wsConnectionClosed = (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
})

export interface IWsGetMessage{
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWsState
}
export const wsGetMessage = (message: TWsState): IWsGetMessage => ( {
    type: WS_GET_MESSAGE,
    payload: message
})


export type TWsActions =
    | IWsConnectionStartAction
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage