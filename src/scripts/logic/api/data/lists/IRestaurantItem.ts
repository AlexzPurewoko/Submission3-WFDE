/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

export interface IRestaurantItem {
    readonly id: string;
    readonly name: string;
    readonly rating: number;
    readonly pictureId: string;
    readonly city: string;
    readonly description: string;

    /**
     * This data is not covered by JSON
     * But, its implemented by another class to serve preferred image URL
     */
    pictureLocation?: string;
}