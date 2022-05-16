import {createStore, applyMiddleware, Store} from 'redux';
import {rootReducer} from './reducers/';
import thunk from 'redux-thunk';
import {socketMiddleware} from "./middleware/webSocket";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "./actions/constant";
import { AppThunk } from './types';
import {AppDispatch, RootState} from "./types";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

export interface IWsActions {
    WS_CONNECTION_START: typeof WS_CONNECTION_START,
    WS_CONNECTION_CLOSED: typeof WS_CONNECTION_CLOSED,
    WS_CONNECTION_SUCCESS: typeof WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR: typeof WS_CONNECTION_ERROR,
    WS_GET_MESSAGE: typeof WS_GET_MESSAGE,
}
const wsActions: IWsActions = {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START
}

export const store: Store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketMiddleware(wsActions))
    )
);

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
