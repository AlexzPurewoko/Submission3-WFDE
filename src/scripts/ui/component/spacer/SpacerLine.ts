/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

export interface SpacerAttrs {
    readonly color: string;
    readonly style: 'vertical' | 'horizontal';
    readonly width: number;
    readonly height: number;
}
export default class SpacerLine extends HTMLElement {

    private _attrs: SpacerAttrs;

    set attrs(a: SpacerAttrs){
        this._attrs = a;
        this.render();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    connectedCallback() {
        this.render();
    }
    
    render(): void {
        if(!this._attrs) return;
        const {color, style, width, height} = this._attrs;
        const isHorizontal = style === 'horizontal';
        const whProps = `height: ${isHorizontal ? height : width}px; width: ${isHorizontal ? width: height}px;`;
        const bgColor = `background-color: ${color};`;
        const borderProps = `border-radius: ${(isHorizontal ? height: width) / 2}px;`;

        this.innerHTML = `
            <style>
                :host {
                    width: fit-content;
                    height: fit-content;
                }
            </style>
            <div 
                style="${whProps}${bgColor}${borderProps}border-style: unset;"
            ></div>
        `;
    }
}

customElements.define("spacer-line", SpacerLine);