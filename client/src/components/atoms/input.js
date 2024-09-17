import VirtualNode from '../../core/node.js';
import gameState, { ws } from '../../app.js';

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

                onkeydown: event => {
                    if (event.key === 'Enter' && event.target.value.trim() !== '') {
                        this.#joinRoom(event.target.value);
                        event.target.value = '';
                    }
                },
                // listeners: {
                //     keydown: (e) => {
                //         if (e.key === "Enter") {
                //             console.log('ws :>> ', ws);
                //             // gameState.set('nickname', nameInput.elem.value)
                //             ws.send(JSON.stringify({
                //                 type: "join",
                //                 name: this.elem.value,
                //             }));
                //             setTimeout(() => {
                //                 window.location.hash = "/room";
                //             }, 5000);
                //             // window.location.hash = "/room";
                //         }
                //     }
                // }
            }
        })
    }

    #joinRoom(nickname) {
        // window.location.hash = '/room'
        gameState.set({
            nickname: nickname,
            playerCount: gameState.get('playerCount') + 1
        })
        // TODO: Send join request to server and handle response
        ws.send(JSON.stringify({
            type: "join",
            name: this.elem.value,
        }));
        window.location.hash = "/room";
    }
}

export default new Input()