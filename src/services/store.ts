import {createStore, applyMiddleware, Store} from 'redux';
import {rootReducer} from './reducers/';
import thunk from 'redux-thunk';
import {socketMiddleware} from "./middleware/webSocket";
import {WS_CONNECTION_START} from "./actions/constant";
import { AppThunk } from './types';
import {AppDispatch, RootState} from "./types";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

const wsActions = {
    WS_CONNECTION_START,
}

export const store: Store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketMiddleware(wsActions))
    )
);

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
