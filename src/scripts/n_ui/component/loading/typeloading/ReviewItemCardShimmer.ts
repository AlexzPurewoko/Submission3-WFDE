/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export class ReviewItemCardShimmer implements ShimmerViews {
    
    private views: HTMLElement = $(`
        <div class="card br" style="margin: 10px;padding: 10px;display:grid;grid-template-columns: 40px auto;">
            <div class="profilePic animate" style="width: 30px; height: 30px;"></div>
            <div>
                <div class="title animate" style="margin-top: unset"></div>
                <div class="comment animate" style="width: 55px;margin-top: 10px;"></div>
                <div class="comment animate w80"></div>
            </div>
        </div>
    `)[0];
    
    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }

}