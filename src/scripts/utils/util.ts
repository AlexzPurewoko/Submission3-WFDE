/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 * 
 */


/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// regex for matching 'display: none'
const regexDisplayNone = /(display\s*:\s*none\s*(;)?)/;

// regex for matching opacity CSS property
const regexOpacity = /opacity\s*:\s*([0-9]+[,.]?[0-9]*([/][0-9]+[,.]?[0-9]*)*)\s*;/;

/**
 * Provides a helper method for being used on another class
 */
export const Util = {

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().height().
     * Which get the rendered height of any html element.
     * 
     * @param elm the html element
     * 
     * @returns the floating point height in pixels
     */
    computeHeight: (elm: Element): number => {
        return parseFloat(getComputedStyle(elm, null).height.replace("px", ""))
    },

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().hide().
     * Which is hiding the html element from layout.
     * 
     * @param elm the html element
     * 
     * @returns 
     */
    hide: (elm: HTMLElement): void => {
        elm.style.display = 'none';
    },

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().show().
     * Which is showing the hiding of html element from layout.
     * 
     * @param elm the html element
     * 
     * @returns 
     */
    show: (elm: HTMLElement): void => {
        const styleAttrs = elm.getAttribute("style");
        if (styleAttrs != null) {
            const replaced = styleAttrs.replace(regexDisplayNone, "");
            elm.setAttribute("style", replaced);
        }
    },

    /**
     * @function
     * @description
     * 
     * Check existance of a HTML element in layout
     * 
     * @param elm the html element
     * @param visibilityMode if true it will watch on display property and otherwise is watching od visibility property
     * 
     * @returns true if visible or false if hidden
     */
    isVisible: (elm: HTMLElement, visibilityMode = false): boolean => {
        const computed = getComputedStyle(elm);
        return !visibilityMode ? (computed.display !== 'none') : (computed.visibility === 'visible');
    },

    /**
     * Must be called when initiating App..
     * You can add other confg here
     */
    initProperty: (): void => {
        if (!Object.keys) Object.keys = function (o: any) {
            if (o !== Object(o))
                throw new TypeError('Object.keys called on a non-object');
            const k = [];
            let p;
            for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
            return k;
        }
    },

    /**
     * @function
     * @description
     * 
     * Convert data object to plain text
     * 
     * @param obj the data object
     * 
     * @returns plain text object
     */
    toCssText: (obj: any): string => {
        let str = "";
        const keys = Object.keys(obj);
        keys.forEach((key: string) => {
            const val = obj[key];
            str += `${key}: ${val};`;
        });
        return str;
    },

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().slideUp().
     * Which is perform fading in the html element and show it
     * 
     * @param elm the html element
     * @param duration the operation duration in milliseconds. Default is 500 ms
     * 
     * @returns 
     */
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

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().fadeOut().
     * Which is perform fading out the html and hide.
     * 
     * @param elm the html element
     * @param duration the operation duration in milliseconds. Default is 500 ms
     * 
     * @returns 
     */
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

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().slideUp().
     * Which is perform slide up the html element and hide it
     * 
     * @param elm the html element
     * @param duration the operation duration in milliseconds. Default is 500 ms
     * 
     * @returns 
     */
    slideUp: (target: HTMLElement, duration = 500): void => {
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

    /**
     * @function
     * @description
     * 
     * As replacement from jquery, this is equal to $().slideDown().
     * Which is perform swipe the html element down and open.
     * 
     * @param elm the html element
     * @param duration the operation duration in milliseconds. Default is 500 ms
     * 
     * @returns 
     */
    slideDown: (target: HTMLElement, duration = 500): void => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        const height = target.offsetHeight;
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
    }
}