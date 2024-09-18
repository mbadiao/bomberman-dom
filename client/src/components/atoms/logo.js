import VirtualNode from '../../core/node.js';
// import gameState from '../../core/state.js';

class Logo extends VirtualNode {
    constructor() {
        super({
            tag: 'div', //REVIEW: Needless to wrap the <img> with a <div> if the page is not subdivided.
            attrs: {
                class: "logo",
            },
            children: [
                {
                    tag: 'img', //REVIEW: Atomic components shouldn't have children.
                    attrs: {
                        src: "./assets/man.svg",
                        alt: "svg",
                        width: "200",
                        height: "200",
                    },
                }
            ]
        })
    }
}

export default new Logo();