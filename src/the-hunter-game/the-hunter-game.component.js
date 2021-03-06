// setup a template
import * as templateString from './the-hunter-game.component.html';
import * as HUNTER_IMAGE from "../assets/ddicons1.png";

import {Entity} from "./entity/entity";
import {StateManager} from "./state/manager";

// setup a template element with our template
const template = document.createElement('template');
template.innerHTML = templateString;

const HUNTER_IMAGE_ELEMENT = new Image(75, 75);
HUNTER_IMAGE_ELEMENT.src = HUNTER_IMAGE;

const TILE_SIZE = 80;
export class HunterGame extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({mode: 'open'});
        this.root.appendChild(template.content.cloneNode(true));
        this.canvas = this.root.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.manager = new StateManager();
        this.gameStopped = true;
        this.setEventListeners();
        this.setMenu();
    }

    setMenu() {
        const button = this.shadowRoot.getElementById('start');
        button.addEventListener('click', _ => {
           this.togglePlay();
        });
    }

    setEventListeners() {
        this.canvas.addEventListener('click', _ => {
           this.canvas.focus();
        });

        this.canvas.addEventListener('keydown' , e => {
            if (this.gameStopped) {
                return;
            }
            const tile = HunterGame.getTile(this.hunter);
           switch (e.key){
               case "ArrowDown":
                   if (tile.y === this.height - 1) return;
                   this.hunter.y += TILE_SIZE;
                    break;
               case "ArrowUp":
                   if (tile.y === 0) return;
                   this.hunter.y -= TILE_SIZE;
                   break;
               case "ArrowLeft":
                   if (tile.x === 0) return;
                   this.hunter.x -= TILE_SIZE;
                   break;
               case "ArrowRight":
                   if (tile.x === this.width - 1) return;
                   this.hunter.x += TILE_SIZE;
                   break;
           }
        });
    }

    drawBoard() {
        const width = this.width = Math.floor(this.canvas.width / TILE_SIZE);
        const height = this.height = Math.floor(this.canvas.height / TILE_SIZE);

        for(let x = 0; x < width ; x++) {
            let currX = x * TILE_SIZE;
            for(let y = 0; y < height; y++) {
                let currY = y * TILE_SIZE;
                this.ctx.strokeStyle = "#FF0000";
                this.ctx.strokeRect(currX, currY, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    drawCharacter() {
        if (!this.hunter) {
            const x = Math.floor(Math.random() * this.width - 1) * TILE_SIZE + 8;
            const y = Math.floor(Math.random() * this.height - 1) * TILE_SIZE + 8;
            this.hunter = new Entity(x, y, HUNTER_IMAGE_ELEMENT);
        }
        this.hunter.draw(this.canvas);
    }

    render() {
        if (this.gameStopped) {
            return;
        }
        this.canvas.focus();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(() => this.render());

        this.drawBoard();
        this.drawCharacter();
        let killedMonster = null;
        this.manager.monsters.forEach((monster, i) => {
            // collision
            if (HunterGame.compareTiles(this.hunter, monster)) {
                const hunterAttack = Math.round(Math.random() * 20);
                const monsterAttack = Math.round(Math.random() * 20);

                if (hunterAttack >= monsterAttack) {
                    // kill monster
                    killedMonster = i;
                    alert('הרגת את האורק!!! כל הכבוד!!!')
                } else {
                    alert('דריזט מת! המשחק נגמר!');
                    this.hunter = null;
                    this.manager.monsters.length = 0;
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.togglePlay();
                    return;
                }
            }
            monster.draw(this.canvas);
        });

        if (killedMonster != null) {
            this.manager.monsters.splice(killedMonster, 1);
            killedMonster = null
        }

        this.spawn();
    }

    spawn() {
        if (this.manager.monsters.length > 5 || Math.random() < .5) {
            return;
        }
        this.manager.spawn(this.width - 1, this.height - 1, TILE_SIZE);
    }
    togglePlay() {
        const button = this.shadowRoot.getElementById('start');
        this.gameStopped = !this.gameStopped;
        this.render();
        button.innerText = this.gameStopped ? 'התחל משחק': 'עצור משחק';
    }
    static getTile(entity) {
        return {
            x: Math.floor(entity.x / TILE_SIZE),
            y: Math.floor(entity.y / TILE_SIZE)
        }
    }

    static compareTiles(entity1, entity2) {
        return JSON.stringify(HunterGame.getTile(entity1)) === JSON.stringify(HunterGame.getTile(entity2));
    }
}
