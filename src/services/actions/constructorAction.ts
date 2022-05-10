import {v4 as uuidv4} from "uuid";
import {AppDispatch} from '../types';
import {TItem} from "../../utils/tsTypes";

import {
    ADD_ITEM_BUN,
    ADD_ITEMS_BUN_COUNT,
    ADD_ITEM_OTHER,
    ADD_ITEMS_OTHER_COUNT,
    REMOVE_ITEM,
    MOVE_ITEM,
    REFRESH_ITEMS
} from './constant'

export interface IAddItemBunAction {
    readonly type: typeof ADD_ITEM_BUN;
    payload: {
        card: TItem
    }
}
export const addItemBunAction = ( card: TItem, key: string): IAddItemBunAction => ({
    type: ADD_ITEM_BUN,
    payload: {
        card: {...card, key, count: 2},
    }
});
export interface IAddItemBunCountAction {
    readonly type: typeof ADD_ITEMS_BUN_COUNT;
    card: TItem
}
export const addItemBunCountAction = ( card: TItem): IAddItemBunCountAction => ({
    type: ADD_ITEMS_BUN_COUNT,
    card
});

export interface IAddItemOtherAction {
    readonly type: typeof ADD_ITEM_OTHER;
    payload: {
        card: TItem
    }
}
export const addItemOtherAction = ( card: TItem, key: string): IAddItemOtherAction => ({
    type: ADD_ITEM_OTHER,
    payload: {
        card: {...card, key},
    }
});
export interface IAddItemOtherCountAction {
    readonly type: typeof ADD_ITEMS_OTHER_COUNT;
    card: TItem
}
export const addItemOtherCountAction = ( card: TItem): IAddItemOtherCountAction => ({
    type: ADD_ITEMS_OTHER_COUNT,
    card
});

export interface IRemoveItemAction {
    readonly type: typeof REMOVE_ITEM,
    readonly key: string
}
export interface IMoveItemAction {
    readonly type: typeof MOVE_ITEM,
    readonly hoverIndex: number
    readonly dragIndex: number
}
export interface IRefreshItemsAction {
    readonly type: typeof REFRESH_ITEMS,
}

export type TConstructorItems =
    | IAddItemBunAction
    | IAddItemBunCountAction
    | IAddItemOtherAction
    | IAddItemOtherCountAction
    | IRemoveItemAction
    | IMoveItemAction
    | IRefreshItemsAction
;

export const addItemConstructor = (card: TItem) => {
    const key: string = uuidv4()
    return function (dispatch: AppDispatch) {
        if(card.type === 'bun'){
            dispatch(addItemBunAction(card, key))
            dispatch(addItemBunCountAction(card))
        }
        else{
            dispatch(addItemOtherAction(card, key))
            dispatch(addItemOtherCountAction(card))
        }
    }
}
