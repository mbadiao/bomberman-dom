import { sendMsg } from '../../app.js';
import VirtualNode from '../../core/node.js';
import Button from '../atoms/button.js';
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
                        class: "chat-form",
                    },
                    listeners: {
                        onsubmit : (e) => this.#sendMessage(e)
                    },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: "text",
                                placeholder: "Tapez votre message...",
                                id: "inputMsg",
                                class: "chat-input"
                            },
                        },
                        new Button(["Envoyer"], 'send-button', 'submit')
                    ]
                }

            ]
        },)
    }
    #sendMessage(e) {
        e.preventDefault()

        let inputValue = e.target.querySelector('#inputMsg').value

        if (inputValue != ""){
            sendMsg(inputValue)
        }
        this.elem.querySelector("#inputMsg").value = ""
    }

}

export default new ChatFooter();