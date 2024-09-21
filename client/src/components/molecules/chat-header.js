import VirtualNode from '../../core/node.js';
import gameState from '../../core/state.js';
import Heading from '../atoms/heading.js';


class ChatHeader extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "chat-header",
            },
            children: [new Heading('chat-title', ['Game Chat '], 2)]
        })
    }
}

export default new ChatHeader();