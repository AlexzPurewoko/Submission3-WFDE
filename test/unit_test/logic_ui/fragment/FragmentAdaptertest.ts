import { createMock } from "ts-auto-mock";
import Fragment, { GeneralCb } from "../../../../src/scripts/ui/fragment/base/Fragment";
import { FgAdapterCallback, FragmentAdapter } from "../../../../src/scripts/ui/fragment/base/FragmentAdapter";
import DummyDatabase from "./helpers/DummyDatabase";
import { dummyFragment } from "./helpers/fgmanifest";
import TestFragment from "./helpers/TestFragment";

describe('Base Fragment Lifecycle Test', ()=> {

    let fgCallback: FgAdapterCallback;
    let dummyDatabase: DummyDatabase;
    let testFragment: TestFragment;
    let secondFragment: TestFragment;
    let fgAdapter: FragmentAdapter;
    let htmlLayout: HTMLElement;
    const fgManifest: string[] = dummyFragment;

    beforeEach(() => {
        htmlLayout = document.createElement('div');
        fgCallback = createMock<FgAdapterCallback> ();
        spyOn(fgCallback, 'onNotify');

        dummyDatabase = createMock<DummyDatabase>();
        spyOnAllFunctions(dummyDatabase);

        testFragment = new TestFragment();
        secondFragment = new TestFragment();
        spyOn(testFragment, 'onRenderPage');
        spyOn(testFragment, 'onResumed');
        spyOn(testFragment, 'onSaveState');
        spyOn(testFragment, 'onDestroy');
        spyOn(testFragment, 'onReceiveMessage');
        spyOn(testFragment, 'initialize').and.callThrough();
        spyOn(testFragment, 'setAttribute');


        spyOn(secondFragment, 'onRenderPage');
        spyOn(secondFragment, 'onResumed');
        spyOn(secondFragment, 'onSaveState');
        spyOn(secondFragment, 'onDestroy');
        spyOn(secondFragment, 'onReceiveMessage');
        spyOn(secondFragment, 'initialize');
        spyOn(secondFragment, 'setAttribute');
        spyOn(document, 'createElement').and.callFake((query: string): any => { 
            if(query === fgManifest[0]) return testFragment;
            else if(query === fgManifest[1]) return secondFragment;
        });
        fgAdapter = new FragmentAdapter(dummyDatabase, fgCallback, fgManifest);
        spyOn(htmlLayout, 'append').and.callThrough();
        spyOn(htmlLayout, 'removeChild').and.callThrough();
    });

    describe('attachFragment method test case', () => {
        it('should create fragment with key and perform initialization on fragment', () => {
        
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
    
            // check if fragment has been added
            expect(document.createElement).toHaveBeenCalledWith(fgManifest[0]);
            expect(testFragment.onRenderPage).toHaveBeenCalledTimes(1);
            expect(testFragment.initialize).toHaveBeenCalledTimes(1);
        });
    
        it('should not create fragment if the requested fragment name doesnt exists', () => {
            fgAdapter.attachFragment('key', 'hello-fragment', htmlLayout);
    
            expect(testFragment.initialize).not.toHaveBeenCalled();
        });
    
        it('should not create fragment if key is exists', () => {
    
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            fgAdapter.attachFragment('key', fgManifest[1], htmlLayout);
    
            expect(document.createElement).not.toHaveBeenCalledWith(fgManifest[1]);
        });
    
        it('should not create fragmnet if the "addTo" parameter is null or undefined', () => {
            fgAdapter.attachFragment('key', fgManifest[0], null);
    
            expect(document.createElement).not.toHaveBeenCalledWith(fgManifest[0]);
        });
    });

    describe('detachFragment method test case', () => {
        it('should detach one fragments', () => {
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            fgAdapter.detachFragment('key');
    
            expect(testFragment.onDestroy).toHaveBeenCalledTimes(1);
            expect(htmlLayout.removeChild).toHaveBeenCalledWith(testFragment);
    
        });
    
        it('should detach multiple fragments by list', () => {
            fgAdapter.attachFragment('key1', fgManifest[0], htmlLayout);
            fgAdapter.attachFragment('key2', fgManifest[1], htmlLayout);
    
            fgAdapter.detachFragment('key1', 'key2');
    
            expect(testFragment.onDestroy).toHaveBeenCalledTimes(1);
            expect(secondFragment.onDestroy).toHaveBeenCalledTimes(1);
    
            expect(htmlLayout.removeChild).toHaveBeenCalledTimes(2);
        });
    
        it('should skip fragment if doesn\'t registered in fragment manifest', () => {
    
            fgAdapter.attachFragment('key2', fgManifest[1], htmlLayout);
    
            fgAdapter.detachFragment('key1', 'key2');
    
            expect(testFragment.onDestroy).not.toHaveBeenCalled();
            expect(secondFragment.onDestroy).toHaveBeenCalledTimes(1);
    
            expect(htmlLayout.removeChild).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('Resume and Paused fragment state test', () => {
        it('should show up fragment and call onResumed if registered', () => {
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            fgAdapter.showFragment('key');
        
                // check if fragment has been added
    
            expect(testFragment.onResumed).toHaveBeenCalledTimes(1);
            expect(testFragment.setAttribute).toHaveBeenCalledWith("style", "display:initial;");
            
        });
        
        it('should hide fragment and call onSaveState if registered', () => {
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            fgAdapter.hideFragment('key');
        
                // check if fragment has been added
    
            expect(testFragment.onSaveState).toHaveBeenCalledTimes(1);
            expect(testFragment.setAttribute).toHaveBeenCalledWith("style", "display:none;");
            
        });
    });

    describe('Notify message test', () => {
        it('should can send message if tag keys is not null', () => {
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            fgAdapter.sendMessage('key', GeneralCb.MESSAGE_DATA, {m: "hello world"});
    
            expect(testFragment.onReceiveMessage).toHaveBeenCalledWith(GeneralCb.MESSAGE_DATA, {m: "hello world"});
        });

        it('should can send message to activity or parent fragment by mocking FgCallbacks', () => {
            fgAdapter.attachFragment('key', fgManifest[0], htmlLayout);
            testFragment.send(GeneralCb.MESSAGE_OTHERS, {message: "hello world!"});

            expect(fgCallback.onNotify).toHaveBeenCalledOnceWith('key', GeneralCb.MESSAGE_OTHERS, {message: "hello world!"})

        });
    })

});