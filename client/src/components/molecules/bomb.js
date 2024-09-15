import VirtualNode from '../../core/node.js';

export default class Bomb extends VirtualNode {
    constructor() {
        super({
            tag: 'img',
            attrs: {
                class: 'bomb',
                src: './assets/bomb/bomb.svg',
                alt: 'New Bomb'
            }
        })
    }

    activation() {
        if (this.elem.style.display === 'block') {
            this.#countdown()
        }
    }

    #countdown() {
        // TODO: Set the timeout to explosion
    }

    explosion() {
        this.elem.style.display = 'none';
        // TODO: div container will has its class change to explosion.
    }
}