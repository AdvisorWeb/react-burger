import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TItemsActions } from '../actions/mainInfoAction';
import { TAuthActions } from '../actions/authAction';
import { TConstructorItems} from '../actions/constructorAction';
import { TOrderActions} from '../actions/oderAction';
import {TWsActions} from "../actions/wsActions";
import {store} from "../store";

type TApplicationActions =
    | TItemsActions
    | TAuthActions
    | TConstructorItems
    | TOrderActions
    | TWsActions
    ;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator< ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
