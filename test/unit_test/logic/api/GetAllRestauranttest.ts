import { createMock } from "ts-auto-mock";
import ApiCallbacks from "../../../../src/scripts/logic/api/modules/base/ApiCallbacks";
import GetAllRestaurants from "../../../../src/scripts/logic/api/modules/list/GetAllRestaurants";

import "jasmine-ajax";
import {fetch as fetchPolyfill} from "whatwg-fetch";
import { endpoint } from "../../../../src/scripts/logic/api/endpoint/endpoint";
import { ListResto } from "./data/list_resto";
import { IRestaurantResponse } from "../../../../src/scripts/logic/api/data/lists/IRestaurantResponse";
import { IAllResponse } from "../../../../src/scripts/logic/api/allresponse/IAllResponse";
import { IRestaurantItem } from "../../../../src/scripts/logic/api/data/lists/IRestaurantItem";
import { ImageSize } from "../../../../src/scripts/logic/api/endpoint/ImageSize";

describe("GetRestaurantDetail class logic test", () => {

    let originalFetch: ((input: RequestInfo, init?: RequestInit) => Promise<Response>) & ((input: RequestInfo, init?: RequestInit) => Promise<Response>) ;
    let restaurantsApi : GetAllRestaurants;
    const id: string = "rqdv5juczeskfw1e867";
    let callbacks: ApiCallbacks;
    
    beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = fetchPolyfill;
        jasmine.Ajax.install();

        restaurantsApi = new GetAllRestaurants();
        callbacks = createMock<ApiCallbacks>();
        spyOn(callbacks, 'onFinished');
        spyOn(callbacks, 'onLoad');
        
        restaurantsApi.callbacks = callbacks;
    })

    afterEach(() => {
        jasmine.Ajax.uninstall();
        callbacks = null;  
        window.fetch = originalFetch;
    });

    it('should match expected if status equal to 200', async () => {

        jasmine.Ajax.stubRequest(endpoint.list()).andReturn({
            status: 200,
            contentType: 'application/json',
            responseJSON: ListResto
        });

        await restaurantsApi.startLoad();
        
        const responseData: IRestaurantResponse = ListResto;
        responseData.restaurants.forEach((i: IRestaurantItem) => {
            i.pictureLocation = endpoint.image(ImageSize.SMALL, i.pictureId);
        });
        const successExpectedRespose: IAllResponse = {
            isSuccess: true,
            error: null,
            response: responseData
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(successExpectedRespose);
    });
});