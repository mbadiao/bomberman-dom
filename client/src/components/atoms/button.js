import VirtualNode from '../../core/node.js';

export default class Button extends VirtualNode {
    constructor(children, tagClass = '', type = 'button', callback = () => {}, adds = {}) {
        super({
            tag: 'button',
            attrs: {
                ...adds,
                type: type,
                class: tagClass
            },
            listeners: {
                onclick: callback,
            },
            children: children || ['Button']
        })
    }
}
