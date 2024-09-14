export default class VirtualNode {
    constructor(props) {
        this.tag = props.tag || 'div';
        this.attrs = props.attrs || {};
        this.listeners = props.listeners || {};
        this.children = props.children || [];
    }

    render() {
        this.elem = document.createElement(this.tag);

        // Set Attributes
        Object.entries(this.attrs).forEach(([name, value]) => {
            this.elem.setAttribute(name, value);
        });

        // Add Event Listeners
        Object.entries(this.listeners).forEach(([event, callback]) => {
            this.elem[event] = callback;
        });
  
        // Append Children whether it is a virtual node,
        // a properties object or just a text as content.
        this.children.forEach(child => {
            if (typeof child === 'string') {
                this.elem.textContent += child;
            } else {
                if (!(child instanceof VirtualNode)) {
                    child = new VirtualNode(child)
                };
                this.elem.appendChild(child.render())
            }
        })

        return this.elem;
    }
}
