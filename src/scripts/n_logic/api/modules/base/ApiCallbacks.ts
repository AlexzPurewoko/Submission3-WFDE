import { IAllResponse } from "../../allresponse/IAllResponse";

export default interface ApiCallbacks {
    readonly onFinished: (data: IAllResponse) => void,
    readonly onLoad: () => void
}