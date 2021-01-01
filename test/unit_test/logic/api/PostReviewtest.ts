import { createMock } from "ts-auto-mock";
import ApiCallbacks from "../../../../src/scripts/logic/api/modules/base/ApiCallbacks";

import "jasmine-ajax";
import {fetch as fetchPolyfill} from "whatwg-fetch";
import { endpoint } from "../../../../src/scripts/logic/api/endpoint/endpoint";
import { IAllResponse } from "../../../../src/scripts/logic/api/allresponse/IAllResponse";
import PostReview from "../../../../src/scripts/logic/api/modules/reviewResult/PostReview";
import { IPostReview } from "../../../../src/scripts/logic/api/data/review/IPostReview";
import { ResultReview } from "./data/result_review";

describe("PostReview class logic test", () => {

    let originalFetch: ((input: RequestInfo, init?: RequestInit) => Promise<Response>) & ((input: RequestInfo, init?: RequestInit) => Promise<Response>) ;
    let postReview : PostReview;
    const id: string = "rqdv5juczeskfw1e867";
    let callbacks: ApiCallbacks;

    const reviewData: IPostReview = {
        id: '1',
        name: 'tutul',
        review: 'makanannya delicious!'
    }
    
    beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = fetchPolyfill;
        jasmine.Ajax.install();

        postReview = new PostReview(reviewData);
        callbacks = createMock<ApiCallbacks>();
        spyOn(callbacks, 'onFinished');
        spyOn(callbacks, 'onLoad');
        
        postReview.callbacks = callbacks;
    })

    afterEach(() => {
        jasmine.Ajax.uninstall();
        callbacks = null;  
        window.fetch = originalFetch;
    });

    it('should return list customerReviews if success adding data', async () => {

        jasmine.Ajax.stubRequest(endpoint.postReview()).andReturn({
            status: 200,
            contentType: 'application/json',
            responseJSON: ResultReview
        });

        await postReview.startLoad();
        
        const successExpectedRespose: IAllResponse = {
            isSuccess: true,
            error: null,
            response: ResultReview
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(successExpectedRespose);
    });
});