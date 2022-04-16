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
        answer: {
            total: string,
            orders: Array<TItem>
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
    key: number
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