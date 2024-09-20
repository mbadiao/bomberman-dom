import VirtualNode from '../../core/node.js';
// import gameState from '../../core/state.js';

class End extends VirtualNode {
    constructor() {
        super({
            tag: 'h1',
            attrs: {
                class : "title",
                "aria-label" :"Bomberman-Dom",
            },
            children: [ //REVIEW: Atomic components shouldn't have children.
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "G"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "A"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "M"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "E"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "-"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "O"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "V"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "E"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "R"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "!"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "!"
                    ]
                },
                {
                    tag: 'span',
                    attrs : {
                        class : "letter"
                    },
                    children: [
                        "!"
                    ]
                }
            ]
        })
    }
}

export default new End()




