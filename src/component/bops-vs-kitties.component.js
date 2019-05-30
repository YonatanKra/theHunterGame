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
        this.canvas = this.root.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ballAnimation();
    }
    ballAnimation() {
        let i = 0;
        const interval = setInterval(() =>{
            i++;
            if (i > 300) {
                window.clearInterval(interval);
                return;
            }
            // clear the frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw the ball
        this.drawBall();
        }, 16);
    }
    drawBall() {
        this.x = this.x ? this.x + 1 : 1;
        this.y = this.y ? this.y + 1 : 1;
        // add a circle
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI * 2); //x, y, radius, start angle, end angle
        this.ctx.fillStyle = '#0095DD'; // just fill it
        this.ctx.fill();
        this.ctx.closePath();
    }
}
