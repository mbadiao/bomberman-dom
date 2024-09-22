import VirtualNode from '../../core/node.js';
import ChatBubble from './chat-bubble.js';

class ChatMain extends VirtualNode {
    constructor() {
        super({
            tag: 'section',
            attrs: {
                class: "chat-main",
            },
            children: [
                new ChatBubble(
                    'https://ui-avatars.com/api/?name=Fatima+Keita&background=123861&color=fff',
                    'System',
                    'Welcome to the chat!'
                )
            ]
        })
    }

    newMessage(data) {
        this.add(
            new ChatBubble(
                `https://ui-avatars.com/api/?name=${data.name}&background=123861&color=fff`,
                `${data.name}`,
                `${data.content}`
            )
        );
        
        this.elem.scrollTo(0, 0);
    }
}

export default new ChatMain();