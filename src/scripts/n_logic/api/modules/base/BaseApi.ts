import { ApiAllResponse } from "../../allresponse/IAllResponse";
import ApiCallbacks from "./ApiCallbacks";


abstract class BaseApi {
    private _callbacks : ApiCallbacks = null;
    private _isRunning = false;

    protected abstract fetchPromise(): Promise<Response>

    protected abstract async serveData(jsonData: Record<string, unknown>) : Promise<ApiAllResponse>

    async startLoad(): Promise<void> {
        if(!this._callbacks) return;
        
        try {
            this._callbacks.onLoad();
            this._isRunning = true
            const response = await this.fetchPromise();
            const json = await response.json();
            const servedData = await this.serveData(json);

            this._callbacks?.onFinished({
                isSuccess: true,
                error: null,
                response: servedData
            });
        } catch(errorResponse: any) {
            this._callbacks?.onFinished({
                isSuccess: false,
                error: errorResponse,
                response: null
            });
        }
        this._isRunning = false;
    }

    get isRunning() : boolean {
        return this._isRunning;
    }

    set callbacks(newCallbacks: ApiCallbacks){
        this._callbacks = newCallbacks;
    }
}

export default BaseApi;