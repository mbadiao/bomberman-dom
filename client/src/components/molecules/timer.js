import VirtualNode from "../../core/node.js";
import Heading from '../atoms/heading.js';
import Span from '../atoms/span.js';

class Timer extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "timer"
            },
            children: [
                {
                    tag: 'div',
                    attrs: {
                        class: "time"
                    },
                    children: [
                        new Heading('time-header', ['Gamers'], 2),
                        new Span('time-display', ''),
                    ]
                }
            ]
        })
    }
}

export default new Timer()