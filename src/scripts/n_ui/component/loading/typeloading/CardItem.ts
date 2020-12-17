/* eslint-disable @typescript-eslint/no-unused-vars */
import ShimmerLoading, {ShimmerViews} from "../ShimmerLoading";
export default class CardItem implements ShimmerViews {
    
    private views : HTMLElement = $(`
        <div class="br">
            <div class="image-bg br animate"></div>
        </div>
    `)[0];
    getViews(_: ShimmerLoading): HTMLElement {
        return this.views;
    }

}