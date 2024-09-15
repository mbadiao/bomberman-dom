import VirtualNode from "../../core/node.js";

export default class ErrorPage extends VirtualNode {
  constructor(code, message) {
    super({
      tag: "div",
      attrs: {
        class: "error-page",
      },
      children: [
        {
          tag: "h1",
          children: [`ERROR ${code}`],
        },
        {
          tag: "p",
          children: [message],
        },
      ],
    });
  }
}
