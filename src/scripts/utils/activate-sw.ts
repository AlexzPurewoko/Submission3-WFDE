/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */

/**
 * @function
 * @description
 * 
 * Activate/Deactivate a service worker
 * 
 * @param activate true enable service worker, and false if disable it
 */

export const activateServiceWorker = (activate : boolean) : void => {
    if(!activate) return;

    const listener = () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => {
                console.log("Service Worker Successfully installed!");
                window.removeEventListener("load", listener);
            })
            .catch((e: any) => {
                console.error("Cannot install Service Worker: ", e);
                window.removeEventListener("load", listener);
            });
    }
    if("serviceWorker" in navigator){
        window.addEventListener("load", listener);
    } else {
        console.log("Your browser doesn't support Service Worker :(");
    }
}