const player1Symbol = 'X';
const player2Symbol = 'O';

let player1Turn = true;

const processClick = (button) => {
    if (player1Turn) {
        button.innerText = player1Symbol;
    } else {
        button.innerText = player2Symbol;
    }
    player1Turn = !player1Turn;
}

window.onload = () => {
    let buttons = [...document.getElementsByTagName('button')];
    buttons.forEach(button => {
        button.onclick = () => {
            processClick(button);
        };
    });
};