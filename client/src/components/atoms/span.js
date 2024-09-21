import VirtualNode from '../../core/node.js';

export default class Span extends VirtualNode {
    constructor(tagClass, text, adds = {}) {
        super({
            tag: 'span',
            attrs: {
                ...adds,
                class: tagClass,
            },
            children: [text],
        })
    }
}