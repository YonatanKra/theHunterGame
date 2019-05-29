// setup a template
import * as templateString from './bops-vs-kitties.component.html';

// setup a template element with our template
const template = document.createElement('template');
template.innerHTML = templateString;

export class BopsVsKitties extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.root.appendChild(template.content.cloneNode(true));

        this.init();
    }

    init() {
        const canvas = this.root.querySelector('canvas');

        const ctx = canvas.getContext('2d');

        // add a circle
        ctx.beginPath();
        ctx.arc(40, 60, 15, 0, Math.PI * 2); //x, y, radius, start angle, end angle
        ctx.fillStyle = '#0095DD'; // just fill it
        ctx.fill();
        ctx.closePath();

        // add a rectangle
        ctx.beginPath();
        ctx.rect(140, 260, 50, 100);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}
