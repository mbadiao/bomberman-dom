import VirtualNode from '../../core/node.js';
import Image from '../atoms/image.js';
import Text from '../atoms/text.js';

export default class ChatBubble extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "chat-bubble",
            },
            children: [
                new Image(
                    'avatar',
                    'https://ui-avatars.com/api/?name=Fatima+Keita&background=123861&color=fff'
                ),
                {
                    tag: 'div',
                    attrs: {
                        class: "chat-content",
                    },
                    children: [
                        new Text('sender', 'System'),
                        new Text('message', 'Welcom to the chat!')
                    ]

                }
            ]

        })
    }
}