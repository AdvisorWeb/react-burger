import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    ADD_ITEMS_OTHER_COUNT,
    ADD_ITEMS_BUN_COUNT,
    REMOVE_ITEMS_COUNT,
    REFRESH_ITEMS_COUNT
} from '../actions/mainInfoAction'


const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    isLoading: true
};

export const mainInfoReducer = (state = initialState, action) => {
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
                items: action.items.map(item => {
                    return {...item, count: 0}
                }),
                itemsRequest: false,
                isLoading: false
            };
        }
        case ADD_ITEMS_BUN_COUNT : {
            return {
                ...state,
                items: state.items.map(item => {
                    if(item.type === "bun"){
                        if (item._id === action.card._id) {
                            return {...item, count: 2 }
                        }
                        else {
                            return {...item, count: 0 }
                        }
                    }
                    return item
                }),
            };
        }
        case ADD_ITEMS_OTHER_COUNT : {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.card._id) {
                        return {...item, count: item.count + 1 }
                    }
                    return item

                }),
            };
        }
        case REMOVE_ITEMS_COUNT: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.id) {
                        return {...item, count: item.count - 1}
                    }
                    return item
                }),
            };
        }
        case REFRESH_ITEMS_COUNT: {
            return {
                ...state,
                items: state.items.map(item => {
                    return {...item, count: 0}
                }),
            };
        }
        case GET_ITEMS_FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
}