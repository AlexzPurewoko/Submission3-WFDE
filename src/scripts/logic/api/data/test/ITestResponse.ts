/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * JSON Parsed data objects
 */

export interface ITestResponse {
    readonly error: boolean;
    readonly message: string;
    readonly data: any;
}