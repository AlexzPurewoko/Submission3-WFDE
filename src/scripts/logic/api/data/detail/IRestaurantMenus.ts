/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

import { ISingleName } from "./ISingleName";

export interface IRestaurantMenus {
    readonly foods: ISingleName[];
    readonly drinks: ISingleName[];
}