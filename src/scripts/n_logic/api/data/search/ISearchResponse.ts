import { IRestaurantItem } from "../lists/IRestaurantItem";

export interface ISearchResponse {
    readonly error: boolean,
    readonly founded: number,
    readonly restaurants: IRestaurantItem[]
}