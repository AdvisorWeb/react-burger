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
import {AppDispatch, AppThunk} from '../types';
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
    REFRESH_USER_REQUEST,
    REFRESH_USER_SUCCESS,
    REFRESH_USER_ERROR,
    REFRESH_COOKIES_REQUEST,
    REFRESH_COOKIES_SUCCESS,
    REFRESH_COOKIES_ERROR,
    LOGOUT__USER_REQUEST,
    LOGOUT__USER_SUCCESS,
    LOGOUT__USER_ERROR,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
} from './constant'
import {TDataAccess} from "../../utils/tsTypes";


//LOGOUT
export interface ILogoutUserRequestAction {
    readonly type: typeof LOGOUT__USER_REQUEST;
}
export const logoutUserRequest = (): ILogoutUserRequestAction => ({
    type: LOGOUT__USER_REQUEST
});
export interface ILogoutUserSuccessAction {
    readonly type: typeof LOGOUT__USER_SUCCESS;
}
export const logoutUserSuccess = (): ILogoutUserSuccessAction => ({
    type: LOGOUT__USER_SUCCESS
});
export interface ILogoutUserErrorAction {
    readonly type: typeof LOGOUT__USER_ERROR;
    readonly error: Error
}
export const logoutUserError = (error: Error): ILogoutUserErrorAction => ({
    type: LOGOUT__USER_ERROR,
    error
});

//REGISTRATION
export type TForm = {
    email: string
    name: string
    password: string
}
export interface IPostUserRequestAction {
    readonly type: typeof POST_USER_REQUEST;
}
export const postUserRequest = (): IPostUserRequestAction => ({
    type: POST_USER_REQUEST
});
export interface IPostUserSuccessAction {
    readonly type: "POST_USER_SUCCESS"
    readonly data: TDataAccess;
}
export const postUserSuccess = (data: TDataAccess): IPostUserSuccessAction => ({
    type: POST_USER_SUCCESS,
    data
});
export interface IPostUserErrorAction {
    readonly type: typeof POST_USER_ERROR;
    readonly error: Error
}
export const postUserError = (error: Error): IPostUserErrorAction => ({
    type: POST_USER_ERROR,
    error
});

//SIGN_IN
export interface ISignInUserRequestAction {
    readonly type: typeof SIGN_USER_REQUEST;
}
export const signInUserRequest = (): ISignInUserRequestAction => ({
    type: SIGN_USER_REQUEST
});
export interface ISignInUserSuccessAction {
    readonly type: typeof SIGN_USER_SUCCESS
    readonly data: TDataAccess;
}
export const signInUserSuccess = (data: TDataAccess): ISignInUserSuccessAction => ({
    type: SIGN_USER_SUCCESS,
    data
});
export interface ISignInUserErrorAction {
    readonly type: typeof SIGN_USER_ERROR;
    readonly error: Error
}
export const signInUserError = (error: Error): ISignInUserErrorAction => ({
    type: SIGN_USER_ERROR,
    error
});

//GET_USER
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export const getUserRequest = (): IGetUserRequestAction => ({
    type: GET_USER_REQUEST
});
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS
    readonly data: TDataAccess;
}
export const getUserSuccess = (data: TDataAccess): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    data
});
export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
    readonly error: Error
}
export const getUserError = (error: Error): IGetUserErrorAction => ({
    type: GET_USER_ERROR,
    error
});

//REFRESH_USER
export interface IRefreshUserRequestAction {
    readonly type: typeof REFRESH_USER_REQUEST;
}
export const refreshUserRequest = (): IRefreshUserRequestAction => ({
    type: REFRESH_USER_REQUEST
});
export interface IRefreshUserSuccessAction {
    readonly type: typeof REFRESH_USER_SUCCESS
    readonly data: TDataAccess;
}
export const refreshUserSuccess = (data: TDataAccess): IRefreshUserSuccessAction => ({
    type: REFRESH_USER_SUCCESS,
    data
});
export interface IRefreshUserErrorAction {
    readonly type: typeof REFRESH_USER_ERROR;
    readonly error: Error
}
export const refreshUserError = (error: Error): IRefreshUserErrorAction => ({
    type: REFRESH_USER_ERROR,
    error
});

//REFRESH_COOKIES
export interface IRefreshCookiesRequestAction {
    readonly type: typeof REFRESH_COOKIES_REQUEST;
}
export const refreshCookiesRequest = (): IRefreshCookiesRequestAction => ({
    type: REFRESH_COOKIES_REQUEST
});
export interface IRefreshCookiesSuccessAction {
    readonly type: typeof REFRESH_COOKIES_SUCCESS
    readonly accessToken: string
    readonly refreshToken: string
}
export const refreshCookiesSuccess = (accessToken: string, refreshToken: string): IRefreshCookiesSuccessAction => ({
    type: REFRESH_COOKIES_SUCCESS,
    accessToken,
    refreshToken,
});
export interface IRefreshCookiesErrorAction {
    readonly type: typeof REFRESH_COOKIES_ERROR;
    readonly error: Error
}
export const refreshCookiesError = (error: Error): IRefreshCookiesErrorAction => ({
    type: REFRESH_COOKIES_ERROR,
    error
});

//FORGOT_PASSWORD
export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export const forgotPasswordRequest = (): IForgotPasswordRequestAction => ({
    type: FORGOT_PASSWORD_REQUEST
});
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}
export const forgotPasswordSuccess = (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS,
});
export interface IForgotPasswordErrorAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
    readonly error: Error
}
export const forgotPasswordError = (error: Error): IForgotPasswordErrorAction => ({
    type: FORGOT_PASSWORD_ERROR,
    error
});

//RESET_PASSWORD
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export const resetPasswordRequest = (): IResetPasswordRequestAction => ({
    type: RESET_PASSWORD_REQUEST
});
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}
export const resetPasswordSuccess = (): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
});
export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
    readonly error: Error
}
export const resetPasswordError = (error: Error): IResetPasswordErrorAction => ({
    type: RESET_PASSWORD_ERROR,
    error
});


export type TAuthActions =
    | ILogoutUserRequestAction
    | ILogoutUserSuccessAction
    | ILogoutUserErrorAction
    | IPostUserRequestAction
    | IPostUserSuccessAction
    | IPostUserErrorAction
    | ISignInUserRequestAction
    | ISignInUserSuccessAction
    | ISignInUserErrorAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IRefreshUserRequestAction
    | IRefreshUserSuccessAction
    | IRefreshUserErrorAction
    | IRefreshCookiesRequestAction
    | IRefreshCookiesSuccessAction
    | IRefreshCookiesErrorAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction
    ;


export const registerUser: AppThunk = (form: TForm) => {
    return function (dispatch: AppDispatch) {
        dispatch(postUserRequest());
        registrationUserRequest(form)
            .then(checkResponse)
            .then(cookiesProcessing)
            .then((data) => {
                dispatch(postUserSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(postUserError(error));
            });
    };
}

export const signIn: AppThunk = (form: TForm) => {
    return function (dispatch: AppDispatch) {
        dispatch(signInUserRequest());
        loginRequest(form)
            .then(checkResponse)
            .then(cookiesProcessing)
            .then(data => {
                dispatch(signInUserSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(signInUserError(error));
            });
    };
}

export const getUser: AppThunk = () => {
    return async function (dispatch: AppDispatch) {
        dispatch(getUserRequest());
        await getUserInfo()
            .then(checkResponse)
            .then(data => {
                dispatch(getUserSuccess(data));
            })
            .catch(error => {
                if (error === 'Ошибка 403') {
                    dispatch(refreshToken())
                }
                dispatch(getUserError(error));
            });
    };
}

export const refreshInfo: AppThunk | any = (form: TForm) => {
    return function (dispatch: AppDispatch) {
        dispatch(refreshUserRequest());
        patсhInfo(form)
            .then(checkResponse)
            .then(data => {
                dispatch(refreshUserSuccess(data));
            })
            .catch(error => {
                if (error === 'Ошибка 403') {
                    dispatch(refreshToken(form))
                }
                dispatch(refreshUserError(error));
            });
    };
}

export const logOut: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch(logoutUserRequest());
        logoutRequest()
            .then(checkResponse)
            .then(() => {
                deleteCookie('token');
                deleteCookie('refreshToken');
                dispatch(logoutUserSuccess());
            })
            .catch(error => {
                console.log(error)
                dispatch(logoutUserError(error));
            });
    };
};

// export const refreshToken: AppThunk = (form: (TForm | null) = null) => {
export const refreshToken: AppThunk | any = (form: (TForm | null) = null) => {
    console.log('refreshToken')
    return function (dispatch: AppDispatch) {
        dispatch(refreshCookiesRequest());
        refreshTokenRequest()
            .then(checkResponse)
            .then(cookiesProcessing)
            .then(data => {
                const {accessToken, refreshToken} = data
                dispatch(refreshCookiesSuccess(accessToken, refreshToken));
            })
            .then(() => {
                form && dispatch(refreshInfo(form))
            })
            .catch(error => {
                console.log(error)
                dispatch(refreshCookiesError(error))
            });
    }
}

export const postForgotPassword: AppThunk = (data: any) => {
    return function (dispatch: AppDispatch) {
        dispatch(forgotPasswordRequest());
        forgotPassword(data)
            .then(checkResponse)
            .then((data) => {
                console.log(data)
                dispatch(forgotPasswordSuccess());
            })
            .catch(error => {
                console.log(error)
                dispatch(forgotPasswordError(error));
            });
    }
}

export const postResetPassword: AppThunk = (data: any) => {
    return function (dispatch: AppDispatch) {
        dispatch(resetPasswordRequest());
        resetPassword(data)
            .then(checkResponse)
            .then((data) => {
                console.log(data)
                dispatch(resetPasswordSuccess());
            })
            .catch(error => {
                console.log(error)
                dispatch(resetPasswordError(error));
            });
    }
}





