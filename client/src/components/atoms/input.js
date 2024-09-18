import VirtualNode from '../../core/node.js';
import gameState from '../../core/state.js';
import { ws } from '../../app.js';

class Input extends VirtualNode {
    constructor(id, ) {
        super({
            tag: 'input',
            attrs: {
                id: 'nickname-input',
                required: true,
                maxlength: 7,
                placeholder: `Enter nickname...`
            },
            listeners: {
                onkeydown: event => {
                    if (event.key === 'Enter' && event.target.value.trim() !== '') {
                        this.#send(event.target.value);
                        event.target.value = '';
                    }
                },
            }
        })
    }

    #send(nickname) {
        if (ws.readyState == 1) {
            ws.send(JSON.stringify({
                type: "join",
                name: nickname,
            }));
        }
        
        // TODO: Transfert to the websocket handler
        gameState.set({
            nickname: nickname,
            playerCount: gameState.get('playerCount') + 1,
            // error: 'Error'
        })
        
        // TODO: Transfert to the websocket handler
        if (gameState.get('error') === '') {
            window.location.hash = "/room";
        }
    }
}

export default new Input();