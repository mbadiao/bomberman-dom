import VirtualNode from "../../core/node.js";

export default class Cover extends VirtualNode {
  constructor(...children) {
    super({
      tag: "div",
      attrs: {
        class: "entry",
      },
      children: [...children],
    });
  }
}
