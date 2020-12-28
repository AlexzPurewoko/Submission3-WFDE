import { createMock } from 'ts-auto-mock';
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import { IAllResponse } from '../../../../src/scripts/logic/api/allresponse/IAllResponse';
import { IRestaurantDetailResponse } from '../../../../src/scripts/logic/api/data/detail/IRestaurantDetailResponse';
import { endpoint } from '../../../../src/scripts/logic/api/endpoint/endpoint';
import { ImageSize } from '../../../../src/scripts/logic/api/endpoint/ImageSize';
import ApiCallbacks from '../../../../src/scripts/logic/api/modules/base/ApiCallbacks';
import BaseApi from '../../../../src/scripts/logic/api/modules/base/BaseApi';
import GetRestaurantDetail from '../../../../src/scripts/logic/api/modules/detail/GetRestaurantDetail';
import { DetailResto } from './data/detail_resto';

describe("GetRestaurantDetail class logic test", () => {

    let originalFetch: ((input: RequestInfo, init?: RequestInit) => Promise<Response>) & ((input: RequestInfo, init?: RequestInit) => Promise<Response>) ;
    let restaurantDetailApi : GetRestaurantDetail;
    const id: string = "rqdv5juczeskfw1e867";
    let callbacks: ApiCallbacks;
    
    beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = fetchPolyfill;
        jasmine.Ajax.install();

        restaurantDetailApi = new GetRestaurantDetail();
        callbacks = createMock<ApiCallbacks>();
        spyOn(callbacks, 'onFinished');
        spyOn(callbacks, 'onLoad');
        
        restaurantDetailApi.id = id;
        restaurantDetailApi.callbacks = callbacks;
    })

    afterEach(() => {
        jasmine.Ajax.uninstall();
        callbacks = null;  
        window.fetch = originalFetch;
    });

    it('should match expected if status equal to 200', async () => {

        // spyOnProperty(dataMock.restaurant, 'pictureId');
        
        jasmine.Ajax.stubRequest(endpoint.detail(id)).andReturn({
            status: 200,
            contentType: 'application/json',
            responseJSON: DetailResto
        });

        await restaurantDetailApi.startLoad();
        
        const responseData: IRestaurantDetailResponse = DetailResto;
        responseData.restaurant.pictureLocation = endpoint.image(ImageSize.SMALL, DetailResto.restaurant.pictureId);

        const successExpectedRespose: IAllResponse = {
            isSuccess: true,
            error: null,
            response: responseData
        }
        expect(callbacks.onLoad).toHaveBeenCalledTimes(1);
        expect(callbacks.onFinished).toHaveBeenCalledOnceWith(successExpectedRespose);
    });

});