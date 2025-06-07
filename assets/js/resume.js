export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.get(0);
        return this;
    }

    each(func) {
        if (!this.elements.length) {
            return this;
        }
        this.elements.forEach((el, index) => {
            func.call(el, el, index);
        });
        return this;
    }
    find(selector) {
        return new Utils(Utils.getSelector(selector, this.element));
    }
    attr(name, value) {
        if (value === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.getAttribute(name);
        }
        this.each((el) => {
            el.setAttribute(name, value);
        });
        return this;
    }
    css(css, value) {
        if (value !== undefined) {
            this.each((el) => {
                Utils.setCss(el, css, value);
            });
            return this;
        }
        if (typeof css === 'object') {
            for (const property in css) {
                if (Object.prototype.hasOwnProperty.call(css, property)) {
                    this.each((el) => {
                        Utils.setCss(el, property, css[property]);
                    });
                }
            }
            return this;
        }
        const cssProp = Utils.camelCase(css);
        const property = Utils.styleSupport(cssProp);
        return getComputedStyle(this.element)[property];
    }
    children() {
        return new Utils(this.element.children);
    }
    data(name, value) {
        return this.attr('data-' + name, value);
    }
    parent() {
        return new Utils(this.element.parentElement);
    }
    siblings() {
        if (!this.element) {
            return this;
        }
        const elements = Array.prototype.filter.call(
            this.element.parentNode.children,
            (child) => child !== this.element,
        );
        return new Utils(elements);
    }
    text(text) {
        if (text === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.textContent;
        }
        this.each((el) => {
            el.textContent = text;
        });
        return this;
    }
    static getSelector(selector, context) {
        if (selector && typeof selector !== 'string') {
            if (selector.length !== undefined) {
                return selector;
            }
            return [selector];
        }
        context = context || document;

        // For performance reasons, use getElementById
        // eslint-disable-next-line no-control-regex
        const idRegex = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        if (idRegex.test(selector)) {
            const el = document.getElementById(selector.substring(1));
            return el ? [el] : [];
        }
        return [].slice.call(context.querySelectorAll(selector) || []);
    }
    get(index) {
        if (index !== undefined) {
            return this.elements[index];
        }
        return this.elements;
    }
    static setCss(el, prop, value) {
        // prettier-ignore
        let cssProperty = Utils.camelCase(prop);
        cssProperty = Utils.styleSupport(cssProperty);
        el.style[cssProperty] = value;
    }
    static camelCase(text) {
        return text.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
    }
    static styleSupport(prop) {
        let vendorProp;
        let supportedProp;
        const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);
        const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        let div = document.createElement('div');

        if (prop in div.style) {
            supportedProp = prop;
        } else {
            for (let i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }

        div = null;
        return supportedProp;
    }
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
