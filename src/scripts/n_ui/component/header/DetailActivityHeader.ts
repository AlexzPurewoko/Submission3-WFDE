/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import "../../../../styles/n_sass/header/detail-header.sass";
import NavItemCallback from "../../../n_utils/callbacks/NavItemCallback";
class DetailActivityHeader extends HTMLElement {
    private _cb: NavItemCallback = null;

    // material-icon favorite toggle (<i>)
    private _favIcon: HTMLElement = null;

    set callback(c: NavItemCallback){
        this._cb = c;
    }

    set isFavorite(isFav: boolean){
        this._favIcon.innerText = isFav ? "favorite" : "favorite_border"
    }

    set isDisabled(disabled: boolean){
        if(!this._favIcon) return;
        const btn = this._favIcon.parentElement;

        if(disabled){
            if(!btn.getAttribute("disabled")){
                btn.setAttribute("disabled", "true");
            }
        } else {
            btn.removeAttribute("disabled")
        }
    }

    get isFavorite(): boolean {
        if(!this._favIcon) return false;
        return this._favIcon.innerText === "favorite";
    }

    render(): void {
        this.innerHTML =  `
            <button class="back-activity">
                <i class="material-icons">arrow_back</i>
            </button>

            <div class="logo_brand">
                <h1>Detail</h1>
                <h1>Resto</h1>
            </div>

            <button class="favorite">
                <i class="material-icons">favorite_border</i>
            </button>
        `;
        this.implementClicks();
        this.provideReference();
        
    }

    private onClick(elm: HTMLElement, ref: "favorite" | "back"){
        if(!this._cb) return;
        this._cb(elm, ref);
    }

    private provideReference() {
        this._favIcon = this.querySelector(".favorite > .material-icons");
    }

    private implementClicks() {
        this.querySelector(".back-activity").addEventListener("click", (e: Event) => {
            this.onClick(<HTMLElement> e.target, "back");
        });

        this.querySelector(".favorite").addEventListener("click", (e: Event) => {
            this.onClick(<HTMLElement> e.target, "favorite");
        });
    }
}
customElements.define("detail-header", DetailActivityHeader);
export default DetailActivityHeader;