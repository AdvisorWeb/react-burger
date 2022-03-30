import {checkResponse, deleteCookie} from "../../utils/consts";
import {
    loginRequest,
    registrationUserRequest,
    logoutRequest,
    refreshTokenRequest,
    forgotPassword,
    getUserInfo,
    patсhInfo,
    cookiesProcessing,
    resetPassword

} from "../../utils/api";

export const POST_USER_REQUEST = 'POST_USER_REQUEST'
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS'
export const POST_USER_ERROR = 'POST_USER_ERROR'

export const SIGN_USER_REQUEST = 'AUTH_USER_REQUEST'
export const SIGN_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const SIGN_USER_ERROR = 'AUTH_USER_ERROR'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const REFRESH_USER_REQUEST = 'REFRESH_USER_REQUEST'
export const REFRESH_USER_SUCCESS = 'REFRESH_USER_SUCCESS'
export const REFRESH_USER_ERROR = 'REFRESH_USER_ERROR'

export const REFRESH_COOKIES_REQUEST = 'REFRESH_COOKIES_REQUEST'
export const REFRESH_COOKIES_SUCCESS = 'REFRESH_COOKIES_SUCCESS'
export const REFRESH_COOKIES_ERROR = 'REFRESH_COOKIES_ERROR'

export const LOGOUT__USER_REQUEST = 'SIGN_OUT__USER_REQUEST'
export const LOGOUT__USER_SUCCESS = 'SIGN_OUT__USER_SUCCESS'
export const LOGOUT__USER_ERROR = 'SIGN_OUT__USER_ERROR'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

export const registerUser = form => {
    return function (dispatch) {
        dispatch({
            type: POST_USER_REQUEST
        });
        registrationUserRequest(form)
            .then(checkResponse)
            .then(cookiesProcessing)
            .then(data => {
                dispatch({
                    type: POST_USER_SUCCESS,
                    data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: POST_USER_ERROR,
                    error
                });
            });
    };
}

export const signIn = form => {
    return function (dispatch) {
        dispatch({
            type: SIGN_USER_REQUEST
        });
        loginRequest(form)
            .then(checkResponse)
            .then(cookiesProcessing)
            .then(data => {
                dispatch({
                    type: SIGN_USER_SUCCESS,
                    data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: SIGN_USER_ERROR,
                    error
                });
            });
    };
}

export const getUser = () => {
    return async function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        await getUserInfo()
            .then(checkResponse)
            .then(data => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: GET_USER_ERROR,
                    error
                });
            });
    };
}

export const refreshInfo = form => {
    return function (dispatch) {
        dispatch({
            type: REFRESH_USER_REQUEST
        });
        patсhInfo(form)
            .then(checkResponse)
            .then(data => {
                dispatch({
                    type: REFRESH_USER_SUCCESS,
                    data
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: REFRESH_USER_ERROR,
                    error
                });
            });
    };
}

export const logOut = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT__USER_REQUEST
        });
        logoutRequest()
            .then(checkResponse)
            .then(() => {
                deleteCookie('token');
                deleteCookie('refreshToken');
                dispatch({
                    type: LOGOUT__USER_SUCCESS,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: LOGOUT__USER_ERROR,
                    error
                });
            });
    };
};

export const refreshToken = () => {
    return function (dispatch) {
        dispatch({
            type: REFRESH_COOKIES_REQUEST
        });
        refreshTokenRequest()
            .then(checkResponse)
            .then(cookiesProcessing)
            .then(data => {
                const {accessToken, refreshToken} = data
                dispatch({
                    type: REFRESH_COOKIES_SUCCESS,
                    accessToken,
                    refreshToken
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: REFRESH_COOKIES_ERROR
                });
            });
    }
}

export const postForgotPassword = (data) => {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPassword(data)
            .then(checkResponse)
            .then((data) => {
                console.log(data)
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                    error
                });
            });
    }
}

export const postResetPassword = (data) => {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPassword(data)
            .then(checkResponse)
            .then((data) => {
                console.log(data)
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                    error
                });
            });
    }
}





