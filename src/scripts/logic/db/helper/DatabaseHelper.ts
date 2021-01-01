/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DBSchema, deleteDB, IDBPDatabase } from "idb";
import { DBCallbacks } from "../callbacks/DBCallbacks";

/**
 * @class @abstract
 * @description
 * 
 * A base class for managing indexed database
 * That implemented by other sub-class to provide the data
 * 
 */
abstract class DatabaseHelper {
    private _db : Promise<IDBPDatabase<DBSchema>>  = null;
    private _listCb: DBCallbacks[] = [];

    /**
     * @function init()
     * @description
     * 
     * Initialize the database by open, and prepare.
     * This method can be anywhere whereby you should have 
     * An instance of {@link DatabaseHelper}
     */
    init() :void  {
        this._db = this.onOpenDb();
    }

    /**
     * @function addCallbacks()
     * @description 
     * 
     * Adding a callback to a queue
     * 
     * @param cb configured callbacks
     */
    addCallbacks(cb: DBCallbacks): void {
        if(!cb) return;
        if(this._listCb.findIndex(a => a === cb) >= 0) return;
       
        this._listCb.push(cb);
    }
    /**
     * @function addCallbacks()
     * @description 
     * 
     * Remove a callback from a queue
     * 
     * @param cb configured callbacks
     */
    removeCallbacks(cb: DBCallbacks): void {
        if(!cb) return;
        if(this._listCb.findIndex(a=>a===cb) < 0) return;
        this._listCb = this._listCb.filter(a => a!==cb);
    }

    private _notifyAllCallbacks(){
        try {
            this._listCb.forEach(a => {
                a.onDataChanged(this);
            });
        } catch (e: any) {
            console.error("Unexpected error when running notifyCallbacks()", e);
        }
    }

    async deleteThisDb(): Promise<boolean> {
        try {
            await deleteDB(this.dbName, {
                blocked() {
                    throw new Error('Database cannot be deleted! Maybe wait until any operation closed!');
                }
            });
            return true;
        } catch(e){
            console.error(e);
            return false;
        }
    }

    /**
     * @property
     * @protected
     * 
     * Must be implemented by child-class to provide database name
     * 
     * @returns a string
     */
    protected abstract get dbName(): string 

    /**
     * @function onOpenDb()
     * @protected
     * 
     * Must be implemented by child-class to provide open database configuration.
     * 
     * @returns The IDB Promise 
     */
    protected abstract onOpenDb() : Promise<IDBPDatabase<DBSchema>> 


    /**
     * @function addData()
     * @protected
     * 
     * Add the object data to the Object Store
     * 
     * @param storeName Object store name
     * @param data Object data to be saved
     * 
     * @returns true if success and false oterwise in Promise
     */
    async addData(storeName: any, data: any): Promise<boolean> {
        if(!this._db) return false;
        if(data === null) return false;
        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            await t.store.add(data);
            this._notifyAllCallbacks();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @function addAllData()
     * @protected
     * 
     * Add array of the object data to the Object Store
     * 
     * @param storeName Object store name
     * @param arrayOfData Array of object data to be saved
     * 
     * @returns true if success and false oterwise in Promise
     */
    async addAllData(storeName: any, arrayOfData: any[]): Promise<boolean> {
        if(!this._db) return false;
        if(!arrayOfData) return false;
        if(arrayOfData.length < 1) return false;

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            const allPromisses = arrayOfData.map(a => t.store.add(a));
            await Promise.all(allPromisses);
            this._notifyAllCallbacks();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @function setData()
     * @protected
     * 
     * Update the object data, and create if not exists
     * 
     * @param storeName Object store name
     * @param keyData The unique key that provided by IDB key-path 
     * @param newValue new object data
     * 
     * @returns true if success and false oterwise in Promise
     */
    async setData(storeName: any, keyData: any, newValue: any): Promise<boolean>{
        if(!this._db) return false;

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            let isAny = false;
            try {
                const a = await t.store.get(keyData);
                isAny = !(a === undefined || a === null);
            } catch(e){
                isAny = false;
            }
            if(isAny){
                await t.store.delete(keyData);
            } 
            await t.store.add(newValue);
            this._notifyAllCallbacks();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @function deleteData()
     * @protected
     * 
     * delete the object data
     * 
     * @param storeName Object store name
     * @param keyData The unique key that provided by IDB key-path 
     * 
     * @returns true if success and false oterwise in Promise
     */
    async deleteData(storeName: any, keyData: any): Promise<boolean>{
        if(!this._db) return false;

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');

            let isAny = false;
            try {
                const a = await t.store.get(keyData);
                isAny = !(a === undefined || a === null);
            } catch(e){
                isAny = false;
            }
            if(!isAny) return false;
            await t.store.delete(keyData);
            this._notifyAllCallbacks();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @function getByKey()
     * @protected
     * 
     * Get the object data from specified key path
     * 
     * @param storeName Object store name
     * @param keyData The unique key that provided by IDB key-path 
     * 
     * @returns object data Promise
     */
    async getByKey(storeName: any, keyData: any): Promise<any>{
        if(!this._db) return null;

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            const result = await t.store.get(keyData);
            return (result === undefined || result === null) ? null : result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    /**
     * @function getAllData()
     * @protected
     * 
     * Get all data from specified object store
     * 
     * @param storeName Object store name
     * 
     * @returns array of data in Promise
     */
    // get All Data
    // return arrays
    async getAllData(storeName: any): Promise<any[]>{
        if(!this._db) return [];

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            const result = await t.store.getAll();
            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * @function anyData()
     * @protected
     * 
     * Checks the existence of key path in an object store
     * 
     * @param storeName Object store name
     * @param keyData The unique key that provided by IDB key-path 
     * 
     * @returns true if exits and false oterwise in Promise
     */
    async anyData(storeName: any, keyData: any) : Promise<boolean>{
        const q = await this.getByKey(storeName, keyData);
        return  q ? true:false;
    }
}

export default DatabaseHelper;