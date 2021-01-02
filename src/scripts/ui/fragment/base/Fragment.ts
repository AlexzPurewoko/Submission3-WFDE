/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatabaseHelper from "../../../logic/db/helper/DatabaseHelper";
import { FragmentCallback } from "./FragmentCallback";

/**
 * @enum
 * @description
 * 
 * Provides a definition key for specifying the message
 * the message can be an event message to notify fragment from changes in layout and so more
 * 
 */
export enum GeneralCb {
    MESSAGE_ONRESIZE = "onresize",
    MESSAGE_ONSCROLL = "onscroll",
    MESSAGE_DATA = "data",
    MESSAGE_OTHERS = "other_message"
}

/**
 * @class @abstract
 * @classdesc
 * 
 * The base of all Fragment class, all fragments must implement it 
 * Because it contains a lifecycle that make easier to manage
 * 
 */
abstract class Fragment extends HTMLElement {

    private _db: DatabaseHelper = null;
    private _arguments: any = null;
    private _cb: FragmentCallback = null;


    /**
     * @function
     * @description
     * 
     * This function used by {@link FragmentAdapter} to inject some instances
     * such as dabase helper and fragment callbacks.
     * 
     * @param _db configured database, and must be a subclass from {@link DatabaseHelper}
     * @param _cb defined fragment callbacks
     * 
     * @returns
     */
    initialize(_db: DatabaseHelper, _cb: FragmentCallback){
        this._db = _db;
        this._cb = _cb;
    }

    /**
     * @property @ignore
     * @description
     * 
     * Set the fragment arguments, called when first initiating fragment after created
     * This property is served by {@link FragmentAdapter}. So, you dont need to use this
     * 
     */
    set arguments(nArguments: any){
        this._arguments = nArguments;
    }

    /**
     * @property
     * 
     * Gets a fragment arguments
     * 
     * @returns fragment arguments
     */
    get arguments() {
        return this._arguments;
    }
    
    /**
     * @property
     * 
     * Returns an instance of database
     * 
     * @returns database instance
     */
    get database() {
        return this._db;
    }

    /**
     * @function send
     * @description
     * 
     * Send the message out into the activity or parent fragment that implements
     * {@see FragmentCallback} object interface.
     *  
     * @param key A defined key of (@see GeneralCb)
     * @param value A value message of fragments
     */
    send(key: GeneralCb, value: any): void{
        if(this._cb){
            this._cb.onReceive(key, value);
        }
    }

    /**
     * @callback @function
     * @description
     * 
     * Called when first rendering page
     */
    abstract onRenderPage(): void

    /**
     * @callback @function
     * @description
     * 
     * Called when fragment is resumed from pause state or after created.
     */
    abstract onResumed(): void


    /**
     * @callback @function
     * @description
     * 
     * Called when fragment begin to enter paused state
     */
    abstract onSaveState(): void

    /**
     * @callback @function
     * @description
     * 
     * Called when fragment detached from element 
     */
    abstract onDestroy(): void
    
    /**
     * @callback @function
     * @description
     * 
     * Provides a fragment title, its called when any you trigger {@see FragmentAdapter.getTitleOf()} function
     * 
     * @returns string
     */
    abstract titleFragment(): string

    /**
     * @callback @function
     * @description
     * 
     * Gets the received messages from Activities or other parent fragments. 
     * 
     * @param key enum of {@see GeneralCb} 
     * @param value retrieved messages/value from an event
     */
    abstract onReceiveMessage(key: GeneralCb, value: any): void
}

export default Fragment;