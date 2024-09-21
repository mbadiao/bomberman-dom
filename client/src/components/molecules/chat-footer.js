import { sendMsg } from '../../app.js';
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
    #sendMessage(e) {
        e.preventDefault()
        console.log("ok");

        let inputValue = e.target.querySelector('#inputMsg').value
        console.log(inputValue);

        if (inputValue != ""){
            sendMsg(inputValue)
        }
        this.elem.querySelector("#inputMsg").value = ""
    }

}

export default new ChatFooter();