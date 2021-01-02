/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import DatabaseHelper from "../../../logic/db/helper/DatabaseHelper";
import MainApplication from "../../application/application";
import { LifecycleCallback } from "../../application/callback/LifecycleCallback";
import { FgAdapterCallback, FragmentAdapter } from "../../fragment/base/FragmentAdapter";

/**
 * @class 
 * @classdesc
 * 
 * Defines the base of all activities, provide the dependency of managing fragment {@see FragmentAdapter}
 * And managing Indexed Database {@see DatabaseHelper}, you can also control to back activity by using {@property application}
 * 
 * All activities must implement this class to create activity
 * 
 */
abstract class BaseActivity extends HTMLElement implements LifecycleCallback {
    
    protected _application: MainApplication = null;
    private _db: DatabaseHelper = null; 
    protected fragmentAdapter: FragmentAdapter = null;

    /**
     * @property @ignore
     * 
     * This implementation is provided by {@link MainApplication}
     * So you cannot set this property directly, its prohibited because it can damage
     * the application feature
     */
    set application(app: MainApplication) {
        this._application = app;
    }

    /**
     * @property @ignore
     * 
     * This implementation is provided by {@link MainApplication}
     * So you cannot set this property directly, its prohibited because it can damage
     * the application feature
     */
    set db(newDb: DatabaseHelper) {
        this._db = newDb;
    }

    /**
     * @property 
     * @description
     * 
     * Provides an application instance to call the application controller
     * 
     * @returns current application
     */
    get application(): MainApplication {
        return this._application;
    }

    /**
     * @property 
     * @description
     * 
     * Provides a IndexedDB instance to use database features
     * 
     * @returns current database
     */
    get database(): DatabaseHelper  {
        return this._db;
    }

    /**
     * @property 
     * @description
     * 
     * Provides a callback when activity has ben created at first time
     * This method is optional, but the best idea is to implement by adding some elements to activity
     * 
     * @param params serves an array of activity configuration parameters
     * 
     * @returns current application
     */
    onCreated(params: any[]): void {
        const cb: FgAdapterCallback = {
            onNotify: (fgKey: string, key: string, value: any) => {
                this.onReceiveFragmentCallback(fgKey, key, value);
            }
        }
        this.fragmentAdapter = new FragmentAdapter(this._db, cb);
    }

    /**
     * @property 
     * @description
     * 
     * Provides a callback when any messages from fragment.
     * This function is optional to override, but if you using fragment mechanism
     * the best idea is to implement it. 
     * 
     * Because if any callback messages from fragment,
     * you can implement this function to get the message without extra code
     * 
     * @param fgKey fragment keys 
     * @param key defined message keys
     * @param value object message from fragment
     * 
     * @returns current application
     */
    onReceiveFragmentCallback(fgKey: string, key: string, value: any): void{
        // empty implementation, child must implement if they are an fragment on it
    }

    /**
     * @abstract @function
     * @override 
     * 
     * Abstract function that inherited from {@link LifecycleCallback}
     */
    abstract onPaused(): void 
    abstract onResumed(): void 
    abstract onDestroy(): void
    abstract onResizeEvent(event: Event): void
    abstract onScrollEvent(event: Event): void
}

export default BaseActivity;