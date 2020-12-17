/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import ShimmerLoading from "../component/loading/ShimmerLoading";
import { BadgeListShimmer } from "../component/loading/typeloading/BadgeListShimmer";
import BaseActivity from "./base/BaseActivity";
//import "../../../styles/sass/index.sass";

// schedule for composing homepage activities....

class TestActivity extends BaseActivity {

    onCreated(params: any[]): void {
        super.onCreated(params);
        this.innerHTML = this.renderPage();
        const data = <ShimmerLoading> this.querySelector("shimmer-loading");
        data.views = new BadgeListShimmer();

    }
    onPaused(): void {
        
    }
    onResumed(): void {
        
    }
    onDestroy(): void {
        
    }
    onResizeEvent(_event: Event): void {
        
    }
    onScrollEvent(_event: Event): void {
        
    }

    private renderPage(): string {
        return `
            <shimmer-loading></shimmer-loading>
        `;
    }

}
customElements.define("test-activity", TestActivity);