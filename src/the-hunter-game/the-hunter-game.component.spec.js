import * as template from './the-hunter-game.component.html';
import {HunterGame} from './the-hunter-game.component';
import {StateManager} from "./state/manager";

window.customElements.define('hunter-game-spec', HunterGame);

fdescribe('Hunter Game', () => {
    let component;
    beforeAll(() => {
        const elements = document.querySelectorAll('hunter-game');
        elements.forEach(game => {
            document.body.removeChild(game);
        });
    });

    beforeEach(() => {
        component = document.createElement('hunter-game-spec');
        document.body.appendChild(component);
    });

    afterEach(() => {
        document.body.removeChild(component);
    });

    describe('init', () => {
        it(`should set the template in the shadowRoot`, () => {
            const element = document.createElement('div');
            element.innerHTML = template;
            expect(component.shadowRoot.innerHTML).toEqual(element.innerHTML);
        });

        it(`should set the stateManager`, () => {
            expect(component.stateManager instanceof StateManager).toEqual(true);
        });

        it(`should set gameStopped to true`, () => {
            expect(component.gameStopped).toEqual(true);
        });

        describe(`events`, () => {
            describe(`click`, () => {
                it(`should focus on canvas and fire canvasClicked event`, () => {
                    let eventDetail;
                    spyOn(component.canvas, 'focus').and.callThrough();
                    component.addEventListener('canvasClicked', (event) => {
                        eventDetail = event.detail;
                    });

                    component.canvas.click();

                    expect(component.canvas.focus).toHaveBeenCalled();
                    expect(component.stateManager.state).toEqual(eventDetail);
                });
            });

            describe(`keyDown`, () => {
                let eventDetail, spy, event;

                beforeEach(() => {
                    event = new Event('keydown');
                    event.key = 'ArrowDown';
                    spyOn(HunterGame, 'motion').and.returnValue(true);
                    spy = jasmine.createSpy('spy').and.callFake((event) => {
                        eventDetail = event.detail;
                    });
                    component.addEventListener('canvasKeyDown', spy);
                });
                it(`should fire an event canvasKeyDown when game not stopped`, () => {
                    component.gameStopped = false;

                    component.canvas.dispatchEvent(event);

                    expect(component.stateManager.state).toEqual(eventDetail);
                });

                it(`should not fire the canvasKeyDown when game is stopped`, () => {
                    component.gameStopped = true;

                    component.canvas.dispatchEvent(event);

                    expect(spy).not.toHaveBeenCalled();
                });

                it(`should call motion with the hunter's deatils`, () => {

                    const stubHunter = {bust: 'bust'};
                    component.gameStopped = false;
                    component.hunter = stubHunter;

                    component.canvas.dispatchEvent(event);
                    expect(HunterGame.motion).toHaveBeenCalledWith('Down', stubHunter);
                });
            });
        });

        describe(`menu`, () => {

        });
        
        describe(`static`, () => {
          describe(`motion`, () => {
            
          });
          
          describe(`getTile`, () => {
            
          });
          
          describe(`compareTiles`, () => {
            
          });
        });
        
        describe(`render`, () => {
            beforeEach(() => {
                spyOn(component, 'drawBoard').and.returnValue(true);
                spyOn(component, 'drawHero').and.returnValue(true);
                spyOn(component, 'drawMonsters').and.returnValue(true);
            });
          it(`should draw board, hero and monster every frame if game not stopped`, () => {
            component.gameStopped = false;

            component.render();

            expect(component.drawBoard).toHaveBeenCalled();
            expect(component.drawHero).toHaveBeenCalled();
            expect(component.drawMonsters).toHaveBeenCalled();
          });

          it(`should not draw anything if game is stopped`, () => {
              component.gameStopped = true;

              component.render();

              expect(component.drawBoard).not.toHaveBeenCalled();
              expect(component.drawHero).not.toHaveBeenCalled();
              expect(component.drawMonsters).not.toHaveBeenCalled();
          });
        });

        describe(`drawBoard`, () => {

        });

        describe(`drawHero`, () => {

        });

        describe(`drawMonsters`, () => {

        });
        
        describe(`spawn`, () => {
          
        });

        describe('togglePlay', function () {
            
        });
    });
});
