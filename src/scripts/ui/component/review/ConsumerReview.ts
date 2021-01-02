/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import { ICustomerReview } from "../../../logic/api/data/detail/ICustomerReview";

class ConsumerReview extends HTMLElement {

    private _data: ICustomerReview = null;

    set data(nData: ICustomerReview){
        this._data = nData;
        this.render();
    }
    render(): void {
        if(!this._data) return;
        this.innerHTML = `
            <div class="review-container">
                <div>
                    <span class="material-icons">person_pin</span>
                </div>
                <div>
                    <div class="title-review">
                        <h2>${this._data.name}</h2>
                        <p>${this._data.date}</p>
                    </div>
                    <div class="content-review">
                        <p>${this._data.review ? this._data.review : "No reviews available."}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("review-item-consumer", ConsumerReview);
export default ConsumerReview;