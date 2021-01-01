import BaseActivity from "../../../../src/scripts/ui/activity/base/BaseActivity";
import MainApplication from "../../../../src/scripts/ui/application/application";
import { AppManifest } from "../../../../src/scripts/ui/application/manifest/AppManifest";
import Activity1 from "./helpers/Activity1Impl";
import Activity2 from "./helpers/Activity2Impl";
import Activity3 from "./helpers/Activity3Impl";
import { appManifestImpl } from "./helpers/AppManifest";
import "../../../../src/scripts/ui/activity/base/BaseActivity";
import "../../../../src/scripts/ui/application/application";
import "./helpers/Activity1Impl";
import "./helpers/Activity2Impl";
import "./helpers/Activity3Impl";

describe('Main Application Logic Test', () => {
    
    let application: MainApplication;
    let activityOne: Activity1;
    let activityTwo: Activity2;
    let activityThree: Activity3;
    let originalCreateElement: any;
    let appManifest: AppManifest = appManifestImpl;

    beforeEach(() => {
        
        const elm = document.createElement('application-main');
        application = <MainApplication> elm;

        document.body.append(elm);
        activityOne = new Activity1();
        activityTwo = new Activity2();
        activityThree = new Activity3();

        const spyActivity = (activityObj: BaseActivity) => {
            spyOn(activityObj, 'onCreated').and.callThrough();
            spyOn(activityObj, 'onPaused').and.callThrough();
            spyOn(activityObj, 'onResumed').and.callThrough();
            spyOn(activityObj, 'onDestroy').and.callThrough();
            spyOn(activityObj, 'onResizeEvent').and.callThrough();
            spyOn(activityObj, 'onScrollEvent').and.callThrough();
            
        };

        originalCreateElement = document.createElement;
        spyOn(document, 'createElement').and.callFake(function (strHtml: string){
            switch(strHtml) {
                case 'act-first':
                    return activityOne;
                
                case 'act-two':
                    return activityTwo;

                case 'act-three':
                    return activityThree;
                
                default: 
                    return originalCreateElement(strHtml);
            }
        });
        spyActivity(activityOne);
        spyActivity(activityTwo);
        spyActivity(activityThree);
        application.manifest = appManifest;
    });

    afterEach(() => {
        document.createElement = originalCreateElement;
        application.disconnectedCallback();
        activityOne = activityTwo = activityThree = null;
        application = null;
        window.location.hash = '';

    });

    describe('Feature test', () => {

        it('should display the homepage when start load url at the begining', () => {
            application.runApplication();

            expect(activityOne.onCreated).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('act-first');
        });

        it('should display the selected page when load specific url to the page', () => {
            window.location.hash = "#/Activity2Impl";

            application.runApplication();
            expect(activityTwo.onCreated).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('act-two');
        });

        it('activity should receive the list of arguments when created', () => {
            window.location.hash = "#/Activity2Impl/33322";

            application.runApplication();
            expect(activityTwo.onCreated).toHaveBeenCalledWith(["33322"]);
            expect(document.createElement).toHaveBeenCalledWith('act-two');
        });

        it('should display error when cannot find the defined route to activity/page', () => {
            window.location.hash = "#/HelloWorld";
            try {
                application.runApplication();
            } catch(e: any){
                expect(e).toEqual(new Error('Cannot find the routes!'))
            }

            const errDisplayed = application.querySelector('p#err-no-routes');
            expect(errDisplayed.textContent).toEqual('No routes to #/HelloWorld');
        });

    });

    describe('Stack activity movement Test', () => {
        /**
         * This test will be performed
         * 
         * Move To Next Activity
         * Activity1 -> Activity2
         * 
         * Move to Previous
         * Activity1 ->  Activity2 -> Activity1
         * 
         * by pressing the button displayed by activity
         * 
         */

        it('can move into another activity/page (1)', (done) => {
            
            application.addEventListener('application:movenext:activity', () => {
                const currentPage = window.location.hash;

                switch(currentPage) {
                    case '': {
                        expect(activityOne.onCreated).toHaveBeenCalled();
                        activityOne.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity2Impl': {
                        expect(activityTwo.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityTwo.onResumed).toHaveBeenCalledTimes(1);
                        expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                        done();
                    }
                }
            });
            application.runApplication();

        });

        it('can back to the previous activity (1)', (done) => {
            
            application.addEventListener('application:movenext:activity', () => {
                const currentPage = window.location.hash;
                switch(currentPage) {
                    case '': {
                        activityOne.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity2Impl': {
                        expect(activityTwo.onCreated).toHaveBeenCalled();
                        activityTwo.querySelector('#back').dispatchEvent(new Event('click'));
                    }
                }
            });

            application.addEventListener('application:moveprev:activity', () => {
                expect(activityTwo.onDestroy).toHaveBeenCalled();
                expect(activityOne.onResumed).toHaveBeenCalledTimes(2);
                done();
            });
            application.runApplication();

        });

        /**
         * This test will be performed
         * 
         * Move To Next 2 Activity
         * Activity1 -> Activity2 -> Activity3
         * 
         * Move to Previous
         * Activity1 ->  Activity2 -> Activity3 -> Activity2 -> Activity1
         * 
         * by pressing the button displayed by activity
         * 
         */
        it('can move into another activity/page (2)', (done) => {
            
            application.addEventListener('application:movenext:activity', () => {
                const currentPage = window.location.hash;

                switch(currentPage) {
                    case '': {
                        expect(activityOne.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityOne.onResumed).toHaveBeenCalledTimes(1);
                        activityOne.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity2Impl': {
                        expect(activityTwo.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityTwo.onResumed).toHaveBeenCalledTimes(1);
                        expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                        activityTwo.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity3Impl': {
                        expect(activityThree.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityThree.onResumed).toHaveBeenCalledTimes(1);
                        expect(activityTwo.onPaused).toHaveBeenCalledTimes(1);
                        expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                        done();
                    }
                    break;
                }
            });
            application.runApplication();
        });

        it('can back into homepage activity/page', (done) => {

            application.addEventListener('application:movenext:activity', () => {
                const currentPage = window.location.hash;

                switch(currentPage) {
                    case '': {
                        expect(activityOne.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityOne.onResumed).toHaveBeenCalledTimes(1);
                        activityOne.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity2Impl': {
                        expect(activityTwo.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityTwo.onResumed).toHaveBeenCalledTimes(1);
                        expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                        activityTwo.querySelector('#next').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#/Activity3Impl': {
                        expect(activityThree.onCreated).toHaveBeenCalledTimes(1);
                        expect(activityThree.onResumed).toHaveBeenCalledTimes(1);
                        expect(activityTwo.onPaused).toHaveBeenCalledTimes(1);
                        expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                        activityThree.querySelector('#back').dispatchEvent(new Event('click'));
                    }
                }
            });

            application.addEventListener('application:moveprev:activity', () => {
                const currentPage = window.location.hash;
                switch(currentPage) {
                    case '#/Activity2Impl': {
                        expect(activityThree.onDestroy).toHaveBeenCalled();
                        expect(activityTwo.onResumed).toHaveBeenCalledTimes(2);
                        activityTwo.querySelector('#back').dispatchEvent(new Event('click'));
                    }
                    break;
                    case '#':
                    case '': {
                        expect(activityThree.onDestroy).toHaveBeenCalled();
                        expect(activityTwo.onDestroy).toHaveBeenCalled();
                        expect(activityOne.onResumed).toHaveBeenCalledTimes(2);
                        done();
                    }
                }
                
            });
            application.runApplication();
        });
    });

    describe('callback test', () => {

        it('onCreate() must be called when at first load activity and attached to element', () => {
            application.runApplication();

            expect(activityOne.onCreated).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('act-first');

            expect(application.querySelector('act-first')).not.toBe(null);
        });

        it('activity1 must be call onPaused when move to next activity', (done) => {
            let count = 0;
            application.addEventListener('application:movenext:activity', () => {
                if(++count < 2) return;
                expect(activityOne.onPaused).toHaveBeenCalledTimes(1);
                done();
            });

            application.runApplication();

            window.location.hash = "#/Activity2Impl";
            
        });

        it('activity2 must be call onDestroyed when move to previous activity', (done) => {

            let hasFirst = false;
            application.addEventListener('application:movenext:activity', function () {
                if(hasFirst)
                    window.location.hash = "#";
                else
                    hasFirst = true;
            });

            application.addEventListener('application:moveprev:activity', () => {
                expect(activityTwo.onDestroy).toHaveBeenCalled();
                done();
            });

            application.runApplication();

            window.location.hash = "#/Activity2Impl";
            
            
        });

        it('can back to root activity even no previously saved stack activities', (done) => {
            window.location.hash = "#/Activity2Impl";

            application.runApplication();

            window.location.href = "#";


            let count = 0;
            application.addEventListener('application:movenext:activity', () => {
                if(++count < 2) return;
                expect(activityOne.onResumed).toHaveBeenCalled();
                done();
            });
        });

        it('activity1 must be call onResumed and not calling onCreated again after back to activity1 from activity2', (done) => {
            application.runApplication();

            window.location.hash = "#/Activity2Impl";
            
            application.addEventListener('application:movenext:activity', () => {
                window.location.hash = "#";
            });

            application.addEventListener('application:moveprev:activity', () => {
                expect(activityOne.onResumed).toHaveBeenCalled();

                // called times must be one times, is because initiating activity on first load
                expect(activityOne.onCreated).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('onResizeEvent must be called when resizing the window size', (done) => {
            application.runApplication();

            dispatchEvent(new Event('resize'));

            application.addEventListener('application:resize:app', () => {

                expect(activityOne.onResizeEvent).toHaveBeenCalled();
                done();
            })
        });

        it('onScrollEvent must be called when scrolling the page', (done) => {
            application.runApplication();

            dispatchEvent(new Event('scroll'));

            application.addEventListener('application:scroll:app', () => {

                expect(activityOne.onScrollEvent).toHaveBeenCalled();
                done();
            })
        });
    });

});