export function isHidden (el: HTMLElement) {
    return el.offsetWidth === 0 && el.offsetHeight === 0;
}