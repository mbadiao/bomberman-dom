import VirtualNode from "../../core/node.js";

class avartarCard extends VirtualNode {
    constructor(emoji) {
        super({
            tag: "div",
            attrs: {
                class: "avatar-card",
            },
            children: [emoji],
        })
    }
}

export default avartarCard;