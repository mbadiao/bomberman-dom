import VirtualNode from '../../core/node.js';
import gameState from '../../core/state.js';
import { ws } from '../../app.js';

export default class Input extends VirtualNode {
    constructor(id, placeholder, msgType, adds = {}) {
        super({
            tag: 'input',
            attrs: {
                ...adds,
                id: id,
                placeholder: placeholder
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

    #send(input) {
        if (ws.readyState == 1) {
            ws.send(JSON.stringify({
                type: msgType,
                name: input,
            }));
        }
        
        // TODO: Transfert to the websocket handler
        gameState.set({
            nickname: input,
            playerCount: gameState.get('playerCount') + 1,
            // error: 'Error'
        })
        
        // TODO: Transfert to the websocket handler
        if (gameState.get('error') === '') {
            window.location.hash = "/room";
        }
    }
}
