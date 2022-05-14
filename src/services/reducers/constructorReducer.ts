import {
    ADD_ITEM_BUN,
    ADD_ITEM_OTHER,
    REMOVE_ITEM,
    MOVE_ITEM,
    REFRESH_ITEMS,
} from '../actions/constant'
import {TItem} from "../../utils/tsTypes";
import {TConstructorItems} from "../actions/constructorAction";

export type TItemsConstructorState = {
    'bun': (TItem | null)[],
    'other': (TItem | null)[],
}

const initialState: TItemsConstructorState = {
    'bun': [],
    'other': [],
};

export const itemsConstructor = (state = initialState, action: TConstructorItems): TItemsConstructorState => {
    switch (action.type) {
        case ADD_ITEM_BUN: {
            return {
                ...state,
                'bun': [{...action.payload}]
            };
        }
        case ADD_ITEM_OTHER: {
            return {
                ...state,
                'other': [...state.other, {...action.payload}]
            };
        }
        case REMOVE_ITEM: {
            const key = action.payload.key
            return {
                ...state,
                'other': state.other.filter((item) => item && item.key !== key)
            };
        }
        case MOVE_ITEM: {
            const ingredients = [...state.other];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
            return {
                ...state,
                'other': ingredients
            };
        }
        case REFRESH_ITEMS: {
            return {
                ...state,
                'bun': [],
                'other': [],
            };
        }
        default: {
            return state;
        }
    }
}
