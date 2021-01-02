/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatabaseHelper from "../../../logic/db/helper/DatabaseHelper";
import Fragment, { GeneralCb } from "./Fragment";
import { FragmentCallback } from "./FragmentCallback";
import { FragmentManifest as fgManifest} from "./FragmentManifest";

/**
 * @callback @interface FgAdapterCallback
 * @description 
 * 
 * 
 */
export interface FgAdapterCallback {
    onNotify(fragmentTargetKey: string, key: string, value: any): void
}

/**
 * @class 
 * @classdesc
 * 
 * The main adapter for fragment, provides a control management for managing fragment easier
 * Without a boilerplate code for show/hide fragment, and managed with a basic lifecyle {@see Fragment}
 *  
 * This adapter has been injected to the base activity, and will implemented by its child class
 * So don't need to 'manual' configure :)
 * 
 */
export class FragmentAdapter {
    private _accessDb: DatabaseHelper;
    private _fgAdapterCbRef: FgAdapterCallback;

    private _fragments: Map<string, Fragment> = new Map<string, Fragment>();
    private _referenceDOM: Map<string, HTMLElement> = new Map<string, HTMLElement>();

    private fgManifest: string[];

    /**
     * @constructor 
     * 
     * @param accessDb instance of {@see DatabaseHelper}
     * @param fgCbAdapter implementation of {@see FgAdapterCallback}
     * @param _fgManifest fragment manifest. Don't need to reconfigure, except the Unit Test 
     */
    constructor(accessDb: DatabaseHelper, fgCbAdapter: FgAdapterCallback, _fgManifest = fgManifest){
        this.fgManifest = _fgManifest;
        this._accessDb = accessDb;
        this._fgAdapterCbRef = fgCbAdapter;
    }

    /**
     * @function attachFragment
     * @description
     * 
     * Create and attach a fragment to UI
     *  
     * @param key unique key to access the fragments 
     * @param fragmentName fragment name, must be defined in {@see FragmentManifest}
     * @param addTo container element to be location of added fragment
     * @param argument arguments to fragment, it will served on property {@see Fragment.arguments}
     */
    attachFragment(key: string, fragmentName: string, addTo: HTMLElement, argument: any = null): void{
        const isAny = this.fgManifest.includes(fragmentName);
        if(!isAny || this._fragments.has(key)) return;
        if(!addTo) return;
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

    /**
     * @function getFragment
     * @description
     * 
     * Get the selected fragment from specified key
     * 
     * @param key a unique key to get a fragment
     * 
     * @returns {@link Fragment} if any key defined and null if no defined key
     */
    getFragment(key: string): Fragment {
        return this._fragments.get(key);
    }

    /**
     * @function detachFragment
     * @description
     * 
     * Detach a fragment from UI
     * 
     * @param keys array of unique key to remove the fragment 
     */
    detachFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onDestroy();

            this._referenceDOM.get(key).removeChild(fg);
        })
    }

    /**
     * @function hideFragment
     * @description
     * 
     * Hide a fragment from UI, and pause the fragment
     * 
     * @param keys array of unique key to hide the fragment 
     */
    hideFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onSaveState();
            fg.setAttribute("style", "display:none;");
        });
    }

    /**
     * @function hideFragment
     * @description
     * 
     * Show a fragment and make it resume again
     * 
     * @param keys array of unique key to visible the fragment 
     */
    showFragment(...keys: string[]){
        keys.forEach(key => {
            if(!this._fragments.has(key))return;

            const fg = this._fragments.get(key);
            fg.onResumed();
            fg.setAttribute("style", "display:initial;");
        });
    }

    /**
     * @function sendMessage
     * @description
     * 
     * Sends a message to specified fragment target key. This can be do
     * when any event changes on the activity side. And we plan to forwards to the fragment
     * for configuration changes that defined in {@see GeneralCb} or other messages :)
     * 
     * @param fragmenTargetkey an unique key fragment
     * @param key defined {@see GeneralCb} key enums
     * @param value a value of messages that will be sended to target fragment
     */
    sendMessage(fragmenTargetkey: string, key: GeneralCb, value: any): void{
        if(!this._fragments.has(fragmenTargetkey)) return;
        this._fragments.get(fragmenTargetkey).onReceiveMessage(key, value);
    }

    /**
     * @function getTitleOf
     * @description
     * 
     * Gets the title of fragment by unique fragment key
     * 
     * @param fragmentKey unigue key to select the fragment
     */
    getTitleOf(fragmentKey: string): string{
        if(!this._fragments.has(fragmentKey)) return null;
        return this._fragments.get(fragmentKey).titleFragment();
    }

    /**
     * @function @ignore
     * 
     * @param fragmentTargetKey fragment unique key
     * @param key a unique string to identifies the message
     * @param value value of messages that will be sended
     */
    private handleCb(fragmentTargetKey: string, key: string, value: any){
        this._fgAdapterCbRef.onNotify(fragmentTargetKey, key, value);
    }
}