// import "../../../../styles/n_sass/footer/home-footer.sass"
import NavItemCallback from "../../../utils/callbacks/NavItemCallback";


class HomeActivityFooter extends HTMLElement {

    private _cb: NavItemCallback = null;


    set callback(_nCb: NavItemCallback){
        this._cb = _nCb;
    }

    toggleActiveItem(target: string): void {
        // find the target
        const elmTarget = this.findElementTarget(target);
        // toggle active
        this.toggle(elmTarget);
    }

    render() : void{
        this.innerHTML = `
            <nav class="tab-left">
                <ul>
                    <li><a href="#" data-target="dashboard" class="material-icons item">home</a></li>
                    <li><a href="#" data-target="favorite" class="material-icons item">favorite</a></li>
                    <li><a href="#" data-target="about" class="material-icons item">info</a></li>
                </ul>
            </nav>
            <div class="tab-right">
                <p>Copyright @ 2020 APWDevs</p>
            </div>

        `;
        this.implementClick();
    }

    private findElementTarget(target: string): HTMLElement {
        let selected : HTMLElement = null;
        this.querySelectorAll("nav li").forEach((item: HTMLElement) => {
            const elm = item.children[0];
            if(elm.getAttribute("data-target") === target){
                selected = <HTMLElement>elm;
                return;
            }
        });

        return selected;
    }

    private implementClick() {
        const elm = this.querySelector("nav > ul");
        elm.addEventListener("click", (e: Event) => {
            const target = <HTMLElement> e.target;
            this.toggle(target);

            // resolving data
            const targetHref = target.getAttribute("data-target");
            this._cb(this, targetHref);
            e.preventDefault();
        });
    }

    private toggle(target: HTMLElement){
        const parentUl = target.parentElement.parentElement;
        this.switchOffAll(parentUl.children);

            // switch on
        target.classList.add("footer-nav-item-active");
        this._cb(this, target.getAttribute("data-target"));
        target.style.color = "rgb(72 4 4)";
    }

    private switchOffAll(childrens: HTMLCollection){
        for(let x=0; x < childrens.length; x++){
            const target = <HTMLElement> childrens[x].children[0];
            target.classList.remove("footer-nav-item-active");
            target.style.color = "";
        }
    }
}

customElements.define("home-footer", HomeActivityFooter);
export default HomeActivityFooter;
