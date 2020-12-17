import "regenerator-runtime"
import {skipWaiting, clientsClaim} from "workbox-core";
import {registerRoute} from "workbox-routing";
import {StaleWhileRevalidate, CacheFirst} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";
import {precacheAndRoute} from "workbox-precaching";

skipWaiting();
clientsClaim();

registerRoute(
    ({url}) => url.origin === "https://dicoding-restaurant-api.el.r.appspot.com",
    new StaleWhileRevalidate()
)

registerRoute(
    ({url}) => url.origin === "https://fonts.googleapis.com" || 
               url.origin === "https://fonts.gstatic.com",
    new StaleWhileRevalidate({
        cacheName: "google-fonts",
        plugins: [
            new ExpirationPlugin({maxEntries: 20})
        ]
    })
)

registerRoute(
    ({request}) => request.destination === "image",
    new CacheFirst({
        cacheName: "image-caches",
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 5
            })
        ]
    })
)

precacheAndRoute(self.__WB_MANIFEST);