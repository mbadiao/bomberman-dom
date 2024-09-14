import VirtualNode from "../core/node";

export default class ChatCpn extends VirtualNode {
    constructor() {
        super(
            {
                tag: 'section',
                attrs: {
                    class: "card",
                },
                children: [
                    {
                        tag: 'div',
                        attrs: {
                            class: "card-header",
                        },
                        children: [
                            {
                                tag: 'h2',
                                attrs: {
                                    class: "card-title",
                                },
                                children: "Chat de Jeu",
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attrs: {
                            class: "card-content",
                        },
                        children: [
                            {
                                tag: 'div',
                                attrs: {
                                    class: "scroll-area",
                                },
                                children: [
                                    {
                                        tag: 'div',
                                        attrs: {
                                            class: "message",
                                        },
                                        children: [
                                            {
                                                tag: 'div',
                                                attrs: {
                                                    class: "avatar",
                                                },
                                                children: [
                                                    {
                                                        tag: 'im',
                                                        attrs: {
                                                            class: "avatar",
                                                            src: "placeholder.svg",
                                                            alt: "Avatar"
                                                        },

                                                    },
                                                ]
                                            },
                                            {
                                                tag: 'div',
                                                attrs: {
                                                    class: "message-content",
                                                },
                                                children: [
                                                    {
                                                        tag: 'p',
                                                        attrs: {
                                                            class: "sender",
                                                        },
                                                        children: "Système",
                                                    },
                                                    {
                                                        tag: 'p',
                                                        attrs: {
                                                            class: "text",
                                                        },
                                                        children: "Bienvenue dans le chat du jeu!",
                                                    }
                                                ]

                                            }
                                        ]

                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attrs: {
                            class: "card-footer",
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
                                        children: "Envoyer",
                                    }
                                ]
                            }

                        ]
                    },
                ]
            })
    }
}






