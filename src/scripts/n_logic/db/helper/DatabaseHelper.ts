/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DBSchema, deleteDB, IDBPDatabase } from "idb";
import { DBCallbacks } from "../callbacks/DBCallbacks";


abstract class DatabaseHelper {
    private _db : Promise<IDBPDatabase<DBSchema>>  = null;
    private _listCb: DBCallbacks[] = [];

    init() :void  {
        this._db = this.onOpenDb();
    }

    addCallbacks(cb: DBCallbacks): void {
        if(!cb) return;
        if(this._listCb.findIndex(a => a === cb) >= 0) return;
        this._listCb.push(cb);
    }

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

    protected abstract get dbName(): string 

    protected abstract onOpenDb() : Promise<IDBPDatabase<DBSchema>> 

    // return boolean
    async addData(storeName: any, data: any): Promise<boolean> {
        if(!this._db) return false;

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

    // update data
    // return boolean which indicates success or not
    async setData(storeName: any, keyData: string, newValue: any): Promise<boolean>{
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

    // delete the data
    // returns the boolean
    async deleteData(storeName: any, keyData: string): Promise<boolean>{
        if(!this._db) return false;

        try {
            const db = await this._db;
            const t = db.transaction(storeName, 'readwrite');
            await t.store.delete(keyData);
            this._notifyAllCallbacks();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    // get the data by KEY (primaryKEY)
    async getByKey(storeName: any, keyData: string): Promise<any>{
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

    // return boolean
    async anyData(storeName: any, keyData: string) : Promise<boolean>{
        const q = await this.getByKey(storeName, keyData);
        return  q ? true:false;
    }
}

export default DatabaseHelper;