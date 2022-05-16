import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    ADD_ITEMS_OTHER_COUNT,
    ADD_ITEMS_BUN_COUNT,
    REMOVE_ITEMS_COUNT,
    REFRESH_ITEMS_COUNT,
} from '../actions/constant'
import {TItemsActions} from '../actions/mainInfoAction'
import {TItem} from "../../utils/tsTypes";
import {addCountBun, addCountObj, addCountOther, refreshCount, removeCountOther} from "../../utils/consts";

export type TItemsState = {
    items: (TItem)[] | null
    itemsRequest: boolean,
    itemsFailed: boolean,
    isLoading: boolean
};

const initialState: TItemsState = {
    items: null,
    itemsRequest: false,
    itemsFailed: false,
    isLoading: true
};

export const mainInfoReducer = (state = initialState, action: TItemsActions): TItemsState => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                items: addCountObj(action.data),
                itemsRequest: false,
                isLoading: false
            };
        }
        case ADD_ITEMS_BUN_COUNT : {
            return {
                ...state,
                items: state.items && addCountBun(state.items, action.card._id)
            };
        }
        case ADD_ITEMS_OTHER_COUNT : {
            return {
                ...state,
                items: state.items && addCountOther(state.items, action.card._id)
            };
        }
        case REMOVE_ITEMS_COUNT: {
            return {
                ...state,
                items: state.items && removeCountOther(state.items, action.id)
            };
        }
        case REFRESH_ITEMS_COUNT: {
            return {
                ...state,
                items:  state.items && refreshCount(state.items),
            };
        }
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                items: null,
                itemsFailed: false,
            };
        }
        default: {
            return state;
        }
    }
}