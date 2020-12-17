/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatabaseHelper from "../../../n_logic/db/helper/DatabaseHelper";
import { FragmentCallback } from "./FragmentCallback";

export enum GeneralCb {
    MESSAGE_ONRESIZE = "onresize",
    MESSAGE_ONSCROLL = "onscroll",
    MESSAGE_DATA = "data",
    MESSAGE_OTHERS = "other_message"
}
abstract class Fragment extends HTMLElement {

    private _db: DatabaseHelper = null;
    private _arguments: any = null;
    private _cb: FragmentCallback = null;


    initialize(_db: DatabaseHelper, _cb: FragmentCallback){
        this._db = _db;
        this._cb = _cb;
    }

    set arguments(nArguments: any){
        this._arguments = nArguments;
    }

    get arguments() {
        return this._arguments;
    }
    
    get database() {
        return this._db;
    }

    send(key: GeneralCb, value: any): void{
        if(this._cb){
            this._cb.onReceive(key, value);
        }
    }

    abstract onRenderPage(): void
    abstract onSaveState(): void
    abstract onDestroy(): void
    abstract titleFragment(): string
    abstract onReceiveMessage(key: GeneralCb, value: any): void
}

export default Fragment;