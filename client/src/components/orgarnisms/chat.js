import VirtualNode from "../../core/node.js";
import chatHeader from '../molecules/chat-header.js';
import chatMain from '../molecules/chat-main.js';
import chatFooter from '../molecules/chat-footer.js';

export default class ChatCpn extends VirtualNode {
    constructor() {
        super(
            {
                tag: 'div',
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






