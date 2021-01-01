/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

import { ICustomerReview } from "./ICustomerReview";
import { IRestaurantMenus } from "./IRestaurantMenus";
import { ISingleName } from "./ISingleName";

export interface IDetailRestaurantItem {
    readonly id: string;
    readonly name: string;
    readonly rating: number;
    readonly pictureId: string;
    readonly address: string;
    readonly city: string;
    readonly description: string;
    readonly categories: ISingleName[];
    readonly menus: IRestaurantMenus;
    readonly customerReviews: ICustomerReview[];
    
    /**
     * This data is not covered by JSON
     * But, its implemented by another class to serve preferred image URL
     */
    pictureLocation?: string;
}