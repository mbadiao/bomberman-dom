import VirtualNode from "../../core/node.js";

export default class ErrorPage extends VirtualNode {
  constructor(code, message) {
    super({
      tag: 'div',
      attrs: {
        class: 'error-page',
      },
      children: [
        {
          tag: 'h1',
          attrs: {
            class: 'error-page-title'
          },
          children: [`ERROR ${code}`],
        },
        {
          tag: 'h2',
          attrs: {
            class: 'error-page-content'
          },
          children: [message],
        },
      ],
    });
  }
}
