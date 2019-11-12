import { BopsVsKitties } from './bops-vs-kitties/bops-vs-kitties.component';
import './app';

// Integration level tests
describe('App', () => {
    it('should define bps-vs-kitties custom element', () => {
        const bopsVsKittiesFromDOM = window.customElements.get('bops-vs-kitties');
        expect(bopsVsKittiesFromDOM).toEqual(BopsVsKitties);
    });
});