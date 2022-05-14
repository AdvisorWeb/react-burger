import {orderReducer} from '../../services/reducers/orderReducer'

import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../../services/actions/constant'

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(
            orderReducer(undefined, {}))
            .toEqual( {
                data: null,
                orderRequest: false,
                orderFailed: false,
                isLoading: true,
            })
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            orderReducer([], {
                type: GET_ORDER_REQUEST,
                text: 'Run the tests'
            })
        ).toEqual( {"isLoading": true, "orderRequest": true})
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer([], {
                type: GET_ORDER_SUCCESS,
                text: 'Run the tests'
            })
        ).toEqual( {
            "orderRequest": false,
            "orderFailed": false,
            "isLoading": false,
            "data": undefined,
        })
    })
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer([], {
                type: GET_ORDER_FAILED,
                text: 'Run the tests'
            })
        ).toEqual( {
            "orderRequest": false,
            "orderFailed": true,
            "isLoading": false,
        })
    })
})