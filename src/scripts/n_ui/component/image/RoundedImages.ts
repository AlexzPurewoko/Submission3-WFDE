import { toPlainObject } from "lodash";
import "../../../../styles/n_sass/images/rounded-images.sass";

export interface RImageAttrs {
    readonly attrs?: Record<string, unknown>;
    readonly css?: Record<string, unknown>;
    readonly useWebp?: boolean;
    readonly srcWebp?: string;
    readonly src: string;
    readonly alt: string;
}
class RoundedImages extends HTMLElement {
    
    private _imageAttrs: RImageAttrs = null;

    set properties(props: RImageAttrs){
        this._imageAttrs = props;
    }
    render(): void {
        if(!this._imageAttrs) return;

        const imgPath = this._imageAttrs.src;
        const alt = this._imageAttrs.alt;
        if(this._imageAttrs.useWebp){
            this.innerHTML = `
                <div>
                    <picture>
                        <source type="image/webp" srcset="${this._imageAttrs.srcWebp}">
                        <source type="image/jpeg" srcset="${this._imageAttrs.src}">
                        <img src="${this._imageAttrs.src}" alt="${this._imageAttrs.alt}">
                    </picture>
                </div>
            `;
        } else {
            this.innerHTML = `
                <div>
                    <img src="${imgPath}" alt="${alt}">
                </div>
            `;
        }
        
        
        this.implementAttrs();
    }

    private implementAttrs() {
        const imgObj = this.querySelector("img");
        if(this._imageAttrs.attrs)
            $(imgObj).attr(this._imageAttrs.attrs);
        if(this._imageAttrs.css){
            $(imgObj).css(toPlainObject(this._imageAttrs.css));
            $(imgObj.parentElement).css({
                "max-width": "unset",
                "width": "fit-content"
            })
        }

    }
}

customElements.define("rounded-images", RoundedImages);
export default RoundedImages;