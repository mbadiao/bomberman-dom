import VirtualNode from "../../core/node.js";
import Image from "../atoms/image.js";
import Heading from "../atoms/heading.js";
import Span from "../atoms/span.js";
import Button from "../atoms/button.js";

export default class Cover extends VirtualNode {
  constructor(...children) {
    super({
      tag: "div",
      attrs: {
        class: "entry",
      },
      children: [children],
    });
  }
}
