import {authReducer} from './authReducer'

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
} from '../actions/constant'

describe('authReducer', () => {
    const payload = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        user: {
            email: 'email',
            name: 'name'
        }
    }
    const requestAnswer = {
        'auth': {
            'error': false,
            'request': true,
        }
    }
    const errorAnswer = {
        "auth": {
            'error': true,
            'request': false,
        },
    }
    test('should return the initial state', () => {
        expect(
            authReducer(undefined, {}))
            .toEqual({
                "authorization": false,
                "authorizationCheck": false,
                "cookies": false,
                'auth': {
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
            })
    })

    test('should handle SIGN_USER_REQUEST', () => {
        expect(
            authReducer([], {
                type: SIGN_USER_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual(requestAnswer)
    })
    test('should handle POST_USER_REQUEST', () => {
        expect(
            authReducer([], {
                type: POST_USER_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual(requestAnswer)
    })
    test('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer([], {
                type: GET_USER_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual(requestAnswer)
    })
    test('should handle REFRESH_USER_REQUEST', () => {
        expect(
            authReducer([], {
                type: REFRESH_USER_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual(requestAnswer)
    })
    test('should handle LOGOUT__USER_REQUEST', () => {
        expect(
            authReducer([], {
                type: LOGOUT__USER_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual(requestAnswer)
    })
    test('should handle REFRESH_COOKIES_REQUEST', () => {
        expect(
            authReducer([], {
                type: REFRESH_COOKIES_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual({
                "auth": {
                    "request": true,
                },
                "authorization": false,
                "authorizationCheck": false,
                "cookies": false,
            })
    })
    test('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer([], {
                type: FORGOT_PASSWORD_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual({
                "auth": {
                    "request": true,
                    "sendingEmail": false,
                },
            })
    })
    test('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer([], {
                type: RESET_PASSWORD_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual({
                "auth": {
                    "request": true,
                    "sendingEmail": true,
                },
            })
    })

    test('should handle SIGN_USER_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: SIGN_USER_SUCCESS,
                    text: 'Run the tests',
                    data: payload
                }))
            .toEqual({
                "auth":
                    {
                       ...payload,
                        "error": false,
                        "request": false,
                    },
                "authorization": true
            })
    })
    test('should handle POST_USER_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: POST_USER_SUCCESS,
                    text: 'Run the tests',
                    payload
                }))
            .toEqual({
                "auth": {
                   ...payload,
                    "request": false,
                },
                "authorization": true,
            })
    })
    test('should handle GET_USER_SUCCESS', () => {
        const data = {
            user: {
                email: 'email',
                name: 'name'
            }
        }
        expect(
            authReducer([]
                , {
                    type: GET_USER_SUCCESS,
                    text: 'Run the tests',
                    data
                }))
            .toEqual({
                "auth":
                    {
                        "request": false,
                        "user": {
                            "email": "email",
                            "name": "name"
                        }
                    }
            })
    })
    test('should handle REFRESH_USER_SUCCESS', () => {
        const data = {
            user: {
                email: 'email',
                name: 'name'
            }
        }
        expect(
            authReducer([]
                , {
                    type: REFRESH_USER_SUCCESS,
                    text: 'Run the tests',
                    data
                }))
            .toEqual({
                "auth": {
                    "error": false,
                    "errorMessage": "",
                    "request": false,
                    "user": {
                        "email": "email",
                        "name": "name"
                    }
                }
            })
    })
    test('should handle LOGOUT__USER_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: LOGOUT__USER_SUCCESS,
                    text: 'Run the tests',
                }))
            .toEqual({
                    "auth": {
                        "accessToken": null,
                        "error": false,
                        "refreshToken": null,
                        "request": false,
                        "sendingEmail": false,
                        "user": {"email": "", "name": ""}
                    },
                    "authorization": false
                }
            )
    })
    test('should handle REFRESH_COOKIES_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: REFRESH_COOKIES_SUCCESS,
                    text: 'Run the tests',
                    accessToken : 'accessToken',
                    refreshToken: 'refreshToken',
                }))
            .toEqual( {
                "auth": {
                    "accessToken": "accessToken",
                    "refreshToken": "refreshToken",
                    "request": false
                },
                "authorization": true,
                "authorizationCheck": true,
                "cookies": true
            })
    })
    test('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: FORGOT_PASSWORD_SUCCESS,
                    text: 'Run the tests',
                }))
            .toEqual( {
                "auth": {
                    request: false,
                    sendingEmail: true
                },
            })
    })
    test('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer([]
                , {
                    type: RESET_PASSWORD_SUCCESS,
                    text: 'Run the tests',
                }))
            .toEqual( {
                "auth": {
                    request: false,
                    sendingEmail: false
                },
            })
    })

    test('should handle POST_USER_ERROR', () => {
        expect(
            authReducer([]
                , {
                    type: POST_USER_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual(errorAnswer)
    })
    test('should handle SIGN_USER_ERROR', () => {
        expect(
            authReducer([]
                , {
                    type: SIGN_USER_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual(errorAnswer)
    })
    test('should handle GET_USER_ERROR', () => {
        expect(
            authReducer([]
                , {
                    type: GET_USER_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual({
                "authorization": false,
                ...errorAnswer,
            })
    })
    test('should handle REFRESH_USER_ERROR', () => {
        expect(
            authReducer([]
                , {
                    type: REFRESH_USER_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual( errorAnswer)
    })
    test('should handle LOGOUT__USER_ERROR', () => {

        expect(
            authReducer([]
                , {
                    type: LOGOUT__USER_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual(errorAnswer)
    })
    test('should handle REFRESH_COOKIES_ERROR', () => {

        expect(
            authReducer([]
                , {
                    type: REFRESH_COOKIES_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual({"auth": {"request": false}, "authorizationCheck": true, "cookies": false})
    })
    test('should handle FORGOT_PASSWORD_ERROR', () => {

        expect(
            authReducer([]
                , {
                    type: FORGOT_PASSWORD_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual({"auth": {"error": true, "request": false, "sendingEmail": false}})
    })
    test('should handle RESET_PASSWORD_ERROR', () => {

        expect(
            authReducer([]
                , {
                    type: RESET_PASSWORD_ERROR,
                    text: 'Run the tests',
                }))
            .toEqual({"auth": {"error": true, "request": false, "sendingEmail": true}})
    })
})
