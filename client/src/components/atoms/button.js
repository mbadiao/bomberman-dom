import VirtualNode from '../../core/node.js';

export default class Button extends VirtualNode {
    constructor(callback, children, tagClass = '', adds = {}) {
        super({
            tag: 'button',
            attrs: {
                ...adds,
                class: tagClass
            },
            listeners: {
                onclick: callback,
            },
            children: children || ['Button']
        })
    }
}
