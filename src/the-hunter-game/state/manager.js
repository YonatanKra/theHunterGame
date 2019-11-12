import { Monster } from '../entity/entity';
import * as ORC_IMAGE from "../../assets/orc.png";

const ORC_IMAGE_ELEMENT = new Image(75, 75);
ORC_IMAGE_ELEMENT.src = ORC_IMAGE;

export class StateManager {
    constructor() {
        this.monsters = [];
        this.heroes = [];
    }

    spawn(xTilesMax, yTilesMax, multiplier) {
        const x = StateManager.getRandomTileInRange(xTilesMax) * multiplier - 72;
        const y = StateManager.getRandomTileInRange(yTilesMax) * multiplier - 72;

        return this.monsters[this.monsters.push(new Monster(x, y, ORC_IMAGE_ELEMENT))-1];
    }

    static getRandomTileInRange(max) {
        return Math.round(Math.random() * max);
    }
}
