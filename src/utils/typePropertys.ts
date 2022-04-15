export interface IStore {
    constructorItems: {
        bun: TItem[],
        other: TItem[],
    },
    info: {
        isLoading: boolean,
        itemsFailed: boolean,
    },
    modal : {
        selectedObject: TItem
    }
}

export type TItem = {
    _id: number
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
