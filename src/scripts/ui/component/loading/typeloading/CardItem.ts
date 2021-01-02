/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, {ShimmerViews} from "../ShimmerLoading";
export default class CardItem implements ShimmerViews {
    
    private views : HTMLElement = (() => {
        const parent = document.createElement("div");
        parent.classList.add("br");
        parent.innerHTML = `<div class="image-bg br animate"></div>`;
        return parent;
    })();
    
    getViews(_: ShimmerLoading): HTMLElement {
        return this.views;
    }

}