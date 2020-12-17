import "../../../../styles/n_sass/modal/modal.sass"

class ModalElement extends HTMLElement {
    private _content = ""; // the content of modal, written in html
    private _isShowUp = false;

    private _modal: HTMLElement = null;
    private _buttonClose: HTMLElement = null;

    private _onWindowCloseListener: (e: Event) => void

    set content(nContent: string){
        this._content = nContent;
    }

    get isShow(): boolean {
        return this._isShowUp;
    }

    toggleModal(): void{
        $(this._modal).fadeIn("fast");
        this._isShowUp = true;
    }
    render(): void {
        if(!this._content) throw new Error("You doesn't fill the modal content. please fill it!");
        this.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    ${this._content}
                    <div>
                        <button class="close-btn">CLOSE</button>
                    </div>
                </div>
            </div>
        `;

        this.initializeVariable();
        
        this._isShowUp = false;
    }

    private initializeVariable() {
        this._modal = this.querySelector("div.modal");
        this._buttonClose = this.querySelector("button.close-btn");

        if(this._onWindowCloseListener){
            window.removeEventListener("click", this._onWindowCloseListener);
            this._onWindowCloseListener = null
        }

        this._modal.onclick = (e: Event) => {
            if(e.target !== this._modal) return;
            this.closeModal();
        }

        this._buttonClose.onclick = () => {
            this.closeModal();
        }
    }

    private closeModal() {
        $(this._modal).fadeOut("fast");
        //this._modal.style.display = "none";
        this._isShowUp = false;
    }

}
customElements.define("modal-element", ModalElement);
export default ModalElement;