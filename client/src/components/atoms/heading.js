import VirtualNode from "../../core/node.js";

export default class Heading extends VirtualNode {
    constructor(size = 1, tagClass, text, adds = {} ) {
        super({
            tag: `h${size}`,
            attrs: {
                ...adds,
                class: tagClass,
            },
            children: [text],
        });
    }
}