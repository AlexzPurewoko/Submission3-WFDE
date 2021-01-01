/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

import { ICustomerReview } from "../detail/ICustomerReview";

export interface IResultReview{
    readonly error: boolean;
    readonly message: string;
    readonly customerReviews: ICustomerReview[];
}