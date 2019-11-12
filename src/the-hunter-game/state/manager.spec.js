import { StateManager } from './manager';
import * as BOP_IMAGE from '../../assets/bop.png';
 
const BOP_IMAGE_ELEMENT = new Image(75, 75);
BOP_IMAGE_ELEMENT.src = BOP_IMAGE;

describe('StateManager', () => {
    let manager;
    beforeEach(() => {
        manager = new StateManager();
    });

    describe('init', () => {
        it('should create kitties and bops array', () => {
            expect(manager.kitties).toEqual([]);
            expect(manager.bops).toEqual([]);
        });
    });

    describe('spawn', () => {
        let randNum;
        beforeEach(() => {
            spyOn(Math, 'random').and.callFake(() => {
                return randNum;
            })
        });

        it('should add a bop 25% of the time and return it', () => {
            randNum = 0.01;
            const bop = manager.spawn();
            expect(manager.kitties.length).toEqual(0);
            expect(manager.bops.length).toEqual(1);
            expect(manager.bops[0]).toEqual(bop);
        });
        
        it('should add a kittie 75% of the time and return it', () => {
            randNum = 0.76;
            const kittie = manager.spawn();
            expect(manager.kitties.length).toEqual(1);
            expect(manager.bops.length).toEqual(0);
            expect(manager.kitties[0]).toEqual(kittie);
        });
    });

    describe('remove', () => {
        let entities;
        let randNum;
        beforeEach(() => {
            entities = [];
            spyOn(Math, 'random').and.callFake(() => {
                return randNum;
            });
        });
        it('should remove the sent object', () => {
            // add bops
            randNum = 0.24;
            for (let i = 0; i < 5; i++) {
                entities.push(manager.spawn());
            }

            // add kitties
            randNum = 0.26;
            for (let i = 0; i < 5; i++) {
                entities.push(manager.spawn());
            }
            const nBops = manager.bops.length;
            manager.remove(entities[3]);
            expect(nBops).toEqual(5);
            expect(manager.bops.length).toEqual(4);
            expect(manager.bops.indexOf(entities[3])).toEqual(-1);
        });
    });

    describe('findEntityByCoordinates', () => {
        let randNum;
        beforeEach(() => {
            spyOn(Math, 'random').and.callFake(() => {
                return randNum;
            });
            // add bops
            randNum = 0.24;
            for (let i = 0; i < 5; i++) {
                manager.spawn(500, 750);
            }

            // add kitties
            randNum = 0.26;
            for (let i = 0; i < 5; i++) {
                manager.spawn(500, 750);
            }
        });

        it('should find the kittie or bop and return a result object', () => {
            const kittie = manager.kitties[3];
            kittie.x = 5000;
            kittie.y = 7500;
            const bop = manager.bops[2];
            bop.x = 50;
            bop.y = 75;

            const kittieObj = {
                type: 'kittie',
                index: 3
            };

            const bopObj = {
                type: 'bop',
                index: 2
            };

            const kittyCoords = {
                x: kittie.x + Math.random() * 75,
                y: kittie.y + Math.random() * 75
            };

            const bopCoords = {
                x: bop.x + Math.random() * 75,
                y: bop.y + Math.random() * 75
            };

            expect(manager.findEntityByCoordinates(bopCoords)).toEqual(bopObj);
            expect(manager.findEntityByCoordinates(kittyCoords)).toEqual(kittieObj);
        });

        it('should return null type and index -1 if doesnt find anything', () => {
            const kittie = manager.kitties[3];
            kittie.x = 5000;
            kittie.y = 7500;
            const bop = manager.bops[2];
            bop.x = 50;
            bop.y = 75;

            const kittieObj = {
                type: null,
                index: -1
            };

            const bopObj = {
                type: null,
                index: -1
            };

            const kittyCoords = {
                x: -500,
                y: -500
            };

            const bopCoords = {
                x: -500,
                y: -500
            };

            expect(manager.findEntityByCoordinates(bopCoords)).toEqual(bopObj);
            expect(manager.findEntityByCoordinates(kittyCoords)).toEqual(kittieObj);
        });
    });
});