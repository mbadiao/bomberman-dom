import timer from "../components/molecules/timer.js";


export default () => {
    let countdown = 9;
    const span = timer.select(0).select(1).elem
    
    let chrono = setInterval(() => {
        span.innerText =
            "00:0" + countdown;
        countdown--;
    }, 1000);

    setTimeout(() => {
        clearInterval(chrono);
        span.innerText = "00:00";
        window.location.hash = "/game";
    }, 10000);
}