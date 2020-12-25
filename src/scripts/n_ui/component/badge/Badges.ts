import { ISingleName } from "../../../n_logic/api/data/detail/ISingleName";
import "../../../../styles/n_sass/badge/badges.sass"

export interface BadgeOptions {
    readonly color: string;
    readonly borderColor: string
    readonly bgColor: string;
}

class Badges extends HTMLElement {

    private _items: ISingleName[] = null;
    private _badgeOption: BadgeOptions = null;

    set item(items: ISingleName[]){
        this._items = items;

    }

    set options(badgeOption: BadgeOptions){
        this._badgeOption = badgeOption;
    }

    render() : void{
        let composedHtml = '<div>'

        this._items.map((item: ISingleName) => {
            return `
                <span class="badge-item">${item.name}</span>
            `;
            
        }).forEach ((composedElement: string) => {
            composedHtml += composedElement;
        });

        composedHtml += '</div>';

        this.innerHTML = composedHtml;
        this.implementBadgeOptions();
    }

    private implementBadgeOptions() {
        if(!this._badgeOption) return;
        
        this.querySelectorAll("span.badge-item").forEach((elm : HTMLElement) => {
            elm.style.color = this._badgeOption.color;
            elm.style.backgroundColor = this._badgeOption.bgColor;
            elm.style.borderColor = this._badgeOption.borderColor;
        })
    }
}

customElements.define("list-badge", Badges);
export default Badges;