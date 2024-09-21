import VirtualNode from '../../core/node.js';
import avartarSmall from '../atoms/avatar-small.js';

import Hearts from './hearts.js';

export default class Actor extends VirtualNode {
    constructor(avatar) {
        super({
            tag: "div",
            attrs: {
                class: "actor",
            },

            children: [
                new avartarSmall(avatar.representation),
                new Hearts(avatar.life)
            ]
        })
    }
}