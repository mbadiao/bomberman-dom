import VirtualNode from '../../core/node.js';
import Image from '../atoms/image.js';
import Text from '../atoms/paragraph.js';

export default class ChatBubble extends VirtualNode {
    constructor(imgSrc, senderName, msgContent) {
        super({
            tag: 'article',
            attrs: {
                class: "chat-bubble",
            },
            children: [
                new Image('avatar', imgSrc),
                {
                    tag: 'div',
                    attrs: {
                        class: "chat-content",
                    },
                    children: [
                        new Text('sender', senderName),
                        new Text('message', msgContent)
                    ]
                }
            ]
        })
    }
}