import VirtualNode from "../../core/node.js";
import chatHeader from './chat-header.js';
import chatMain from './chat-main.js';
import chatFooter from './chat-footer.js';

export default class ChatCpn extends VirtualNode {
    constructor() {
        super(
            {
                tag: 'section',
                attrs: {
                    class: "card",
                },
                children: [
                    chatHeader,
                    chatMain,
                    chatFooter
                ]
            })
    }
}






