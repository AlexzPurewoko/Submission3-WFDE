import { IRestaurantDetailResponse } from "../data/detail/IRestaurantDetailResponse";
import { IRestaurantResponse } from "../data/lists/IRestaurantResponse";
import { IResultReview } from "../data/review/IResultReview";
import { ISearchResponse } from "../data/search/ISearchResponse";
import {ITestResponse} from "../data/test/ITestResponse";

export type ApiAllResponse = IRestaurantDetailResponse | IRestaurantResponse | IResultReview | ISearchResponse | ITestResponse;

interface ErrorStatus {
    status: number,
    message: string
}

export interface IAllResponse {
    readonly isSuccess: boolean,
    readonly error: ErrorStatus | any,
    readonly response: ApiAllResponse
}