import "../../../../styles/n_sass/detail/detail-summary.sass";
import { IDetailRestaurantItem } from "../../../n_logic/api/data/detail/IDetailRestaurantItem";
import { ISingleName } from "../../../n_logic/api/data/detail/ISingleName";
import Badges from "../badge/Badges";
class DetailSummary extends HTMLElement {
    
    private _itemDetail: IDetailRestaurantItem = null;

    set data(d: IDetailRestaurantItem) {
        this._itemDetail = d;
        
    }
    render(): void {

        const {name, rating, address, city, categories} = this._itemDetail;
        this.innerHTML = `
            <div>
                <h1>${name}</h1>
                <div class="ratings">
                    <rating-component show="true" rate="${rating}"></rating-component>
                    <p>(${rating})</p>
                </div>
                <list-badge></list-badge>
                <p><span class="material-icons">location_on</span>${address}, ${city}</p>
            </div>
        `;

        this.addBadges(categories);
    }

    private addBadges(categories: ISingleName[]){
        const elm : Badges = this.querySelector("list-badge");
        elm.options = {
            color: "white",
            bgColor: "red",
            borderColor: "red"
        };
        elm.item = categories;
        elm.render();
    }
}
customElements.define("detail-summary", DetailSummary);
export default DetailSummary;