import {baseUrl, checkResponse} from "../../utils/consts";
import { AppDispatch, AppThunk } from '../types';
import {TItem} from '../../utils/tsTypes'
import {GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    ADD_ITEMS_OTHER_COUNT,
    ADD_ITEMS_BUN_COUNT,
    REMOVE_ITEMS_COUNT,
    REFRESH_ITEMS_COUNT
} from './constant'

export interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}
export const getItemsRequestAction = (): IGetItemsRequestAction => ({
    type: GET_ITEMS_REQUEST
});

export interface IGetItemsFailedAction {
    readonly type: typeof GET_ITEMS_FAILED;
}
export const getItemsFailedAction = (): IGetItemsFailedAction => ({
    type: GET_ITEMS_FAILED
});

export interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    data: (TItem)[];
}
export const getItemsSuccessAction = ( data: (TItem)[] ): IGetItemsSuccessAction => ({
    type: GET_ITEMS_SUCCESS,
    data
});

export interface IAddItemsOtherCountAction {
    readonly type: typeof ADD_ITEMS_OTHER_COUNT;
    readonly card: TItem
}
export interface IAddItemsBunCountAction {
    readonly type: typeof ADD_ITEMS_BUN_COUNT;
    readonly card: TItem
}
export interface IRemoveItemsCountAction {
    readonly type: typeof REMOVE_ITEMS_COUNT;
    readonly id: string
}
export interface IRefreshItemsCountAction {
    readonly type: typeof REFRESH_ITEMS_COUNT;
}


export type TItemsActions =
    | IGetItemsRequestAction
    | IGetItemsFailedAction
    | IGetItemsSuccessAction
    | IAddItemsOtherCountAction
    | IAddItemsBunCountAction
    | IRemoveItemsCountAction
    | IRefreshItemsCountAction;


export const getItems: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch(getItemsRequestAction());
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(data => {
                dispatch(getItemsSuccessAction(data.data));
            })
            .catch(error => {
                console.log(error)
                dispatch(getItemsFailedAction());
            });
    };
}
