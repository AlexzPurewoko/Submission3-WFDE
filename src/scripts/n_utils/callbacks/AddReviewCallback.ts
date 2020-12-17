import { IPostReview } from "../../n_logic/api/data/review/IPostReview";

export interface AddReviewCallback {
    (dataContract: IPostReview): void
}