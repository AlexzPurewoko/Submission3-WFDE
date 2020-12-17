import { IRestaurantItem } from "./IRestaurantItem";

export interface IRestaurantResponse {
    readonly error: boolean,
    readonly message: string,
    readonly count: number,
    readonly restaurants: IRestaurantItem[]
} 