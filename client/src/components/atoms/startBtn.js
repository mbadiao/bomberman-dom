import VirtualNode from '../../core/node.js';
// import gameState from '../../app.js';

class StartBtn extends VirtualNode {
    constructor() {
        super({
            tag: 'div',
            children: [
                {
                    tag: 'button',
                    children: [
                        "Start"
                    ]
                }
            ],
            listeners: {
                onclick : () => this.#joinRoom()
            }
        })
    }
    #joinRoom() {
        window.location.hash = '/insert'
      }
}

export default new StartBtn()




