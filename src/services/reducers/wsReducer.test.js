import {wsReducer} from './wsReducer'

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE, WS_CONNECTION_START,
} from '../actions/constant';


describe('wsReducer', ()=> {
    const defaultState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        personal: null,
        isLoaded: false
    }
    const payload = {
        total: 100,
        totalToday: 10000,
        orders: [
            {
                _id:"627ebe25fa747e001bd47e04",
                status:"done",
                ingredients: ['ingredients', 'ingredients', "ingredients"],
                name:"Spicy space краторный бургер",
                createdAt:"2022-05-13T20:23:01.858Z",
                updatedAt:"2022-05-13T20:23:02.120Z",
                number:15372,
            }
        ]
    }
    test('should return the initial state', () => {
        expect(
            wsReducer(undefined, {}))
            .toEqual(defaultState)
    })
    test('should handle WS_CONNECTION_START', () => {
        expect(
            wsReducer(defaultState, {
                type: WS_CONNECTION_START,
                text: 'Run the tests',
                payload: 'url',
                personal: true
            }))
            .toEqual( {
                ...defaultState,
                "personal": true,
            })
    })
    test('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(defaultState, {
                type: WS_CONNECTION_SUCCESS,
                text: 'Run the tests',
            }))
            .toEqual( {
                ...defaultState,
                wsConnected: true,
            })
    })
    test('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer(defaultState, {
                type: WS_CONNECTION_ERROR,
                text: 'Run the tests',
            }))
            .toEqual( {
                ...defaultState,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
                isLoaded: false
            })
    })

    test('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(defaultState, {
                type: WS_CONNECTION_CLOSED,
                text: 'Run the tests',
            }))
            .toEqual( {
                ...defaultState,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
                isLoaded: false
            })
    })

    test('should handle WS_GET_MESSAGE', () => {

        expect(
            wsReducer(defaultState, {
                type: WS_GET_MESSAGE,
                text: 'Run the tests',
                payload
            }))
            .toEqual( {
                ...defaultState,
                ...payload,
                wsConnected: true,
                isLoaded: true
            })
    })
})