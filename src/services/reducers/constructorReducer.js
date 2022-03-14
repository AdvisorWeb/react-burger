import {
    ADD_ITEM_BUN,
    ADD_ITEM_OTHER,
    REMOVE_ITEM,
    MOVE_ITEM,
    REFRESH_ITEMS,
} from '../actions/constructorAction'

import {v4 as uuidv4} from 'uuid';

const initialState = {
    'bun' : [],
    'other' : [],
};

export const itemsConstructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_BUN: {
            return {
                ...state,
                'bun':  [{
                    ...action.card,
                    key: uuidv4(),
                    count: 2
                }]
            };
        }
        case ADD_ITEM_OTHER: {
            return {
                ...state,
                'other': [...state.other, {...action.card, key: uuidv4()}]
            };
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                'other': state.other.filter((item) => item.key != action.key)
            };
        }
        case MOVE_ITEM: {
            const ingredients = [...state.other];
            ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0]);
            return {
                ...state,
                'other': ingredients
            };
        }
        case REFRESH_ITEMS: {
            return {
                ...state,
                'bun' : [],
                'other' : [],
            };
        }
        default: {
            return state;
        }
    }
}