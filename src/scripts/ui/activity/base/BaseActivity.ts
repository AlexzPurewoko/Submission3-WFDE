/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import DatabaseHelper from "../../../logic/db/helper/DatabaseHelper";
import MainApplication from "../../application/application";
import { LifecycleCallback } from "../../application/callback/LifecycleCallback";
import { FgAdapterCallback, FragmentAdapter } from "../../fragment/base/FragmentAdapter";


abstract class BaseActivity extends HTMLElement implements LifecycleCallback {
    

    protected _application: MainApplication = null;
    private _db: DatabaseHelper = null; 
    protected fragmentAdapter: FragmentAdapter = null;


    set application(app: MainApplication) {
        this._application = app;
    }

    set db(newDb: DatabaseHelper) {
        this._db = newDb;
    }

    get application(): MainApplication {
        return this._application;
    }

    get database(): DatabaseHelper  {
        return this._db;
    }

    // let's the child class override this method
    onCreated(params: any[]): void {
        const cb: FgAdapterCallback = {
            onNotify: (fgKey: string, key: string, value: any) => {
                this.onReceiveFragmentCallback(fgKey, key, value);
            }
        }
        this.fragmentAdapter = new FragmentAdapter(this._db, cb);
    }
    onReceiveFragmentCallback(fgKey: string, key: string, value: any): void{
        // empty implementation, child must implement if they are an fragment on it
    }
    abstract onPaused(): void 
    abstract onResumed(): void 
    abstract onDestroy(): void
    abstract onResizeEvent(event: Event): void
    abstract onScrollEvent(event: Event): void
}

export default BaseActivity;