// setup a template
const templateString = `<div>Hello World</div>`;

// setup a template element with our template
const template = document.createElement('template');
template.innerHTML = templateString;

export class BopsVsKitties extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

// configure a custom element for our game
window.customElements.define('bops-vs-kitties', BopsVsKitties);

// add it to the DOM
const bopsVsKitties = document.createElement('bops-vs-kitties');
document.body.append(bopsVsKitties);