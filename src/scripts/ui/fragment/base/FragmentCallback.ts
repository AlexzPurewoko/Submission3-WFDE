/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/**
 * @interface @callback
 * @description
 * 
 * Provide a general callback for make a fragment possible to send their message into activity or its parent fragment
 * 
 */
export interface FragmentCallback {

    /**
     * @function onReceive
     * @description
     * 
     * Called when the fragment sends a message
     * 
     * @param key a key to define the type of messages
     * @param value a value messages
     */
    onReceive(key: string, value: any): void
}