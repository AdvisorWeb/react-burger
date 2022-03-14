import {
    ADD_OBJ_MODAL,
    REMOVE_OBJ_MODAL
} from '../actions/modalAction'


const initialState = {
    selectedObject: {},
};

export const getObjectModal = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OBJ_MODAL: {
            return {
                ...state,
                selectedObject: action.card
            };
        }
        case REMOVE_OBJ_MODAL: {
            return {
                ...state,
                selectedObject: {}
            };
        }

        default: {
            return state;
        }
    }
}