/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

import { IRestaurantItem } from "../lists/IRestaurantItem";

export interface ISearchResponse {
    readonly error: boolean;
    readonly founded: number;
    readonly restaurants: IRestaurantItem[];
}