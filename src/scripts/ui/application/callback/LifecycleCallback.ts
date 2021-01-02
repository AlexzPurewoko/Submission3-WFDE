/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 * Callbacks 
 */

/**
 * @interface LifecycleCallback
 * @callback
 * @description
 * 
 * Provides a Lifecycle call for base activity 
 * And control mechanism to {@see MainApplication}
 * 
 */
export interface LifecycleCallback {

    /**
     * @function onCreated
     * @description
     * 
     * Called when activity is created at first time.
     * 
     * @param params the array of object or other primitive
     * @returns
     */
    onCreated(params: any[]): void

    /**
     * @function onPaused
     * @description
     * 
     * Called when activity is paused and currently hidden.
     * From this, the activity is currently on the stack
     * 
     * @returns
     */
    onPaused(): void

    /**
     * @function onResumed
     * @description
     * 
     * Called when activity is resumed, after created, or
     * back from onPaused state
     * 
     * @returns
     */
    onResumed(): void

    /**
     * @function onDestroy
     * @description
     * 
     * Called when activity is destroyed, because move to previous activity. 
     * So it will removed from stack
     * 
     * @returns
     */
    onDestroy(): void


    /**
     * @function onResizeEvent
     * @description
     * 
     * Called when any resize event occurs on the layout
     * 
     * @param event the returned event
     * @returns
     */
    onResizeEvent(event: Event): void


    /**
     * @function onScrollEvent
     * @description
     * 
     * Called when activity is destroyed, because move to previous activity. 
     * So it will removed from stack
     * 
     * @returns
     */
    onScrollEvent(event: Event): void
}