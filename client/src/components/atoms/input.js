import VirtualNode from '../../core/node.js';
import gameState from '../../core/state.js';

export default class Input extends VirtualNode {
    constructor(id, placeholder, callback, adds = {}) {
        super({
            tag: 'input',
            attrs: {
                ...adds,
                id: id,
                class: id,
                placeholder: placeholder
            },
            listeners: {
                onchange: event => callback(event)
            }
        })
    }
}
