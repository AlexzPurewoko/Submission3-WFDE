/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatabaseHelper from "../../../n_logic/db/helper/DatabaseHelper";
import Fragment, { GeneralCb } from "./Fragment";
import { FragmentCallback } from "./FragmentCallback";
import { FragmentManifest } from "./FragmentManifest";

export interface FgAdapterCallback {
    onNotify(fragmentTargetKey: string, key: string, value: any): void
}
export class FragmentAdapter {
    private _accessDb: DatabaseHelper;
    private _fgAdapterCbRef: FgAdapterCallback;

    private _fragments: Map<string, Fragment> = new Map<string, Fragment>();
    private _referenceDOM: Map<string, HTMLElement> = new Map<string, HTMLElement>();

    constructor(accessDb: DatabaseHelper, fgCbAdapter: FgAdapterCallback){
        this._accessDb = accessDb;
        this._fgAdapterCbRef = fgCbAdapter;
    }
    attachFragment(key: string, fragmentName: string, addTo: HTMLElement, argument: any = null): void{
        const isAny = FragmentManifest.includes(fragmentName);
        if(!isAny || this._fragments.has(key)) return;
        
        const created = <Fragment> document.createElement(fragmentName);

        // initialize callbacks 
        const _cb : FragmentCallback = {
            onReceive: (obKey: string, value: any) => {
                this.handleCb(key, obKey, value);
            }
        }

        created.initialize(this._accessDb, _cb);
        created.arguments = argument;
        created.onRenderPage();
        this._fragments.set(key, created);
        this._referenceDOM.set(key, addTo);
        created.setAttribute("style", "display:none;");
        addTo.append(created);
    }

    getFragment(key: string): Fragment {
        return this._fragments.get(key);
    }

    detachFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onDestroy();

            this._referenceDOM.get(key).removeChild(fg);
        })
    }

    hideFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onSaveState();
            fg.setAttribute("style", "display:none;");
        });
    }

    showFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onRenderPage();
            fg.setAttribute("style", "display:initial;");
        });
    }

    sendMessage(fragmenTargetkey: string, key: GeneralCb, value: any): void{
        if(!this._fragments.has(fragmenTargetkey)) return;
        this._fragments.get(fragmenTargetkey).onReceiveMessage(key, value);
    }

    getTitileOf(fragmentKey: string): string{
        if(!this._fragments.has(fragmentKey)) return null;
        return this._fragments.get(fragmentKey).titleFragment();
    }

    private handleCb(fragmentTargetKey: string, key: string, value: any){
        this._fgAdapterCbRef.onNotify(fragmentTargetKey, key, value);
    }
}