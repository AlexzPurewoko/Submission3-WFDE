/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class RatingIcons extends HTMLElement {
    private _rate = 0.0;
    private _isShow = false;

    set rate(rate: number) {
        this._rate = rate > 5 ? 5 : rate;
        this._updateAttrs();
    }

    get rate() {
        return this._rate;
    }

    toggleShow(): void{
        this._isShow = !this._isShow;
        this._updateAttrs();
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any): void {
        if(oldValue != newValue){
            if(name === 'rate'){
                const nValue = parseFloat(newValue);
                this._rate = (nValue > 5) ? 5 : nValue;
                console.log(this._rate);
            }
            if(name === 'show'){
                this._isShow = newValue === 'true' ? true : false;
            }
            this.render();
        }
    }

    static get observedAttributes() {
        return ['rate', 'show'];
    }

    private _updateAttrs() {
        this.setAttribute('rate', '' + this._rate);
        this.setAttribute('show', '' + this._isShow);
        this.render();
    }

    private render() {
        let content = "";
        const _p = Math.floor(this._rate * 10 % 10);
        const _f = Math.floor(this._rate);

        let _i = 0;
        for (; _i < _f; _i++){
            content+= '<i class="material-icons">star</i>';
        }
        // any half ?
        if(_f != 5) content += `<i class='material-icons'>${_p < 5 ? 'star_border' : 'star_half'}</i>`;
        // if less than 4, add more regular stars
        for(_i = 0; _i < 4 - _f; _i++){
            content+='<i class="material-icons">star_border</i>';
        }
        this.innerHTML = content;
    }
}
customElements.define("rating-component", RatingIcons);
export default RatingIcons;