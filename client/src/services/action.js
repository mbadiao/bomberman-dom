import gameState from "../core/state.js";
import boom from "../components/atoms/bomb.js";

export default actionOnAvatar = (data) => {
    const players = gameState.get("avatars");
    const actionnedActor = players.find(
        (player) => player.name === data.name
    );
    const avatarElement = document.querySelector(
        `#avatar${actionnedActor.name ?? ""}`
    );
    if (data.content == " ") {
        boom.poserBomb(divs, actionnedActor.position(), actionnedActor);
        domNombreBombe(boom);
    } else if ((data.content).includes("Arrow")) {
        actionnedActor.move(avatarElement, data.content, true);
    }
}