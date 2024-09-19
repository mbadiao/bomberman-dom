export const canPass = (event) => {
    return event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " ";
}