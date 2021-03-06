/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import { IRestaurantItem } from "../../../logic/api/data/lists/IRestaurantItem";
import RestaurantItemClickCb from "../../../utils/callbacks/RestaurantItemClickCb";
import RestaurantItem from "../restaurant_item/RestaurantItem";

class RestaurantList extends HTMLElement {

    private _cb: RestaurantItemClickCb = null;
    private treshold = 500;
    private pos = 0;
    private step = 6;
    private lastScroll = 0;
    private data: IRestaurantItem[] = [];


    set onItemClick(cb: RestaurantItemClickCb) {
        this._cb = cb;
    }

    render(data: IRestaurantItem[]): void {
        this.innerHTML = '';
        this.pos = 0;
        this.data = data;
        this.renderPartial();
    }

    private applyRender(item: IRestaurantItem): void {
        const createdElement = <RestaurantItem>document.createElement("item-restaurant");
        createdElement.data = item;
        createdElement.onClick = (v: RestaurantItem, d: IRestaurantItem) => this._cb(v, d);
        createdElement.render();
        this.append(createdElement);
    }

    private renderPartial(): void {
        let pos = 0;
        while(this.pos < this.data.length && pos < this.step ){
            this.applyRender(this.data[this.pos]);
            pos++;
            this.pos++;
        }
    }

    checkScroll(): void  {
        const scroll = window.pageYOffset;
        
        if ((scroll - this.lastScroll) > 0 && scroll >= this.offsetHeight - this.treshold) {
            this.renderPartial();
        }
        this.lastScroll = scroll
    }
}

customElements.define("restaurant-list", RestaurantList);
export default RestaurantList;