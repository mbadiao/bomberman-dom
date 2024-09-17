import VirtualNode from "../../core/node.js";

class TimerCpn extends VirtualNode {
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
                        {
                            tag: 'div',
                            attrs: {
                                class: "time-header"
                            },
                            children: [
                                {
                                    tag: 'h2',
                                    attrs: {
                                        class: "time-title"
                                    },
                                    children:[
                                        "Bomber-Time"
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            attrs: {
                                class: "time-content"
                            },
                            children: [
                                {
                                    tag: 'div',
                                    attrs: {
                                        class: "time-display"
                                    },
                                    children: [
                                        {
                                            tag: 'span',
                                            attrs: {
                                                id: "formattedTime",
                                            },
                                            children:[
                                                "00:00"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ]
        })
    }
}

export default new TimerCpn()