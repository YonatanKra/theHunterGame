import { BopsVsKitties } from './component/bops-vs-kitties.component';

// configure a custom element for our game
window.customElements.define('bops-vs-kitties', BopsVsKitties);

// add it to the DOM
const bopsVsKitties = document.createElement('bops-vs-kitties');
document.body.append(bopsVsKitties);