/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, { ShimmerViews } from "../ShimmerLoading";

export default class DetailSummaryShimmer implements ShimmerViews {
    private views: HTMLElement = (() => {
        const parent = document.createElement("div");
        parent.classList.add("summary-container");
        parent.innerHTML = `
            <div class="summary-image br">
                <div class="image-bg br animate"></div>
            </div>

            <div class="summary-detail">
                <div class="title animate" style="width: 140px;"></div>
                <div style="display:flex;width: fit-content;">
                    <div class="comment animate" style="width: 70px"></div>
                    <div class="comment animate" style="margin-left: 10px;width: 20px"></div>
                </div>
                <div style="display:flex;width: fit-content;">
                    <div class="badges-shimmer animate"></div>
                    <div class="badges-shimmer animate" style="margin-left: 10px;"></div>
                </div>
                <div class="comment animate w80"></div>
            </div>
        `;
        return parent;
    })();
    getViews(container: ShimmerLoading): HTMLElement {
        return this.views;
    }
    
}