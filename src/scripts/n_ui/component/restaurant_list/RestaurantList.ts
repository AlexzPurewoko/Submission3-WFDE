import { IRestaurantItem } from "../../../n_logic/api/data/lists/IRestaurantItem";
import RestaurantItemClickCb from "../../../n_utils/callbacks/RestaurantItemClickCb";
import RestaurantItem from "../restaurant_item/RestaurantItem";
import "../../../../styles/n_sass/restaurant_data/lists.sass";

class RestaurantList extends HTMLElement {

    private _cb: RestaurantItemClickCb = null;

    set onItemClick(cb: RestaurantItemClickCb){
        this._cb = cb;
    }

    render(data: IRestaurantItem[]): void {
        this.innerHTML = '';
        data.forEach((itemValue: IRestaurantItem) => {
            const createdElement = <RestaurantItem> document.createElement("item-restaurant");
            createdElement.data = itemValue;
            createdElement.onClick = (v: RestaurantItem, d: IRestaurantItem) => this._cb(v, d);
            createdElement.render();

            this.append(createdElement);
        });
    }
}

customElements.define("restaurant-list", RestaurantList);
export default RestaurantList;