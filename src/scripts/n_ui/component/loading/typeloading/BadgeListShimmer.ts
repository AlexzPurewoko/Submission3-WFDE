/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export class BadgeListShimmer implements ShimmerViews {

    private views: HTMLElement = $(`
        <div class="br" style="display: flex; flex-wrap: wrap; padding: 5px; width: fit-content; margin-left: auto; margin-right: auto;justify-content: center">
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
            <div class="badges-shimmer animate" style="margin: 5px"></div>
        </div>
    `)[0];
    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }

}