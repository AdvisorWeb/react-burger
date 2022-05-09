import {TWsState} from "../services/reducers/wsReducer";

export interface IStore {
    info: {
        items: Array<TItem>
        isLoading: boolean
        itemsFailed: boolean
    }
    constructorItems: {
        bun: TItem[],
        other: TItem[],
    },
    order : {
        isLoading: boolean
        orderFailed: boolean
        data: {
            order: {
                number: number
            }
        }
    }
    authState : {
        authorization: boolean
        authorizationCheck: boolean
        cookies: boolean
        auth: {
            request :boolean
            error :boolean
            errorMessage: string
            accessToken: string
            refreshToken: string
            sendingEmail: boolean
            user: {
                email: string
                name: string
            }
        }
    }
    ws: TWsState
}

export type TItem = {
    _id: string
    name: string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
    count: number
    index?: number
    key: string
    countTemp?: number
}

export type TInputState<s> = {
    email: s
    name: s,
    password: s
}

export type TDataAccess = {
    accessToken: string
    refreshToken: string
    success: boolean
    user : {
        email:string
        name: string
    }
}