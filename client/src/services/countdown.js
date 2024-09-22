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
        window.location.hash = "/game";
        span.innerText = "Gaming...";
        clearTimeout(timer);
    }, 10000);
}