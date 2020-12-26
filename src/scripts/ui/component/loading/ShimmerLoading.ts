// import "../../../../styles/n_sass/loading/shimmer-loading.sass";
import { Util } from "../../../utils/util";
export interface ShimmerViews {
    getViews(container: ShimmerLoading) : HTMLElement
}

class ShimmerLoading extends HTMLElement {
    
    private _views : ShimmerViews = null;
    set views(v: ShimmerViews) {
        if(this._views){
            this.destroy()

        }
        this._views = v;
        this.render();
    }
    
    show(): void {
        if(!this._views) return;

        Util.show(this);
    }

    pause(): void {
        Util.hide(this);
    }

    destroy(): void {
        this.removeChild(this._views.getViews(this));
        this._views = null;
    }

    private render() {
       this.innerHTML = '';
       this.append(this._views.getViews(this));
    }
}
customElements.define("shimmer-loading", ShimmerLoading);
export default ShimmerLoading;