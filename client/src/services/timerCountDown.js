import timer from "../components/molecules/timer.js";


export const timerCountDown = () => {
    let countdown = 9;
    let chrono = setInterval(() => {
        timer.elem.querySelector("#formattedTime").innerText =
            "00:0" + countdown;
        countdown--;
    }, 1000);
    setTimeout(() => {
        clearInterval(chrono);
        timer.elem.querySelector("#formattedTime").innerText = "00:00";
        window.location.hash = "/game";
    }, 10000);
}