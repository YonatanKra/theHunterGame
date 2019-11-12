import { Entity } from './entity';

describe('Entity', () => {
    let entity;
    beforeEach(() => {
        entity = new Entity();
    });

    describe('init', () => {
        it('should setup the image property', () => {
            const currentImage = entity.image;
            const dummyImage = {};
            entity = new Entity(5,5,dummyImage);
            expect(currentImage).toEqual(undefined);
            expect(entity.image).toEqual(dummyImage);
        });

        it('should setup perliminary and random x and y if given', () => {
            const positions = {
                x: 350,
                y: 250
            };
            
            expect(entity.x).toEqual(undefined);
            expect(entity.y).toEqual(undefined);

            entity = new Entity(positions.x, positions.y);

            expect(entity.x).toEqual(positions.x);
            expect(entity.y).toEqual(positions.y);
        });
    });

    describe('draw', () => {
        it('should draw itself on given canvas', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const dummyImage = {};

            spyOn(ctx, 'drawImage').and.callFake(() => {
                return true;
            });
            canvas.height = 500;
            canvas.width = 400;
            
            entity = new Entity(40, 50, dummyImage);
            
            entity.draw(canvas);
            
            expect(ctx.drawImage).toHaveBeenCalledWith(dummyImage, 40, 50, jasmine.any(Number), jasmine.any(Number));
        });
    });

    describe('position', () => {
        it('should setup x and y', () => {
            const positions = {
                x: 350,
                y: 250
            };
            entity.position(positions.x, positions.y);
            expect(entity.x).toEqual(positions.x);
            expect(entity.y).toEqual(positions.y);
        });
    });
});