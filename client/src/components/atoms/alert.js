import VirtualNode from '../../core/node.js';

class Alert extends VirtualNode {
    constructor(content) {
        super({
            tag: 'h2',
            attrs: {
                class: "alert",
                display: 'none'
            },
        });
    }

    display(state) {
        if (state.error === '') {
            this.elem.style.display = 'none'
            return
        }

        // DEBUG: Check state for error message...
        console.log(state.error);

        this.elem.style.display = 'block';
        this.elem.innerText = state.error;
    }
}

export default new Alert();