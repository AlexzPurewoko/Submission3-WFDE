import { ApiAllResponse } from "../../allresponse/IAllResponse";
import { IRestaurantItem } from "../../data/lists/IRestaurantItem";
import { ISearchResponse } from "../../data/search/ISearchResponse";
import { endpoint } from "../../endpoint/endpoint";
import { ImageSize } from "../../endpoint/ImageSize";
import BaseApi from "../base/BaseApi";

class RequestSearch extends BaseApi {
    private _query = "";

    constructor(query: string) {
        super();
        this._query = query;
    }
    protected fetchPromise(): Promise<Response> {
        return fetch(endpoint.search(this._query));
    }
    protected serveData(jsonData: Record<string, unknown>): Promise<ApiAllResponse> {
        const composed: ISearchResponse = <ISearchResponse> <unknown> jsonData;
        composed.restaurants.forEach((i: IRestaurantItem) => {
            i.pictureLocation = endpoint.image(ImageSize.SMALL, i.pictureId);
        })
        return new Promise((resolve) => resolve(composed));
    }

}

export default RequestSearch;