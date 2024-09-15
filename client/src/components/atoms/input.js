import VirtualNode from '../../core/node.js';
import gameState from '../../app.js';

class Input extends VirtualNode {
    constructor() {
        super({
            tag: 'input',
            attrs: {
                id: 'nickname-input',
                required: true,
                maxlength: 10,
                type: 'text',
                name: 'nickname',
                placeholder: `Enter nickname...`
            },
            listeners: {
                onchange: event => {
                    if (event.target.value.trim() !== '') {
                        this.#joinRoom(event.target.value);
                        event.target.value = '';
                    }
                },
            }
        })
    }

    #joinRoom(nickname) {
        window.location.hash = '/room'
        gameState.set({
            nickname: nickname,
            playerCount: gameState.get('playerCount') + 1
        })
        // TODO: Send join request to server and handle response
      }
}

export default new Input()