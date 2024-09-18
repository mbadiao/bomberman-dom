import VirtualNode from '../../core/node.js';
import ChatBubble from './chat-bubble.js';

class ChatMain extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "chat-main",
            },
            children: [
                {
                    tag: 'div',
                    attrs: {
                        class: "scroll-area",
                    },
                    children: [
                        new ChatBubble()
                    ]
                }
            ]
        })
    }
}

export default new ChatMain();