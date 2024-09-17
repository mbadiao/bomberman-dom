import gameState, { actors, avatarsState, ws } from "../../app.js";
import { grid } from "../grid.js";

const Game = () => {
    // if (gameState.current.nickname === "") {
    //     window.location.hash = "/";
    //     return
    // }

    console.log('actors :>> ', avatarsState.get('avatars'));
    grid();
    ws.addEventListener('message', (e) => {
        console.log('e.data :>> ', e.data);
        if (e.data.type === 'Action') {
            let i = e.data.playerCount - 1;
            console.log('actors[i] :>> ', actors[i]);
            console.log("action", e.data);
            actors[i].move(actors[i].avatar, e.data.content, true);
        }
    } )
    actors.forEach(actor => {
        actor.addAvatarInGrid();
    });
}

export default Game;