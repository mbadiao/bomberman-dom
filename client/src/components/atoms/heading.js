import VirtualNode from "../../core/node.js";

export default class Heading extends VirtualNode {
    constructor(tagClass, content, adds = {}, size = 1 ) {
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