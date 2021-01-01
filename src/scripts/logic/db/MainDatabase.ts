/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */

import { IDBPDatabase, DBSchema, openDB } from "idb";
import DatabaseHelper from "./helper/DatabaseHelper";
import MainObjStore from "./MainObjStore";

/**
 * @class
 * @description
 * 
 * The implementation and subclass for {@see DatabaseHelper}
 * 
 */
class MainDatabase extends  DatabaseHelper {

    private _d : Promise<IDBPDatabase<DBSchema>> = null;
    constructor() {
        super();
        this._d = openDB(this.dbName, 1, {
            upgrade(db) {
                db.createObjectStore(<never> MainObjStore.CURRENT_APP_STATE, {
                    keyPath: 'id'
                });

                db.createObjectStore(<never> MainObjStore.MAIN_DATABASE, {
                    keyPath: 'id'
                });
            }
        });
        this.init();
    }

    protected get dbName(): string {
        return "restaurant_app"
    }
    protected onOpenDb(): Promise<IDBPDatabase<DBSchema>> {
        return this._d;
    }
    // NEXT TIME WILL BE ADDED....
}

export default MainDatabase;