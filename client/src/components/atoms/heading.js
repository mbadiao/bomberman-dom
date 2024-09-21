import VirtualNode from "../../core/node.js";

export default class Heading extends VirtualNode {
    constructor(tagClass, content, size = 1, adds = {}) {
        super({
            tag: `h${size}`,
            attrs: {
                ...adds,
                class: tagClass,
            },
            children: content,
        });
    }
}