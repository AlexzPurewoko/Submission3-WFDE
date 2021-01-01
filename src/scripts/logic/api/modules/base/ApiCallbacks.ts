/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */

import { IAllResponse } from "../../allresponse/IAllResponse";

/**
 * @interface ApiCallbacks
 * 
 * This is callback interfaces
 * Which will used by BaseApi.ts to notify current progress of retrieving data from endpoint
 */
export default interface ApiCallbacks {

    /**
     * @function onFinished(@param data: @interface IAllResponse)
     * 
     * Called when BaseApi has finished loading
     * and parse JSON data to data objects
     * 
     * @param data the retrieved data
     */
    readonly onFinished: (data: IAllResponse) => void;

    /**
     * @function onLoad()
     * 
     * Called when BaseApi has starts the loading
     */
    readonly onLoad: () => void;
}