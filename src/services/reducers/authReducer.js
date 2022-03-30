import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,

    SIGN_USER_REQUEST,
    SIGN_USER_SUCCESS,
    SIGN_USER_ERROR,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,

    REFRESH_COOKIES_REQUEST,
    REFRESH_COOKIES_SUCCESS,
    REFRESH_COOKIES_ERROR,

    LOGOUT__USER_REQUEST,
    LOGOUT__USER_SUCCESS,
    LOGOUT__USER_ERROR,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,

    REFRESH_USER_REQUEST,
    REFRESH_USER_SUCCESS,
    REFRESH_USER_ERROR,


    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR
} from '../actions/authAction'

const initialState = {
    "authorization" : false,
    "authorizationCheck" : false,
    'auth' : {
        'request': false,
        'error': false,
        'errorMessage': '',
        'accessToken': null,
        'refreshToken': null,
        'sendingEmail': false,
        "user": {
            "email": "",
            "name": ""
        },
    }
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_USER_REQUEST: {
            return {
                ...state,
                'auth': {
                    'request': true,
                    'error': false,
                }
            };
        }
        case SIGN_USER_SUCCESS: {
            const {accessToken, refreshToken, user} = action.data
            return {
                ...state,
                "authorization" : true,
                'auth' : {
                    ...state.auth,
                    'accessToken': accessToken,
                    'refreshToken': refreshToken,
                    'error': false,
                    'request': false,
                    "user": user
                }
            };
        }
        case SIGN_USER_ERROR: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    'request': false,
                    'error': true,
                    'errorMessage': action.error,
                }
            };
        }

        case POST_USER_REQUEST: {
            return {
                ...state,
                'auth': {
                    ...state.auth,
                    'request': true,
                    'error': false,
                }
            };
        }
        case POST_USER_SUCCESS: {
            const {accessToken, refreshToken, user} = action.data
            return {
                ...state,
                "authorization" : true,
                'auth' : {
                    ...state.auth,
                    'request': false,
                    'accessToken': accessToken,
                    'refreshToken':refreshToken,
                    "user": user
                }
            };
        }
        case POST_USER_ERROR: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    'error': true,
                    'request': false,
                    'errorMessage': action.error
                }
            };
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                'auth': {
                    ...state.auth,
                    'error': false,
                    'request': true,
                }
            };
        }
        case GET_USER_SUCCESS: {
            const {user} = action.data
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    'request': false,
                    user
                }
            };
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                "authorization" : false,
                'auth' : {
                    ...state.auth,
                    "request": false,
                    'error': true,
                    'errorMessage': action.error,
                }
            };
        }

        case REFRESH_USER_REQUEST: {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    "request": true,
                    'error': false,
                }
            };
        }
        case REFRESH_USER_SUCCESS: {
            const {user} = action.data
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    "request": false,
                    'error': false,
                    user
                }
            }
        }
        case REFRESH_USER_ERROR: {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    "request": false,
                    'error': true,
                    'errorMessage': action.error
                }
            };
        }

        case LOGOUT__USER_REQUEST: {
            return {
                ...state,
                'auth': {
                    ...state.auth,
                    'error': false,
                    'request': true,
                }
            };
        }
        case LOGOUT__USER_SUCCESS: {
            return {
                ...state,
                "authorization" : false,
                'auth' : {
                    ...state.auth,
                    'request': false,
                    'error': false,
                    'accessToken': null,
                    'refreshToken': null,
                    'sendingEmail': false,
                    "user": {
                        "email": "",
                        "name": ""
                    },
                }
            };
        }
        case LOGOUT__USER_ERROR: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    'error': true,
                    request: false
                }
            };
        }

        case REFRESH_COOKIES_REQUEST: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    'request': true,
                }
            };
        }
        case REFRESH_COOKIES_SUCCESS: {
            const {accessToken, refreshToken} = action
            return {
                ...state,
                "authorization" : true,
                "authorizationCheck" : true,
                'auth' : {
                    ...state.auth,
                    'request': false,
                    "accessToken": accessToken,
                    "refreshToken": refreshToken,
                }
            };
        }
        case REFRESH_COOKIES_ERROR: {
            return {
                ...state,
                "authorizationCheck" : true,
               auth: {
                    ...state.auth,
                   'request': false,
               }
            };
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    request: true,
                    sendingEmail: false
                }
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    request: false,
                    sendingEmail: true
                }
            };
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    sendingEmail: false,
                    request: false,
                    error: true,
                    errorMessage: action.error
                }
            };
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    request: true,
                    sendingEmail: true
                }
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    request: false,
                    sendingEmail: false
                }
            };
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                'auth' : {
                    ...state.auth,
                    sendingEmail: true,
                    request: false,
                    error: true,
                    errorMessage: action.error
                }
            };
        }


        default: {
            return state;
        }
    }
}