/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import "../../../../styles/n_sass/header/home-header.sass";
import NavItemCallback from "../../../utils/callbacks/NavItemCallback";

class HomeActivityHeader extends HTMLElement {
    
    private _cb?: NavItemCallback = null;

    set callback(nCallback: NavItemCallback){
        this._cb = nCallback;
    }

    toggleActiveItem(target: string) {
        // find the target
        const elmTarget = this.findElementTarget(target);
        // toggle active
        this.toggle(elmTarget);
    }
    
    render(): void {
        this.innerHTML = `
            <div class='container__logo' >
                <input 
                    type="image" 
                    src="/images/icons/restaurant-icon.svg"
                    tabindex="0" 
                    name="saveForm" 
                    aria-label="Logo FavResto"
                    onclick='window.location.href="#"'
                    id="logo"/>
            </div>
            <div class='logo_brand' tabIndex="0" role='banner' aria-label="FavResto site">
                <h1 class='logo_brand_title_1'>Fav</h1>
                <h1 class='logo_brand_title_2'>Resto</h1>
            </div>
            <div class='nav-wrapper'>
                <nav class='nav_drawer' id='nav'>
                    <ul class='nav_list'>
                        <li class='nav_item'><a href="dashboard" class="item">Home</a></li>
                        <li class='nav_item'><a href="favorite" class="item">Favorite</a></li>
                        <li class='nav_item'><a href="about" class="item">About Us</a></li>
                    </ul>
                </nav>
            </div>
        `;

        this.implementNavItemClicks();
    }

    private findElementTarget(target: string): HTMLElement {
        let selected : HTMLElement = null;
        this.querySelectorAll("nav li").forEach((item: HTMLElement) => {
            const elm = item.children[0];
            if(elm.getAttribute("href") === target){
                selected = <HTMLElement>elm;
                return;
            }
        });
        return selected;
    }

    private implementNavItemClicks() {
        const elm = this.querySelector(".nav_list");
        elm.addEventListener("click", (e: Event) => {
            this.toggle(<HTMLElement> e.target);


            const anchor = <HTMLElement> e.target;
            this.sendCallbackClickItem(anchor.getAttribute("href"));
            e.preventDefault();
        });
    }

    private toggle(target: HTMLElement){
        const parentUl = target.parentElement.parentElement;
        this.switchOffAll(parentUl.children);

            // switch on
        target.classList.add("active");
    }

    private sendCallbackClickItem(content: string){
        this._cb(this, content);
    }


    private switchOffAll(childrens: HTMLCollection){
        for(let x=0; x < childrens.length; x++){
            const target = <HTMLElement> childrens[x].children[0];
            target.classList.remove("active");
        }
    }
}

customElements.define("home-header", HomeActivityHeader);
export default HomeActivityHeader;