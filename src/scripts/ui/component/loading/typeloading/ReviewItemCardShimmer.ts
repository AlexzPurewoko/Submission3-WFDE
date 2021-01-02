/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export class ReviewItemCardShimmer implements ShimmerViews {
    
    private views: HTMLElement = (() => {
        const parent = document.createElement("div");
        parent.classList.add("card", "br");
        parent.style.cssText = "margin: 10px;padding: 10px;display:grid;grid-template-columns: 40px auto;";
        parent.innerHTML = `
            <div class="profilePic animate" style="width: 30px; height: 30px;"></div>
            <div>
                <div class="title animate" style="margin-top: unset"></div>
                <div class="comment animate" style="width: 55px;margin-top: 10px;"></div>
                <div class="comment animate w80"></div>
            </div>
        `;
        return parent;
    })();

    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }

}