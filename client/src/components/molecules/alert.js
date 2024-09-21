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

        this.elem.style.display = 'block';
        this.elem.innerText = state.error;

        let timer = setTimeout(() => {
            this.elem.style.display = 'none';
            this.elem.innerText = ''
            clearTimeout(timer);
        }, 1000)
    }
}

export default new Alert();