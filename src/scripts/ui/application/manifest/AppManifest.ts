/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/**
 * @interface ActivityInfo
 * @description
 * 
 * Stores the activity configuration 
 */
interface ActivityInfo {

    /**
     * @property
     * @description
     * 
     * The name of activity's element that have been registered with {@see customElements.define()}
     * This property provides {@see MainApplication} to automate create the selected activity
     * by creating element with {@see document.createElement()}
     * 
     * @type string
     */
    readonly activityName: string,

    /**
     * @property
     * @description
     * 
     * Defines that this activity is Root or not, you must define just one activity to be flagged as Root
     * and other is Child Activity. This is special, because this activity will be loaded 
     * if no hash query entered {@link '' | '#'}, so it's called when :
     *      1. First enter to the site {@see https://www.example.com/}
     *      2. Or manual by setting {@link ''| '#'} on the {@see window.location.hash} objects
     * 
     */
    readonly isRootActivity: boolean,

    /**
     * @property
     * @description
     * 
     * Defines the URL to be used by MainApplication to trigger the Activity
     * By idetifies the path of hash URL, you can see this template :
     * 
     * /{Activity keys}/{params}
     * 
     * Description:
     * 
     * {Activity keys } -> Activities are mapped by object Map<string, ActivityInfo> (@see AppManifest.activities)
     *                     So, you must define this {Activity keys} to be same as Map keys referred to value of {@see ActivityInfo}
     *                     If your key is 'ActivityOne' {@see AppManifest.activities} then its value must be '/ActivityOne'
     *                     
     *                     This is preferred because {@link MainApplication} will select the first Hash URI path to match with
     *                     {@see AppManifest.activities} keys.
     *                     
     * {params}         -> This value be used as configuration of activities when they are created and called on callbacks {@see LifecycleCallback.onCreated}
     *                     by the array of {@type any}. There are no specific configuration, and depends on the activity for what they are used for.
     * 
     *                     Example:
     *                                      /ActivityOne/mainFragment/id=99900/details
     *                      
     *                     Will be mapped as :
     *                     param: any[] = ['mainFragment', 'id=99900', 'details'] open on activity 'ActivityOne'
     * 
     *                     So, in ActivityOne, you can retrieve the value to be used as parameters of starting your Activity in onCreated
     *                     This will be called once, so prefer to save in another field.
     */
    readonly urlBase: string // string must contains the key of activity
}

/**
 * @interface ActivityInfo
 * @description
 * 
 * Stores the Application Configuration. It will be used by {@link MainApplication} 
 */
interface AppManifest {

    /**
     * @property
     * @description
     * 
     * Defines the key of the Activity to be used as main homepage. This key must match with {@see AppManifest.activities} key
     * 
     */
    homepage: string; 

    /**
     * @property
     * @description
     * 
     * The mode of running application its value is must to be another of 'normal' | 'test'
     */
    mode: 'normal' | 'test'; 

    /**
     * @property
     * @description
     * 
     * The starting page of Test Activity, but you must toggle the {@see AppManifest.mode} to be 'test'
     * It can be a good idea to separate between the test and main activity. So you can try a code in test
     * activity and implement later as you ready.
     * 
     */
    testPage: string; 

    /**
     * @property
     * @description
     * 
     * The map of configuration activity the key {@type string} must match to first path of {@see ActivityInfo.urlBase}
     * to make {@link MainApplication} undestands to select by key
     */
    activities: Map<string, ActivityInfo>; 
}

/**
 * @field 
 * @description
 * 
 * A default configuration of AppManifest, you can store the activity as many as you want
 * And this will make it centralized controller enough for {@link MainApplication}
 */
const appManifestImpl: AppManifest = {
    homepage: "HomeActivity",
    mode: "normal", // [ test | normal ]
    testPage: "none",
    activities: new Map<string, ActivityInfo>([
        ["HomeActivity", {
            activityName: "home-activity",
            isRootActivity: true,
            urlBase: "/HomeActivity"
        }],

        ["DetailActivity", {
            activityName: "detail-activity",
            isRootActivity: false,
            urlBase: "/DetailActivity/{id}/{fromFavorite | empty }"
        }],
    ])
} 

export {ActivityInfo, AppManifest, appManifestImpl};