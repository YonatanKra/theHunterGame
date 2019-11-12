import {HunterGame} from "../the-hunter-game.component";

const SIZE = 64;

const MOTION = ["Up", "Down", "Left", "Right"];

export class Entity {
    constructor(x, y, image) {
        this.image = image;
        this.lastMove = 0;
        this.position(x, y);
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.x, this.y, SIZE, SIZE);

        ctx.fillStyle = this.canMove ? "#00FF00" : "#fff000";
        ctx.fillRect(this.x, this.y + 4, (this.timeFromLastMove() / 1000) * SIZE, 4);
        ctx.strokeStyle = "#ff0000";
        ctx.strokeRect(this.x, this.y + 4, SIZE, 4);
    }

    get x() {
        return this._x;
    }

    set x(x) {
        if (!this.canMove) {
            return false;
        }
        this._x = x;
        this.resetTimer();
    }

    get y() {
        return this._y;
    }

    set y(y) {
        if (!this.canMove) {
            return false;
        }
        this._y = y;
        this.resetTimer();
    }

    position(x, y) {
        this._x = x;
        this._y = y;
    }

    resetTimer() {
        this.lastMove = new Date().getTime();
    }

    timeFromLastMove() {
        const timeDiff = new Date().getTime() - this.lastMove;
        return timeDiff > 1000 ? 1000 : timeDiff;
    }

    get canMove() {
        return this.timeFromLastMove() >= 1000;
    }
}

export class Monster extends Entity {
    constructor(x, y, image) {
        super(x, y, image);
    }

    draw(canvas) {
        super.draw(canvas);
        if (this.canMove && Math.random() > .95) {
            return MOTION[Math.round(Math.random() * (MOTION.length - 1))];
        }
        return false;
    }
}
