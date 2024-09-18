import VirtualNode from '../../core/node.js';

class ChatHeader extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "chat-header",
            },
            children: [
                {
                    tag: 'h2',
                    attrs: {
                        class: "chat-title",
                    },
                    children: ["Chat de Jeu"],
                }
            ]
        })
    }
}

export default new ChatHeader();