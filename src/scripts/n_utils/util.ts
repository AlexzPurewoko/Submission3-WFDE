export const Util = {
    computeHeight: (elm: Element): number => {
        return parseFloat(getComputedStyle(elm, null).height.replace("px", ""))
    }
}