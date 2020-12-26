import { IgnorePlugin } from "webpack";

const regexDisplayNone = /(display\s*:\s*none\s*(;)?)/;
const regexOpacity = /opacity\s*:\s*([0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*)\s*;/;
export const Util = {
    computeHeight: (elm: Element): number => {
        return parseFloat(getComputedStyle(elm, null).height.replace("px", ""))
    },
    hide: (elm: HTMLElement): void => {
        elm.style.display = 'none';
    },
    show: (elm: HTMLElement): void => {
        const styleAttrs = elm.getAttribute("style");
        if (styleAttrs != null) {
            const replaced = styleAttrs.replace(regexDisplayNone, "");
            elm.setAttribute("style", replaced);
        }
    },
    isVisible: (elm: HTMLElement, visibilityMode: boolean = false): boolean => {
        const computed = getComputedStyle(elm);
        console.log("display: " + computed.visibility);
        return !visibilityMode ? (computed.display !== 'none') : (computed.visibility === 'visible');
    },

    initProperty: (): void => {
        if (!Object.keys) Object.keys = function (o: any) {
            if (o !== Object(o))
                throw new TypeError('Object.keys called on a non-object');
            let k = [], p;
            for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
            return k;
        }
    },

    toCssText: (obj: any): string => {
        let str = "";
        const keys = Object.keys(obj);
        keys.forEach((key: string) => {
            const val = obj[key];
            str += `${key}: ${val};`;
        });
        return str;
    },

    fadeIn: (elm: HTMLElement, time: number): void => {
        const step = 1 / (time / 20);
        elm.style.opacity = "0";
        elm.style.display = "block";

        let opacity = 0;
        const runner = () => {
            opacity += step;
            elm.style.opacity = "" + opacity;
            if (opacity < 1) {
                setTimeout(runner, 20);
            } else {
                const a = elm.getAttribute("style");
                const b = a.replace(regexOpacity, "");
                elm.setAttribute("style", b);
            }
        };
        runner();
    },

    fadeOut: (elm: HTMLElement, time: number, after: () => void = null): void => {
        const step = 1 / (time / 20);
        elm.style.opacity = "1";
        elm.style.display = "block";

        let opacity = 1;
        const runner = () => {
            opacity -= step;
            elm.style.opacity = "" + opacity;
            if (opacity > 0) {
                setTimeout(runner, 20);
            } else {
                const a = elm.getAttribute("style");
                const b = a.replace(regexOpacity, "");
                elm.setAttribute("style", b);
                elm.style.display = "none";
                if (after) {
                    after();
                }
            }
        };
        runner();
    },

    slideUp: (target: HTMLElement, duration : number = 500): void => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        window.setTimeout( () => {
              target.style.display = 'none';
              target.style.removeProperty('height');
              target.style.removeProperty('padding-top');
              target.style.removeProperty('padding-bottom');
              target.style.removeProperty('margin-top');
              target.style.removeProperty('margin-bottom');
              target.style.removeProperty('overflow');
              target.style.removeProperty('transition-duration');
              target.style.removeProperty('transition-property');
        }, duration);
    },

    slideDown: (target: HTMLElement, duration: number = 500): void => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
        }, duration);
    },

    findMaxHeight: (elm: HTMLElement): number => {
        return parseInt(elm.style.maxHeight.replace("px", ""));
    }
}