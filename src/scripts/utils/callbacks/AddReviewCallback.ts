import { IPostReview } from "../../logic/api/data/review/IPostReview";

export interface AddReviewCallback {
    (dataContract: IPostReview): void
}