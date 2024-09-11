export default class VirtualNode {
    constructor(props) {
        this.tag = props.tag || 'div';
        this.attrs = props.attrs || {};
        this.content = props.content || '';
        this.listeners = props.listeners || {};
        this.children = props.children || [];
    }

    render() {
        this.elem = document.createElement(this.tag);

        // Set Attributes
        Object.entries(this.attrs).forEach(([name, value]) => {
            this.elem.setAttribute(name, value);
        });

        // Set Content
        if (this.content !== '') {
            this.elem.textContent = this.content;
        };

        // Add Event Listeners
        Object.entries(this.listeners).forEach(([event, callback]) => {
            this.elem[event] = callback;
        });
  
        // Append Children
        this.children.forEach(child => {
            if (!(child instanceof VirtualNode)) {
                child = new VirtualNode(child)
            };
            this.elem.appendChild(child.render())
        })

        return this.elem;
    }
}
