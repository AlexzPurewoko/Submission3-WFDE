import { IConsumerReview } from "../detail/IConsumerReview";

export interface IResultReview{
    readonly error: boolean,
    readonly message: string,
    readonly customerReviews: IConsumerReview[]
}