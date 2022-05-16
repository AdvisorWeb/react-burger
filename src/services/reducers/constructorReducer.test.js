import {itemsConstructor} from './constructorReducer'

import {
    ADD_ITEM_BUN,
    ADD_ITEM_OTHER,
    REMOVE_ITEM,
    MOVE_ITEM,
    REFRESH_ITEMS,
} from '../actions/constant'

import {item} from "../../__test__/data";

describe('itemsConstructor', () => {

    const defaultItems = [item, item, item, item]

    test('should return the initial state', () => {
        expect(
            itemsConstructor(undefined, {}))
            .toEqual({
                'bun': [],
                'other': [],
            })
    })

    test('should handle ADD_ITEM_BUN', () => {
        expect(itemsConstructor({
                'bun': [],
            }, {
                type: ADD_ITEM_BUN,
                text: 'Run the tests',
                payload: {...item, key: 'key', count: 2}
            })
        ).toEqual({
            'bun': [
                {
                    ...item,
                    key: 'key'
                }
            ],
        })
    })

    test('should handle ADD_ITEM_OTHER', () => {
        expect(
            itemsConstructor({
                'other': defaultItems,
            }, {
                type: ADD_ITEM_OTHER,
                text: 'Run the tests',
                payload: {...item, key: 'key'}
            })
        ).toEqual({
            'other': [
                ...defaultItems,
                {...item, key: 'key'}
            ],
        })
    })

    test('should handle REMOVE_ITEM', () => {
        expect(
            itemsConstructor({
                'other': [
                    defaultItems
                ],
            }, {
                type: REMOVE_ITEM,
                text: 'Run the tests',
               payload: { key: 'key'}
            })
        ).toEqual({
            'other': [
                defaultItems
            ],
        })
    })

    test('should handle MOVE_ITEM', () => {
        expect(
            itemsConstructor({
                other: defaultItems
            }, {
                type: MOVE_ITEM,
                text: 'Run the tests',
                payload: {
                    hoverIndex: 0,
                    dragIndex: 1
                }
            })
        ).toEqual({
            'other': defaultItems
        })
    })

    test('should handle REFRESH_ITEMS', () => {
        expect(
            itemsConstructor({
                'bun': [
                    defaultItems
                ],
                'other': [
                    defaultItems
                ],
            }, {
                type: REFRESH_ITEMS,
                text: 'Run the tests'
            })
        ).toEqual({
            'bun': [],
            'other': [],
        })
    })
})