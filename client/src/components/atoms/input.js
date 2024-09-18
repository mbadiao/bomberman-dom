import VirtualNode from '../../core/node.js';
import gameState from '../../core/state.js';
import { ws } from '../../app.js';

class Input extends VirtualNode {
    constructor() {
        super({
            tag: 'input',
            attrs: {
                id: 'nickname-input',
                required: true,
                maxlength: 7,
                type: 'text',
                name: 'nickname',
                placeholder: `Enter nickname...`
            },
            listeners: {
                onkeydown: event => {
                    if (event.key === 'Enter' && event.target.value.trim() !== '') {
                        this.#joinRoom(event.target.value);
                        event.target.value = '';
                    }
                },
            }
        })
    }

    #joinRoom(nickname) {
        gameState.set({
            nickname: nickname,
            playerCount: gameState.get('playerCount') + 1
        })

        if (ws.readyState == 1) {
            ws.send(JSON.stringify({
                type: "join",
                name: this.elem.value,
            }));
        }
        
        window.location.hash = "/room";
    }
}

export default new Input();