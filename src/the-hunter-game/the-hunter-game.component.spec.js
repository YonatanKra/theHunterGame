import * as template from './bops-vs-kitties.component.html';
import { BopsVsKitties } from './bops-vs-kitties.component';
window.customElements.define('bops-vs-kitties-spec', BopsVsKitties);

describe('Bops VS Kitties', () => {
    let component;
    beforeEach(() => {
        component = new BopsVsKitties();
    });
    describe('init', () => {

    });
});