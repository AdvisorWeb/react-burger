import{mainInfoReducer} from '../../services/reducers/mainInfoReducer'
import {item, ingredient} from "../data";
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    ADD_ITEMS_OTHER_COUNT,
    ADD_ITEMS_BUN_COUNT,
    REMOVE_ITEMS_COUNT,
    REFRESH_ITEMS_COUNT,
} from '../../services/actions/constant'


describe('mainInfoReducer', ()=> {
    const id = 'id'
    const elements = ingredient.map(item => {
        return {...item, count: 0}
    })
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

        const elementsResult = elements.map(el => {
            if(el._id === item._id){
                return {...el, count: 2}
            }
            return el
        })
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: ADD_ITEMS_BUN_COUNT,
                text: 'Run the tests',
                card: item
            }))
            .toEqual({
                items: elementsResult
            })
    })
    test('should handle ADD_ITEMS_OTHER_COUNT', () => {
        const elementsResult = elements.map(el => {
            if(el._id === item._id){
                return {...el, count: el.count + 1}
            }
            return el
        })
        expect(
            mainInfoReducer({
                items: elements,
            }, {
                type: ADD_ITEMS_OTHER_COUNT,
                text: 'Run the tests',
                card: item
            }))
            .toEqual({
                items: elementsResult
            })
    })
    test('should handle REMOVE_ITEMS_COUNT', () => {
        const elementsCount = elements.map(el => {
            if(el._id === id){
                return {...el, count: 3}
            }
            return el
        })
        const elementsResult = elementsCount.map(item => {
            if (item._id === id) {
                return {...item, count: item.count - 1}
            }
            return item
        })
        expect(
            mainInfoReducer({
                items: elementsCount,
            }, {
                type: REMOVE_ITEMS_COUNT,
                text: 'Run the tests',
                id: id
            }))
            .toEqual( {
                items: elementsResult
            })
    })
    test('should handle REFRESH_ITEMS_COUNT', () => {
        expect(
            mainInfoReducer({
                items: ingredient,
            }, {
                type: REFRESH_ITEMS_COUNT,
                text: 'Run the tests',
                id: 'id'
            }))
            .toEqual({
                items: ingredient.map(item => {
                    return {...item, count: 0}
                })
            })
    })
    test('should handle GET_ITEMS_FAILED', () => {
        expect(
            mainInfoReducer({
                items: ingredient,
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