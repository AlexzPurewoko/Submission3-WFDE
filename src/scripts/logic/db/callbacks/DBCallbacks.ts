/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */

import DatabaseHelper from "../helper/DatabaseHelper"

/**
 * @type 
 * 
 * Provided to notify data changed. Called when any data changes
 * 
 */
type DatabaseCb = (instance: DatabaseHelper) => void

/**
 * @class 
 * @description'
 * 
 * This class is used to notify by {@link DatabaseHelper} class
 * To notiy any data change operation, there add adding, set or deletion to database.
 * 
 */
class DBCallbacks {
    private _callbacks: DatabaseCb = null;

    set callbacks(nCallbacks: DatabaseCb){
        this._callbacks = nCallbacks;
    }

    /**
     * @ignore
     * @function
     * @description
     * 
     * This method called by {@link DatabaseHelper} to inform/notify the data changes
     * 
     * @param db The {@see DatabaseHelper} instance. 
     */
    onDataChanged(db: DatabaseHelper): void {
        this._callbacks(db);
    }
}

export {DBCallbacks, DatabaseCb};