export default class VirtualNode {
    constructor(props) {
        this.tag = props.tag || 'div';
        this.attrs = props.attrs || {};
        this.listeners = props.listeners || {};
        this.children = props.children || [];
    }

    // Start by creating the element.
    // Then sets the attributes and the event Listeners.
    // And finally appends children whether it is a virtual node,
    // a properties object or just a text as content.
    render() {
        this.elem = document.createElement(this.tag);

        Object.entries(this.attrs).forEach(([name, value]) => {
            this.elem.setAttribute(name, value);
        });

        Object.entries(this.listeners).forEach(([event, callback]) => {
            this.elem[event] = callback;
        });
  
        this.children.forEach(child => {
            this.add(child);
        })

        return this.elem;
    }

    // If the component has already been rendered,
    // it appends the child to the existing element.
    // Otherwise, it will add it to the children array
    // before it get rendered.
    add(child) {
        if (!this.elem) {
            this.children.push(child);
            return
        }
        
        if (typeof child === 'string') {
            this.elem.textContent += child;
            return
        }
        
        if (!(child instanceof VirtualNode)) {
            child = new VirtualNode(child)
        }
                
        this.elem.appendChild(child.render())
    }

    // Empty the element first,
    // then add the new child.
    replace(...children) {
        if (this.elem) {
            this.elem.innerHTML = '';
            children.forEach(child => this.add(child));
            return
        }

        this.children = [...newChild];
    }
}
