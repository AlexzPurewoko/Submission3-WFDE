/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

import { IDetailRestaurantItem } from "./IDetailRestaurantItem";

export interface IRestaurantDetailResponse {
    readonly error: boolean;
    readonly message: string;
    readonly restaurant: IDetailRestaurantItem;
}