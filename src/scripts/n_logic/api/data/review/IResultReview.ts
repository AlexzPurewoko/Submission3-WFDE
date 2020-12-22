import { ICustomerReview } from "../detail/ICustomerReview";

export interface IResultReview{
    readonly error: boolean,
    readonly message: string,
    readonly customerReviews: ICustomerReview[]
}