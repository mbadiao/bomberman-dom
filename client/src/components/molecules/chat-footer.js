import VirtualNode from '../../core/node.js';

class ChatFooter extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "chat-footer",
            },
            children: [
                {
                    tag: 'form',
                    attrs: {
                        class: "message-form",
                    },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: "text",
                                placeholder: "Tapez votre message...",
                                class: "input-message"
                            },
                        },
                        {
                            tag: 'button',
                            attrs: {
                                type: "submit",
                                class: "send-button"
                            },
                            children: ["Envoyer"],
                        }
                    ]
                }

            ]
        },)
    }
}

export default new ChatFooter();