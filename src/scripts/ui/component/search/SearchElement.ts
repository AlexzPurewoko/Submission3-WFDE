import { Button, InputText } from "../../../utils/element_types";
// import "../../../../styles/n_sass/search/search.sass";
import SearchElementCb from "../../../utils/callbacks/SearchElementCb";
class SearchElement extends HTMLElement {

    private _btnSearch: Button = null;
    private _edtText: InputText = null;

    private _cb : SearchElementCb = null;
    private _hasRender = false;

    set searchCallback(callback: SearchElementCb){
        this._cb = callback;
        if(this._hasRender){
            this.initializeElement();
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    connectedCallback() {
        this.render();
        this._hasRender = true;
    }

    render(): void {
        this.innerHTML = `
            <div class="search-container">
                <div class="search-icons">
                    <span id="icon-search" class="material-icons">search</span>
                </div>
                <input id="search" type="text" name="search" class="search-input" aria-labelledBy="icon-search" placeholder="Search any....">
                <button class="submit"><i class="material-icons">chevron_right</i></button>
            </div>
        `;
        this.initializeElement();
    }

    initializeElement(): void {
        this._edtText = this.querySelector(".search-input");
        this._btnSearch = this.querySelector(".submit");

        this._btnSearch.onclick = () => {
            const retValue = (<HTMLInputElement> this._edtText).value;
            if(this._cb)
            this._cb(retValue)
        }
    }
}
customElements.define("search-box", SearchElement);
export default SearchElement;