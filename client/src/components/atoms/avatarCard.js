import VirtualNode from "../../core/node.js";

// const avartarCard = new VirtualNode({
//     tag: "div",
//     attrs: {
//         class: "avatar-card",
//         style : "width: 100px; height: 100px; border-radius: 50%; background-color: #f1f1f1; display: flex; justify-content: center; align-items: center; font-size: 2rem; color: #000; font-weight: bold;"
//     }
// })

class avartarCard extends VirtualNode {
    constructor(emoji) {
        super({
            tag: "div",
            attrs: {
                class: "avatar-card",
                style: "width: 100px; height: 100px; border-radius: 50%; margin-x: 7px;  background-color: #f1f1f1; display: flex; justify-content: center; align-items: center; font-size: 4rem; color: #000; font-weight: bold;"
            },
            children: [emoji],
        })
    }
}

export default avartarCard;