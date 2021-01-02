/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export class DescriptionShimmer implements ShimmerViews {
    
    private views: HTMLElement = (() => {
        const parent = document.createElement("div");
        parent.style.cssText = "justify-items: center;";
        parent.innerHTML = `
            <div class="comment animate" style="width: 70%; margin-left: auto; margin-right: auto;"></div>
            <div class="comment animate" style="width: 80%; margin-left: auto; margin-right: auto; margin-top: 10px"></div>
            <div class="comment animate" style="width: 85%; margin-left: auto; margin-right: auto; margin-top: 10px""></div>
            <div class="comment animate" style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 10px"></div>
            <div class="comment animate" style="width: 80%;margin-left: auto; margin-right: auto; margin-top: 10px""></div>
        `;
        return parent;
    })();
    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }

}