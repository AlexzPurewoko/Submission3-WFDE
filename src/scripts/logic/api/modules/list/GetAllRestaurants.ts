/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro 
 */

import { ApiAllResponse } from "../../allresponse/IAllResponse";
import { IRestaurantItem } from "../../data/lists/IRestaurantItem";
import { IRestaurantResponse } from "../../data/lists/IRestaurantResponse";
import { endpoint } from "../../endpoint/endpoint";
import { ImageSize } from "../../endpoint/ImageSize";
import BaseApi from "../base/BaseApi";

/**
 * @class
 * @description
 * 
 * Implements {@link BaseApi} class to get the list of restaurant from endpoint. 
 * And return {@link IRestaurantResponse} data objects on property {@see IAllResponse.response}.
 * 
 */
class GetAllRestaurants extends BaseApi {

    protected fetchPromise(): Promise<Response> {
        return fetch(endpoint.list());
    }

    protected serveData(jsonData: Record<string, unknown>): Promise<ApiAllResponse> {
        const composed : IRestaurantResponse = <IRestaurantResponse> <unknown> jsonData;
        composed.restaurants.forEach((i: IRestaurantItem) => {
            i.pictureLocation = endpoint.image(ImageSize.SMALL, i.pictureId);
        })
        return new Promise((resolve) => resolve(composed))
    }

}

export default GetAllRestaurants;