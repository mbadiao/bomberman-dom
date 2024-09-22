import VirtualNode from '../../core/node.js';

export default class Image extends VirtualNode {
    constructor(tagClass, src, adds = {}) {
        super({
            tag: 'img',
            attrs: {
                ...adds,
                class: tagClass,
                src: src,
                alt: tagClass
            }
        })
    }
}