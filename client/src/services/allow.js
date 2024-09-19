export const canPass = (event) => {
    let input = document.querySelector("#inputMsg")
    return (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " ") && !(document.activeElement === input);
}