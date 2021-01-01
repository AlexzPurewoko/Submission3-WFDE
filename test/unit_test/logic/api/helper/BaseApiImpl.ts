import { ApiAllResponse } from "../../../../../src/scripts/logic/api/allresponse/IAllResponse";
import { ITestResponse } from "../../../../../src/scripts/logic/api/data/test/ITestResponse";
import BaseApi from "../../../../../src/scripts/logic/api/modules/base/BaseApi";
import { BaseLogicData } from "../data/BaseLogicData";

export default class BaseApiImpl extends BaseApi {
    protected fetchPromise(): Promise<Response> {
        return fetch("/data/api");
    }

    protected serveData(jsonData: Record<string, unknown>): Promise<ApiAllResponse> {
        const jsonD : BaseLogicData = <BaseLogicData> <unknown> jsonData;
        const ret: ITestResponse = {
            error: false,
            message: "",
            data: jsonD
        }
        return Promise.resolve(ret);
    }
}