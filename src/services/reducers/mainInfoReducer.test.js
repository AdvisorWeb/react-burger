import{mainInfoReducer} from './mainInfoReducer'
import {item, ingredient} from "../../__test__/data";
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    ADD_ITEMS_OTHER_COUNT,
    ADD_ITEMS_BUN_COUNT,
    REMOVE_ITEMS_COUNT,
    REFRESH_ITEMS_COUNT,
} from '../actions/constant'
import {addCountBun, addCountObj, addCountOther, refreshCount, removeCountOther} from "../../utils/consts";


describe('mainInfoReducer', ()=> {
    const id = 'id'
    const elements = addCountObj(ingredient)
    test('should return the initial state', () => {
        expect(
            mainInfoReducer(undefined, {}))
            .toEqual({
                items: null,
                itemsRequest: false,
                itemsFailed: false,
                isLoading: true
            })
    })
    test('should handle GET_ITEMS_REQUEST', () => {
        expect(
            mainInfoReducer([], {
                type: GET_ITEMS_REQUEST,
                text: 'Run the tests'
            }))
            .toEqual({
                itemsRequest: true
            })
    })
    test('should handle GET_ITEMS_SUCCESS', () => {
        expect(
            mainInfoReducer([], {
                type: GET_ITEMS_SUCCESS,
                text: 'Run the tests',
                data: ingredient
            }))
            .toEqual({
                itemsFailed: false,
                items: elements,
                itemsRequest: false,
                isLoading: false
            })
    })
    test('should handle ADD_ITEMS_BUN_COUNT', () => {
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: ADD_ITEMS_BUN_COUNT,
                text: 'Run the tests',
                card: item
            }))
            .toEqual({
                items: addCountBun(elements, item._id)
            })
    })
    test('should handle ADD_ITEMS_OTHER_COUNT', () => {
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: ADD_ITEMS_OTHER_COUNT,
                text: 'Run the tests',
                card: item
            }))
            .toEqual({
                items: addCountOther(elements, item._id)
            })
    })
    test('should handle REMOVE_ITEMS_COUNT', () => {
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: REMOVE_ITEMS_COUNT,
                text: 'Run the tests',
                id: id
            }))
            .toEqual( {
                items: removeCountOther(elements, id)
            })
    })
    test('should handle REFRESH_ITEMS_COUNT', () => {
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: REFRESH_ITEMS_COUNT,
                text: 'Run the tests',
                id: 'id'
            }))
            .toEqual({
                items: refreshCount(elements)
            })
    })
    test('should handle GET_ITEMS_FAILED', () => {
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: GET_ITEMS_FAILED,
                text: 'Run the tests',
            }))
            .toEqual({
                items: null,
                itemsFailed: false,
            })
    })
})