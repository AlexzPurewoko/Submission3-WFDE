/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro 
 */

import { ApiAllResponse } from "../../allresponse/IAllResponse";
import { IPostReview } from "../../data/review/IPostReview";
import { IResultReview } from "../../data/review/IResultReview";
import { UConfig } from "../../endpoint/BaseConfig";
import { endpoint } from "../../endpoint/endpoint";
import BaseApi from "../base/BaseApi";

/**
 * @class
 * @description
 * 
 * Implements {@link BaseApi} class to post the review restaurant data to endpoint. 
 * And return {@link IResultReview} data objects on property {@see IAllResponse.response}.
 * 
 */
class PostReview extends BaseApi {

    private readonly _reviewData: IPostReview;
    constructor(reviewData: IPostReview){
        super();
        this._reviewData = reviewData;
    }

    protected fetchPromise(): Promise<Response> {
        const rawStringObjects = JSON.stringify(this._reviewData);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-Auth-Token", UConfig.authToken);

        const reqOptions : RequestInit = {
            method: "POST",
            headers: headers,
            body: rawStringObjects,
            redirect: "follow"
        }
        return fetch(endpoint.postReview(), reqOptions);
    }
    protected serveData(jsonData: Record<string, unknown>): Promise<ApiAllResponse> {
        const composed : IResultReview = <IResultReview> <unknown> jsonData;
        return new Promise((resolve) => resolve(composed));
    }

}

export default PostReview;