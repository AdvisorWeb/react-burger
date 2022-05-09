import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage
} from '../actions/wsActions'

import {Middleware} from "redux";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../actions/constant";
import {RootState} from "../types";

interface IWsActions {
    WS_CONNECTION_START: typeof WS_CONNECTION_START,
}

export const socketMiddleware = (wsActions: IWsActions): Middleware<{}, RootState> => {
    return (store) => (next) => (action) => {
        let socket: any = null;
        const {dispatch} = store;
        const {type, payload} = action;
        const {WS_CONNECTION_START} = wsActions;
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