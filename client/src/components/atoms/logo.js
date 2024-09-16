import VirtualNode from '../../core/node.js';
// import gameState from '../../app.js';

class Logo extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            attrs: {
                class: "logo",
            },
            children: [
                {
                    tag: 'img',
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