import ShimmerLoading from "../../../component/loading/ShimmerLoading";
import CardItem from "../../../component/loading/typeloading/CardItem";

export const generateShimmerLoading = (shimmer: HTMLElement): void => {
    const shimmers : ShimmerLoading[] = [];
    for(let x = 0; x < 6; x++){
        const shimmLoading = <ShimmerLoading> document.createElement("shimmer-loading");
        shimmLoading.views = new CardItem();
        shimmers.push(shimmLoading);
    }
    $(shimmer).append(shimmers);
}