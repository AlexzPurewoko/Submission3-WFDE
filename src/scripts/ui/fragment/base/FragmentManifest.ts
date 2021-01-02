/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/**
 * @constant
 * 
 * A mapped string defined elements to help {@see FragmentAdapter} creates and select the fragment
 * by {@link querySelector}. So all of the fragments must defined in custom element registry {@link customElements.define}
 * 
 */
export const FragmentManifest: string[] = [
    "test-fragment",
    "about-fragment",
    "favorite-fragment",
    "dashboard-fragment"
];