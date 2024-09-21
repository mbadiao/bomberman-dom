import VirtualNode from '../../core/node.js';

export default class Text extends VirtualNode {
    constructor(tagClass, content, adds = {}) {
        super({
            ...adds,
            tag: 'p',
            attrs: {
                class: tagClass
            },
            children: [content]
        })
    }
}