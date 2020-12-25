import { AddReviewCallback } from "../../../n_utils/callbacks/AddReviewCallback";
import { Button, InputText } from "../../../n_utils/element_types";
import "../../../../styles/n_sass/review/post-review-consumer.sass";
import * as autosize from "autosize";
import { IPostReview } from "../../../n_logic/api/data/review/IPostReview";

class AddReview extends HTMLElement {
    private _restId: string = null;
    private _username: InputText = null
    private _btnSubmit: Button = null;
    private _textArea: HTMLElement = null
    private _sendCallback: AddReviewCallback = null;

    set onSubmit(cb: AddReviewCallback){
        this._sendCallback = cb;
    }

    set restaurantId(restId: string){
        this._restId = restId;
    }

    render(): void {
        
        this.innerHTML = `
            <div class="compose-container">
                <!-- row 1 --> 
                <div>
                    <span class="material-icons">person_pin</span>
                </div>

                <div>
                    <input aria-label="Type your username" type="text" name="username" class="compose-username" placeholder="Name">
                    <textarea aria-label="Type your reviews" class="compose-body" name="message" placeholder="Put your review message here..."></textarea> 
                    <div>
                        <button class="review-submit"><i class="material-icons">chevron_right</i></button>
                    </div>
                </div>
            </div>
        `;

        this._textArea = this.querySelector(".compose-container .compose-body");
        this._btnSubmit = this.querySelector(".compose-container .review-submit");
        this._username = this.querySelector(".compose-container .compose-username");
        autosize(this._textArea);
        this._implementSubmit();
    }

    private _implementSubmit() {
        if(!this._restId || !this._sendCallback) return;
        this._btnSubmit.onclick = () => {
            const value = (<HTMLTextAreaElement> this._textArea).value;
            const username = (<HTMLInputElement> this._username).value;
            if(value && username){
                const compose :IPostReview = {
                    id: this._restId,
                    name: username,
                    review: value
                }
                this._sendCallback(compose);
            }
        }
    }
}
customElements.define("compose-review", AddReview);
export default AddReview;