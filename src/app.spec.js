import {HunterGame} from './the-hunter-game/the-hunter-game.component';
import './app';

// Integration level tests
describe('App', () => {
    it('should define hunter-game custom element', () => {
        const HunterGameFromDOM = window.customElements.get('hunter-game');
        expect(HunterGameFromDOM).toEqual(HunterGame);
    });

    afterAll(() => {
        const component = document.querySelector('hunter-game');
        document.body.removeChild(component);
    });
});
