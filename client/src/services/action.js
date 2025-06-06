import gameState from "../core/state.js";
import boom from "../components/molecules/bomb.js";
import { divs } from "../components/grid.js";

const actionOnAvatar = (data) => {
    const players = gameState.get("avatars");
    const actionnedActor = players.find(
        (player) => player.name === data.name
    );
    if (data.content == " ") {
        boom.poserBomb(divs, actionnedActor.position(), actionnedActor);
    } else if ((data.content).includes("Arrow")) {
        actionnedActor.move(data.content);
        actionnedActor.takePowerUpSpeed();
        actionnedActor.takePowerUpBomb(boom);
    }
}


export default actionOnAvatar;