/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export class BadgeListShimmer implements ShimmerViews {

    private views: HTMLElement = (() => {
        const parent = document.createElement("div");
        parent.classList.add("br");
        parent.style.cssText = "display: flex; flex-wrap: wrap; padding: 5px; width: fit-content; margin-left: auto; margin-right: auto;justify-content: center";

        parent.innerHTML = `
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
        `;
        return parent;
    })();
    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }

}