import { IDetailRestaurantItem } from "./IDetailRestaurantItem";

export interface IRestaurantDetailResponse {
    readonly error: boolean,
    readonly message: string,
    readonly restaurant: IDetailRestaurantItem
}