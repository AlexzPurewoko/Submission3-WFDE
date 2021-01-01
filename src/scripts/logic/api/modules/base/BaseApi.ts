/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro 
 */

import { ApiAllResponse } from "../../allresponse/IAllResponse";
import ApiCallbacks from "./ApiCallbacks";

/**
 * @abstract BaseApi
 * @classdesc
 * 
 * This is abstract class, which must implemented by other sub-classes
 * And manage the communication to endpoint 
 * 
 */
abstract class BaseApi {
    private _callbacks : ApiCallbacks = null;
    private _isRunning = false;

    /**
     * @function fetchPromise()
     * @description
     * 
     * Used by sub-classes to implement their own unique fetch configuration
     * And will called by @function startLoad() to load the data
     * 
     * @returns @instance Promise<Response>
     */
    protected abstract fetchPromise(): Promise<Response>

    /**
     * @function serveData()
     * @description
     * 
     * Used by sub-classes to serve their retrieved JSON Object data to data interface classes.
     * This implementation is dependent, and must be implemented correctly
     * 
     * @param jsonData the returned data from endpoint
     * @returns The promise of {@link ApiAllResponse} 
     */
    protected abstract serveData(jsonData: Record<string, unknown>) : Promise<ApiAllResponse>

    /**
     * @function startLoad()
     * @description
     * 
     * Used to start to fetch data from the endpoint. 
     * 
     * @returns 
     */
    async startLoad(): Promise<void> {
        if(!this._callbacks) return;
        
        try {
            this._callbacks.onLoad();
            this._isRunning = true
            const response = await this.fetchPromise();
            if(response.status != 200){
                await this.handleErrorIfStatusNot200(response);
            } else {
                const json = await response.json();
                const servedData = await this.serveData(json);

                this._callbacks?.onFinished({
                    isSuccess: true,
                    error: null,
                    response: servedData
                });
            }
            
        } catch(errorResponse: any) {
            this._callbacks?.onFinished({
                isSuccess: false,
                error: errorResponse,
                response: null
            });
        }
        this._isRunning = false;
    }

    /**
     * @ignore
     * @function handleErrorIfStatusNot200()
     * @description
     * 
     * Used as helper function {@link startLoad()} to handle error when response status is not 200
     * 
     * @param response fetched response from endpoint
     */
    private async handleErrorIfStatusNot200(response: Response){
        let err;
        try {
            err = await response.json();
        } catch(e){
            err = null;
        }
                
        err = err?.message || "undefined error";
        this._callbacks?.onFinished({
            isSuccess: false,
            error: {
                status: response.status,
                message: err
            },
            response: null
        });
    }

    /**
     * @property 
     * 
     * Used to get the current operation status
     * 
     * @returns true if operation done, otherwise false
     */
    get isRunning() : boolean {
        return this._isRunning;
    }

    /**
     * @property
     * 
     * Sets a callback to let other know the current asynchronous operation.
     * 
     */
    set callbacks(newCallbacks: ApiCallbacks){
        this._callbacks = newCallbacks;
    }
}

export default BaseApi;