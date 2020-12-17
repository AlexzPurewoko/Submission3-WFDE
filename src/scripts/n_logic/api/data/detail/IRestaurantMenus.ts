import { ISingleName } from "./ISingleName";

export interface IRestaurantMenus {
    readonly foods: ISingleName[],
    readonly drinks: ISingleName[]
}