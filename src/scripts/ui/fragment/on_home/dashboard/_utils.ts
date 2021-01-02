/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import ShimmerLoading from "../../../component/loading/ShimmerLoading";
import CardItem from "../../../component/loading/typeloading/CardItem";

export const generateShimmerLoading = (shimmer: HTMLElement): void => {
    for(let x = 0; x < 6; x++){
        const shimmLoading = <ShimmerLoading> document.createElement("shimmer-loading");
        shimmLoading.views = new CardItem();
        shimmer.append(shimmLoading);
    }
}