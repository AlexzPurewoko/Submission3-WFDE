/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * Callbacks 
 */

import { IPostReview } from "../../logic/api/data/review/IPostReview";

export interface AddReviewCallback {
    (dataContract: IPostReview): void
}