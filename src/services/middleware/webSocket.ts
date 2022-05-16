import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage
} from '../actions/wsActions'

import {Middleware} from "redux";
import {RootState} from "../types";
import {IWsActions} from "../store";


export const socketMiddleware = (wsActions: IWsActions): Middleware<{}, RootState> => {
    return (store) => (next) => (action) => {
        let socket: any = null;
        const {dispatch} = store;
        const {type, payload} = action;
        const {WS_CONNECTION_START, WS_CONNECTION_CLOSED} = wsActions;
        if (type === WS_CONNECTION_START) {
            socket = new WebSocket(`${payload}`);
        }
        if (socket && type === WS_CONNECTION_CLOSED) {
            socket.close()
        }
        if (socket) {
            socket.onopen = () => {
                dispatch(wsConnectionSuccess());
            };

            socket.onerror = () => {
                dispatch(wsConnectionError());
            };

            socket.onmessage = (event: MessageEvent) => {
                dispatch(wsGetMessage(JSON.parse(event.data)))
            };

            socket.onclose = () => {
                dispatch(wsConnectionClosed());
            };
        }
        next(action);
    }
}