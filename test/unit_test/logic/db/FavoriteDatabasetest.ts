import { createMock } from "ts-auto-mock";
import { On } from "ts-auto-mock/extension";
import { DatabaseCb, DBCallbacks } from "../../../../src/scripts/logic/db/callbacks/DBCallbacks";
import MainDatabase from "../../../../src/scripts/logic/db/MainDatabase";
import MainObjStore from "../../../../src/scripts/logic/db/MainObjStore";

describe('database favorite integration test', () => {
    let mainDatabase: MainDatabase;
    let dbCallbacks: DBCallbacks;
    let iDbCb: DatabaseCb;

    let selectedStore = MainObjStore.MAIN_DATABASE;

    beforeEach(() => {
        mainDatabase = new MainDatabase();
        iDbCb = createMock<DatabaseCb>();
        dbCallbacks = new DBCallbacks();
        dbCallbacks.callbacks = iDbCb;
        spyOn(dbCallbacks, 'onDataChanged');

        mainDatabase.addCallbacks(dbCallbacks);
        spyOn(console, 'error')
    });

    afterEach(async () => {
        mainDatabase.removeCallbacks(dbCallbacks);
        // await mainDatabase.deleteThisDb();
    });

    

    describe('test add data to database', () => {
        it('can add one data to favorite and read it', async () => {
            const retVal = await mainDatabase.addData(selectedStore, {id: 1, name: 'sarah kitchen'});
            expect(retVal).toEqual(true);
            
            const data = await mainDatabase.getByKey(selectedStore, 1);
            expect(data.name).toEqual('sarah kitchen');
            
            expect(dbCallbacks.onDataChanged).toHaveBeenCalledTimes(1);

            //clean up
            await mainDatabase.deleteData(selectedStore, 1);
        });
    
        it('can add data array and read it', async () => {
            const data = [
                {id: 1, name: 'sarah kitchen'},
                {id: 2, name: 'SPG'},
                {id: 3, name: 'Elizabeth'},
                {id: 4, name: 'Es teh'},
                {id: 5, name: 'Nasi Kuning'},
            ];
    
            expect(await mainDatabase.addAllData(selectedStore, data)).toEqual(true);
            const actualData = await mainDatabase.getAllData(selectedStore);
            
            expect(actualData).toEqual(data);
    
            expect(dbCallbacks.onDataChanged).toHaveBeenCalledTimes(1);


            for(let x = 0; x < data.length; x++){
                await mainDatabase.deleteData(selectedStore, data[x].id)
            }
        });

        it('cannot add the data when null and not displaying log error', async () => {
            const data: any = null;
            const d = await mainDatabase.addData(selectedStore, data);

            expect(d).toEqual(false);
            expect(console.error).not.toHaveBeenCalled();
            expect(dbCallbacks.onDataChanged).not.toHaveBeenCalled();
        });

        it('cannot add array of data when empty or null', async () => {
            const data: any = null;
            const d = await mainDatabase.addAllData(selectedStore, data);

            expect(d).toEqual(false);
            expect(console.error).not.toHaveBeenCalled();

            const data2: any = [];
            const d2 = await mainDatabase.addAllData(selectedStore, data2);

            expect(d2).toEqual(false);
            expect(console.error).not.toHaveBeenCalled();
            expect(dbCallbacks.onDataChanged).not.toHaveBeenCalled();
        });

    })

    describe('test set data function', () => {
        it('can change the data within database', async () => {
            expect(await mainDatabase.addData(selectedStore, {id: 1, name: 'elizabeth'})).toEqual(true);
            await mainDatabase.setData(selectedStore, 1, {id: 1, name: 'sarah kitchen'});

            const data = await mainDatabase.getByKey(selectedStore, 1);
            expect(data.name).toEqual('sarah kitchen');
            expect(console.error).not.toHaveBeenCalled();
            expect(dbCallbacks.onDataChanged).toHaveBeenCalled();

            // cleanup
            await mainDatabase.deleteData(selectedStore, 1);
        });
    
        it('should add the data when not found', async () => {
            await mainDatabase.setData(selectedStore, 2, {id: 2, name: 'sarah kitchen'});

            const data = await mainDatabase.getByKey(selectedStore, 2);
            expect(data).toEqual({
                id: 2,
                name: 'sarah kitchen'
            });
            expect(dbCallbacks.onDataChanged).toHaveBeenCalledTimes(1);

            // cleanup
            await mainDatabase.deleteData(selectedStore, 2);
        });
    });
    
    describe('check existence data test', () => {

        it('should return true if found the key in object store', async () => {
            await mainDatabase.addData(selectedStore, {id: 1, name: 'sarah kitchen'});

            const actual = await mainDatabase.anyData(selectedStore, 1);
            expect(actual).toEqual(true);

            await mainDatabase.deleteData(selectedStore, 1);
        });
    
        it('should return false if cannot found the key in object store', async () => {
            const a = await mainDatabase.anyData(selectedStore, 1);

            expect(a).toEqual(false);
        });
    })

    describe('read data negative test', () => {
        it('should return empty array if cannot find the data', async () => {
            const data = await mainDatabase.getAllData(selectedStore);
            expect(data).toEqual([]);
        });
    
        it('should return null if cannot find the data by Key', async () => {
            const data = await mainDatabase.getByKey(selectedStore, 1);
            expect(data).toEqual(null);
        });
    }); 
    
    describe('delete data test', () => {
 
        it('should return true if success delete the data within database', async () => {
            await mainDatabase.addData(selectedStore, {id: 1});

            const retVal = await mainDatabase.deleteData(selectedStore, 1);
            expect(retVal).toEqual(true);
            expect(dbCallbacks.onDataChanged).toHaveBeenCalledTimes(2);
        });
    
        it('should return false if fail to find the data to be deleted', async () => {
            
            const retVal = await mainDatabase.deleteData(selectedStore, 1);
            console.log('retVal '+retVal);
            expect(retVal).toEqual(false);
            expect(dbCallbacks.onDataChanged).not.toHaveBeenCalled();
        });
    });

});