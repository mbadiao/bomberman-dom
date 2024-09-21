import VirtualNode from '../../core/node.js';
import Actor from './actor.js';

export default class LifeAndActor extends VirtualNode {
    constructor(avatars) {
        super({
            tag: 'div',
            attrs: {
                class: "avatars-representations",
            },
            children : avatars
        })
    }

    update(avatars) {
      this.select(0).replace(...avatars)
    }
}