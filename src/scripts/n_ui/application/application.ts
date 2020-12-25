import "../../../styles/n_sass/main/main.sass";

import MainDatabase from "../../n_logic/db/MainDatabase";
import BaseActivity from "../activity/base/BaseActivity";
import { LifecycleCallback } from "./callback/LifecycleCallback";
import { ActivityInfo, AppManifest } from "./manifest/AppManifest";

interface BackStackProperty {
    hashURI: string,
    element: BaseActivity,
    activityInfo: ActivityInfo
}

class MainApplication extends HTMLElement {

    private readonly _db : MainDatabase = null;
    private readonly _manifest = AppManifest;

    private currentActivityInfo: ActivityInfo = null;
    private currentActivityRef: BaseActivity = null;
    private activityBackStack: BackStackProperty[] = [];
    private currentHash = ""

    private hasScrollLocked = false;
    private hasResizeLocked = false;

    private listenerReference = {
        hashChange: () => this.onHashChanged(),
        onResize: (e: Event) => this.onResizeCallback(e),
        onScroll: (e: Event) => this.onScrollChange(e)
    }
    
    constructor(){
        super();
        this._db = new MainDatabase();
    }

    runApplication() : void {
        
        // we should check separately
        // if its empty, then start root/homepage.
        
        if(window.location.hash === "" || window.location.hash === "#"){
            const page = this._manifest.mode === "test" ? this._manifest.testPage : this._manifest.homepage;
            const homepageInfo = this._manifest.activities.get(page);
            this.moveToNextActivity(homepageInfo, null);
        } else {
            const hashGet = window.location.hash.slice(1);
            const urlParams = hashGet.split("/");

            const activityInfo = this._manifest.activities.get(urlParams[1]);
            const parameters = urlParams.slice(2, urlParams.length);

            this.moveToNextActivity(activityInfo, parameters);
        }
        // register the event action
        window.onhashchange = this.listenerReference.hashChange;
        window.onscroll = this.listenerReference.onScroll;
        window.onresize = this.listenerReference.onResize; 
    }

    // Preferred only for activity instance to ensures that they 
    // can move to previous activity
    activityBack() : void {
        const lastElement = this.getBackStackLastElement();
        if(!lastElement) {
            return;
        }
        window.location.hash = '#' + lastElement.hashURI;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    disconnectedCallback(){
        this.activityBackStack = [];
        window.onhashchange = undefined;
        window.onscroll = undefined;
        window.onresize = undefined;
    }

    private getBackStackLastElement(): BackStackProperty {
        if(this.activityBackStack.length < 1) return null;
        return this.activityBackStack[this.activityBackStack.length - 1];
    }

    private createActivity(activityInfo: ActivityInfo): BaseActivity{
        const createdActivity = <BaseActivity> document.createElement(activityInfo.activityName);
        createdActivity.application = this;
        createdActivity.db = this._db;
        return createdActivity;
    }

    private applyActivity(activity: BaseActivity, activityInfo: ActivityInfo){
        this.currentActivityRef = activity;
        this.currentActivityInfo = activityInfo;

        this.innerHTML = '';
        this.append(activity);
        activity.onResumed();
        this.currentHash = window.location.hash.slice(1);
    }

    private backToLastActivity() {

        if(this.activityBackStack.length < 1) {
            return;
        }
        const currentStack = this.activityBackStack.pop();

        // destroy current activity
        this.currentActivityRef.onDestroy();

        this.applyActivity(currentStack.element, currentStack.activityInfo);
    }

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
    }

    private pushToStack() {
        const backStackProperty: BackStackProperty = {
            hashURI: this.currentHash,
            element: this.currentActivityRef,
            activityInfo: this.currentActivityInfo
        }
        this.activityBackStack.push(backStackProperty);
    }


    // event listener

    private onScrollChange(event: Event){
        if(!this.currentActivityRef && this.hasScrollLocked) return;
        const lifecycleCb = <LifecycleCallback> this.currentActivityRef;
        lifecycleCb.onScrollEvent(event);
        this.hasScrollLocked = true;
        setTimeout(() => {
            this.hasScrollLocked = false;
        }, 600);
    }
    private onResizeCallback(event: Event) {
        if(!this.currentActivityRef && this.hasResizeLocked) return;
        const lifecycleCb = <LifecycleCallback> this.currentActivityRef;
        lifecycleCb.onResizeEvent(event);
        this.hasResizeLocked = true;
        setTimeout(() => {
            this.hasResizeLocked = false;
        }, 600);
    }

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
            // if its not back, then add it into stack...
            const parameters = urlParts.splice(2, urlParts.length);
            const getActivityInfo = this._manifest.activities.get(activity);
            
            this.moveToNextActivity(getActivityInfo, parameters);
        }
    }
}
customElements.define("application-main", MainApplication);
export default MainApplication;