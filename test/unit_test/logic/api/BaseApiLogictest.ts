import BaseApi from "../../../../src/scripts/logic/api/modules/base/BaseApi"
import {createMock} from "ts-auto-mock";
import { IAllResponse } from "../../../../src/scripts/logic/api/allresponse/IAllResponse";
import { ITestResponse } from "../../../../src/scripts/logic/api/data/test/ITestResponse";
import ApiCallbacks from "../../../../src/scripts/logic/api/modules/base/ApiCallbacks";

import "jasmine-ajax";
import {fetch as fetchPolyfill} from "whatwg-fetch";
import BaseApiImpl from "./helper/BaseApiImpl";


describe('BaseApi class logic test', () => {
    let baseApi: BaseApi;
    let callbacks: ApiCallbacks;
    let originalFetch: ((input: RequestInfo, init?: RequestInit) => Promise<Response>) & ((input: RequestInfo, init?: RequestInit) => Promise<Response>);

    
    beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = fetchPolyfill;
        jasmine.Ajax.install();

        baseApi = new BaseApiImpl();
        callbacks = createMock<ApiCallbacks>();
        spyOn(callbacks, 'onLoad');
        spyOn(callbacks, 'onFinished');

        baseApi.callbacks = callbacks;
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
        callbacks = null;
        window.fetch = originalFetch;
    });

    it('should match as expected if request established', async () => {

        jasmine.Ajax.stubRequest('/data/api').andReturn({
            status: 200,
            responseJSON: {
                "messages" : "Hello World"
            },
            contentType: "application/json"
        });

        await baseApi.startLoad();

        const expectedResponse: ITestResponse = {
            error: false,
            message: "",
            data: {
                messages: "Hello World"
            }
        }

        const IResponseAll: IAllResponse = {
            isSuccess: true,
            error: null,
            response: expectedResponse
        }

        // expect to be loaded in just first time 
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);

        // should match the requests
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(IResponseAll);
    });

    it('should return error when request failed (error)', async () => {
        jasmine.Ajax.stubRequest('/data/api').andError({
            status: 404
        });

        await baseApi.startLoad();

        const expectedFailTemplateResponse: IAllResponse = {
            isSuccess: false,
            error: new TypeError('Network request failed'),
            response: null
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(expectedFailTemplateResponse)
    })

    it('should return error when status is not 200', async () => {
        jasmine.Ajax.stubRequest('/data/api').andReturn({
            status: 400,
            contentType: 'application/json',
            responseJSON: {
                "error": true,
                "message": "not found",
                "restaurant": null
            }
        });

        await baseApi.startLoad();

        const failedExpectedResponse : IAllResponse = {
            isSuccess: false,
            response: null,
            error: {
                status: 400,
                message: 'not found'
            }
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(failedExpectedResponse);
    });

    it('should return error when status is not 200 even if no returned json from server', async () => {
        jasmine.Ajax.stubRequest('/data/api').andReturn({
            status: 400
        });

        await baseApi.startLoad();
        
        const failedExpectedResponse : IAllResponse = {
            isSuccess: false,
            response: null,
            error: {
                status: 400,
                message: 'undefined error'
            }
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(failedExpectedResponse);
    })
})