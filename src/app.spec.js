import { BopsVsKitties } from './component/bops-vs-kitties.component';
import './app';

describe('App', () => {
    it('should define bps-vs-kitties custom element', () => {
        const bopsVsKittiesFromDOM = window.customElements.get('bops-vs-kitties');
        expect(bopsVsKittiesFromDOM).toEqual(BopsVsKitties);
    });
});