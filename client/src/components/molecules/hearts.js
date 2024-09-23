import VirtualNode from "../../core/node.js";
import Image from "../atoms/image.js";

export default class Hearts extends VirtualNode {
    constructor(hearts) {
        super({
            attrs: {
                class : "heart-container"
            },
            children: Array.from({ length: hearts }, () =>
                new Image('heart', './assets/svg/heart.svg', {
                    width: '30px',
                    height: '30px'
                })
            )
        });
    }


}
