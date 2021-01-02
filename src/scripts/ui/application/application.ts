/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import MainDatabase from "../../logic/db/MainDatabase";
import BaseActivity from "../activity/base/BaseActivity";
import { LifecycleCallback } from "./callback/LifecycleCallback";
import { ActivityInfo, AppManifest, appManifestImpl } from "./manifest/AppManifest";

/**
 * @interface BackStackProperty
 * @description
 * 
 * This interface is used to map the stack of activity
 * and make easier to manage.
 */
interface BackStackProperty {

    /**
     * @property 
     * 
     * Collects the current hashURI to be saved to stack
     * and used to retrieve back to the {@link window.location.hash}
     */
    hashURI: string,

    /**
     * @property
     * 
     * Save the current state of activity.
     */
    element: BaseActivity,

    /**
     * @property
     * 
     * Saved activity info. See (@see ActivityInfo) for details
     */
    activityInfo: ActivityInfo
}

/**
 * @class 
 * @classdesc
 * 
 * Control the main function on the webpage. 
 * Which is control and manage the page activity by watch {@see window.location.hash} changes
 * 
 * You can add page as many as you want by creating an activity
 * And declare the activity's configuration in AppManifest (@see AppManifest)
 * 
 * By default, appManifest is pointed to {@file ./manifest/AppManifest.ts}
 * But, you can specify your own configuration to your-defined manifest by setting property {@see MainApplication.manifest} 
 */
class MainApplication extends HTMLElement {

    private readonly _db : MainDatabase = null;
    private _manifest : AppManifest= appManifestImpl;

    private currentActivityInfo: ActivityInfo = null;
    private currentActivityRef: BaseActivity = null;
    private activityBackStack: BackStackProperty[] = [];
    private currentHash = ""

    private listenerReference = {
        hashChange: () => this.onHashChanged(),
        onResize: (e: Event) => this.onResizeCallback(e),
        onScroll: (e: Event) => this.onScrollChange(e)
    }
    
    constructor(){
        super();
        this._db = new MainDatabase();
    }

    /**
     * @property
     * @description
     * 
     * Sets the application manifest to your own defined
     * 
     * @param manifest Manifest Object, implement {@see AppManifest} interfaces
     */
    set manifest(manifest: AppManifest) {
        this._manifest = manifest; 
    }

    /**
     * @function runApplication()
     * @description
     * 
     * Run the Web Client Application. This should be run at the entry point
     * after DOMContentLoaded triggered. But, you must declare at HTML file on the body section :
     * 
     * @html
     * <!DOCTYPE html> 
     * <html>
     * <head> .... </head>
     * <body> 
     *      <application-main> </application-main>
     * </body
     * </html>
     * 
     * And on the TS entry point / Javascript
     * 
     * @typescript @javascript
     * document.addEventListener('DOMContentLoaded', () => {
     * 
     *      const mainApp = <MainApplication> document.querySelector('application-main');
     *      mainApp.runApplication();
     * });
     * 
     * Or, you can createElement of this application and add it to your body section
     */
    runApplication() : void {

        // hide the application error if any
        this.errorNoRoutes('hide');

        // we should check separately
        // if its empty, then start root/homepage.
        if(window.location.hash === "" || window.location.hash === "#"){
            const page = this._manifest.mode === "test" ? this._manifest.testPage : this._manifest.homepage;
            const homepageInfo = this._manifest.activities.get(page);
            this.moveToNextActivity(homepageInfo, null);
        } else {
            const hashGet = window.location.hash.slice(1);
            const urlParams = hashGet.split("/");

            if(!this._manifest.activities.has(urlParams[1])) {
                this.errorNoRoutes('display');
                throw Error('Cannot find the routes!');
            }
            
            const activityInfo = this._manifest.activities.get(urlParams[1]);
            const parameters = urlParams.slice(2, urlParams.length);

            this.moveToNextActivity(activityInfo, parameters);
        }
        // register the event action
        window.onhashchange = this.listenerReference.hashChange;
        window.onscroll = this.listenerReference.onScroll;
        window.onresize = this.listenerReference.onResize; 
    }

    /**
     * @function activityBack()
     * @description
     * 
     * Back to the last activity that stored in stack array
     * 
     * @returns true if activity successfully back to the previous, false if cannot find the last activity on stack
     */
    activityBack() : boolean {
        const lastElement = this.getBackStackLastElement();
        if(!lastElement) {
            return false;
        }
        window.location.hash = '#' + lastElement.hashURI;
        return true;
    }

    /**
     * @ignore 
     * @description
     * 
     * HTMLElement Callbacks
     * Triggered when this application is removed from DOM element 
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    disconnectedCallback(){
        this.activityBackStack = [];
        window.onhashchange = undefined;
        window.onscroll = undefined;
        window.onresize = undefined;
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * Display and hide the application base error
     * 
     * @param should 'display' the error or 'hide' the error
     */
    private errorNoRoutes(should: 'display' | 'hide') {
        if(should === 'hide') {
            const elm = this.querySelector("p#err-no-routes");
            if(elm) elm.remove();
        } else if(should === 'display'){
            this.innerHTML = '<p id="err-no-routes">No routes to '+window.location.hash;
        }
    } 

    /**
     * @function
     * @ignore
     * @description
     * 
     * Get the last element of back stack array
     * 
     * @returns last element of back stack property {@see BackStackProperty} or null if not found
     */
    private getBackStackLastElement(): BackStackProperty {
        if(this.activityBackStack.length < 1) return null;
        return this.activityBackStack[this.activityBackStack.length - 1];
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * Create an activity element for specified {@param activityInfo} 
     * 
     * @param activityInfo the activity configuration
     * 
     * @returns created activity
     */
    private createActivity(activityInfo: ActivityInfo): BaseActivity{
        const createdActivity = <BaseActivity> document.createElement(activityInfo.activityName);
        createdActivity.application = this;
        createdActivity.db = this._db;
        return createdActivity;
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * A helpers for attach activity to {@see MainApplication} element and start call {@see LifecycleCallback.onResumed}
     * to make the activity is running after created.
     * 
     * @param activity the created activity
     * @param activityInfo the activity infos
     * 
     */
    private applyActivity(activity: BaseActivity, activityInfo: ActivityInfo){
        this.currentActivityRef = activity;
        this.currentActivityInfo = activityInfo;

        this.innerHTML = '';
        this.append(activity);
        activity.onResumed();
        this.currentHash = window.location.hash.slice(1);
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * A helpers to perform back to last activity and destroy the current activity
     * and pop up the stack.
     * 
     */
    private backToLastActivity() {

        if(this.activityBackStack.length < 1) {
            return;
        }
        const currentStack = this.activityBackStack.pop();

        // destroy current activity
        this.currentActivityRef.onDestroy();

        this.applyActivity(currentStack.element, currentStack.activityInfo);

        this.dispatchEvent(new Event('application:moveprev:activity'));
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * A helper to move into next activity, usually triggered when OnHashChanged event occurs and
     * cannot find the history of key that stored in stack activity
     * 
     * @param activityInfo The activity configuration
     * @param params The parameters to start the activity.
     * 
     */
    private moveToNextActivity(activityInfo: ActivityInfo, params: any[]){
        const actCreated = this.createActivity(activityInfo);
        actCreated.onCreated(params);
        if(!activityInfo.isRootActivity && this.currentActivityRef !== null){

            // push the current activity to backstack
            this.pushToStack();

            // call onPause for current activity
            this.currentActivityRef.onPaused();

        } else {
            this.activityBackStack = [];
        }
        // apply created activity to show
        this.applyActivity(actCreated, activityInfo);
        this.dispatchEvent(new Event('application:movenext:activity'));
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * Push the current activity to the stack
     * 
     */
    private pushToStack() {
        const backStackProperty: BackStackProperty = {
            hashURI: this.currentHash,
            element: this.currentActivityRef,
            activityInfo: this.currentActivityInfo
        }
        this.activityBackStack.push(backStackProperty);
    }


    // event listener
    /**
     * @function
     * @ignore
     * @description
     * 
     * Forwards the scroll event change to the current running activity
     *
     * @param event the {@see Event} object
     */
    private onScrollChange(event: Event){
        const lifecycleCb = <LifecycleCallback> this.currentActivityRef;
        lifecycleCb.onScrollEvent(event);

        setTimeout(() => {
            this.dispatchEvent(new Event('application:scroll:app'));
        });
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * Forwards the resize event change to the current running activity
     *
     * @param event the {@see Event} object
     */
    private onResizeCallback(event: Event) {
        const lifecycleCb = <LifecycleCallback> this.currentActivityRef;
        lifecycleCb.onResizeEvent(event);

        setTimeout(() => {
            this.dispatchEvent(new Event('application:resize:app'));
        });
    }

    /**
     * @function
     * @ignore
     * @description
     * 
     * Intercept a hashchanged event and perform an activity decision. Which activity should be attached to element/resumend ?
     *
     * @param event the {@see Event} object
     */
    private onHashChanged() {
        const hash = window.location.hash.slice(1);
        const urlParts = hash.split("/");

        const lenBackStack = this.activityBackStack.length;
        const isFound = lenBackStack != 0 && this.activityBackStack.findIndex(item => item.hashURI === hash) === this.activityBackStack.length - 1;
        const activity = urlParts[1];

        // if is just back to the last activity, then it will 
        if(isFound){
            this.backToLastActivity();
        } else {

            // if its empty hash, then it just back to root activity/homepage
            if(hash === '' && lenBackStack < 1){
                const homepageInfo = this._manifest.activities.get(this._manifest.homepage);
                this.moveToNextActivity(homepageInfo, null);
                return;
            }
            // if its not back, then add it into stack...
            const parameters = urlParts.splice(2, urlParts.length);
            const getActivityInfo = this._manifest.activities.get(activity);
            
            this.moveToNextActivity(getActivityInfo, parameters);
        }
    }
}
customElements.define("application-main", MainApplication);
export default MainApplication;