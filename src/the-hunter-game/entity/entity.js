const SIZE = 64;

const MOTION = {
    "UP": {
        sign: -1,
        limit: 0,
        property: 'y'
    },
    "LEFT": {
        sign: -1,
        limit: 0,
        property: 'x'
    },
    "RIGHT": {
        sign: 1,
        limit: 'width',
        property: 'x'
    },
    "DOWN": {
        sign: 1,
        limit: 'height',
        property: 'y'
    }
};

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
        if (this.canMove) {
            const directions = Object.keys(MOTION);
            const directionString = directions[Math.round(Math.random() * (directions.length - 1))];
            const direction = MOTION[directionString];
            const currentPos = this[direction.property];
            if (currentPos - 80 < 0 || (currentPos + 80) > canvas[direction.limit] - 80) {
                return;
            }
            this[direction.property] += 80 * direction.sign;
        }
    }
}
