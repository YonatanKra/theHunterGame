import { BopsVsKitties } from './app';
describe('App', () => {
    it('should define bps-vs-kitties custom element', () => {
        const bopsVsKittiesFromDOM = window.customElements.get('bops-vs-kitties');
        expect(bopsVsKittiesFromDOM).toEqual(BopsVsKitties);
    });
});