import { IDBPDatabase, DBSchema } from "idb";
import DatabaseHelper from "../../../../../src/scripts/logic/db/helper/DatabaseHelper";

class DummyDatabase extends DatabaseHelper {
    protected get dbName(): string {
        return 'dummy'
    }
    protected onOpenDb(): Promise<IDBPDatabase<DBSchema>> {
        return null; // because we don't need anything to perform database
    }
}
export default DummyDatabase;