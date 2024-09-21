import gameState from "../core/state.js";
import boom from "../components/molecules/bomb.js";
import { divs } from "../components/grid.js";

const actionOnAvatar = (data) => {
    const players = gameState.get("avatars");
    const actionnedActor = players.find(
        (player) => player.name === data.name
    );
    const avatarElement = document.querySelector(
        `#avatar${actionnedActor.name ?? ""}`
    );
    if (data.content == " ") {
        boom.poserBomb(divs, actionnedActor.position(), actionnedActor);
    } else if ((data.content).includes("Arrow")) {
        // Debounce logic
        let timerDebounce = gameState.get("timerDebounce");
        if (timerDebounce == 0) { // s'il y a plus de timer en cours
            timerDebounce = setTimeout(()=> {
                actionnedActor.move(avatarElement, data.content, true);
                actionnedActor.takePowerUpSpeed();
                actionnedActor.takePowerUpBomb(boom);
                gameState.set({timerDebounce: 0});
            }, 200/actionnedActor.speed);

            gameState.set({timerDebounce: timerDebounce});
        }
    }
}

export default actionOnAvatar;