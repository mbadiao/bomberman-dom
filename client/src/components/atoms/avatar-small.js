import VirtualNode from "../../core/node.js";

class avartarSmall extends VirtualNode {
    constructor(emoji) {
        super({
            tag: "div",
            attrs: {
                class: "actor-rep",
            },
            children: [emoji],
        })
    }
}

export default avartarSmall;