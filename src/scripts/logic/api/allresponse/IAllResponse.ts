/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * This file is used to manage all 'AllResponse' data interfaces
 * Due to MVC Controller (application)
 */
import { IRestaurantDetailResponse } from "../data/detail/IRestaurantDetailResponse";
import { IRestaurantResponse } from "../data/lists/IRestaurantResponse";
import { IResultReview } from "../data/review/IResultReview";
import { ISearchResponse } from "../data/search/ISearchResponse";
import {ITestResponse} from "../data/test/ITestResponse";

/**
 * All types must be defined here to make BaseApi.ts understand
 * What the data should be managed? 
 */
export type ApiAllResponse = IRestaurantDetailResponse | IRestaurantResponse | IResultReview | ISearchResponse | ITestResponse;

interface ErrorStatus {
    status: number,
    message: string
}

export interface IAllResponse {

    /**
     * Returns true if is success without any exception occurs
     */
    readonly isSuccess: boolean;


    /**
     * Returns exception.
     */
    readonly error: ErrorStatus | any;

    /**
     * Returns the data that has been parsed
     * by its child class of BaseApi.ts.
     */
    readonly response: ApiAllResponse;
}