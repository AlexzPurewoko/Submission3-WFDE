import DatabaseHelper from "../helper/DatabaseHelper"

type DatabaseCb = (instance: DatabaseHelper) => void

class DBCallbacks {
    private _callbacks: DatabaseCb = null;

    set callbacks(nCallbacks: DatabaseCb){
        this._callbacks = nCallbacks;
    }

    onDataChanged(db: DatabaseHelper): void {
        this._callbacks(db);
    }
}

export {DBCallbacks, DatabaseCb};