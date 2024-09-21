import VirtualNode from '../../core/node.js';

export default class Span extends VirtualNode {
    constructor(id, text, adds = {}) {
        super({
            tag: 'span',
            attrs: {
                ...adds,
                id: id,
                class: id,
            },
            children: [text],
        })
    }
}