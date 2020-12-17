import { IRestaurantDetailResponse } from "../data/detail/IRestaurantDetailResponse";
import { IRestaurantResponse } from "../data/lists/IRestaurantResponse";
import { IResultReview } from "../data/review/IResultReview";
import { ISearchResponse } from "../data/search/ISearchResponse";

export type ApiAllResponse = IRestaurantDetailResponse | IRestaurantResponse | IResultReview | ISearchResponse;
export interface IAllResponse {
    readonly isSuccess: boolean,
    readonly error: any,
    readonly response: ApiAllResponse
}