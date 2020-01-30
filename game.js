// score system
// win conditions are a mess
// tell whose turn it is
// highlight winning tiles, reset on click

let buttons;

const player1Symbol = 'X';
const player2Symbol = 'O';

let player1Turn = true;

const processClick = (button) => {
    if (button.innerText.length < 1) {
        if (player1Turn) {
            button.innerText = player1Symbol;
        } else {
            button.innerText = player2Symbol;
        }
        checkForWin();
        player1Turn = !player1Turn;
    }
}

const checkForWin = () => {
    if ((buttons[0].innerText == buttons[1].innerText && buttons[1].innerText == buttons[2].innerText && buttons[2].innerText.length > 0) ||
        (buttons[3].innerText == buttons[4].innerText && buttons[4].innerText == buttons[5].innerText && buttons[5].innerText.length > 0) ||
        (buttons[6].innerText == buttons[7].innerText && buttons[7].innerText == buttons[8].innerText && buttons[8].innerText.length > 0) ||
        (buttons[0].innerText == buttons[3].innerText && buttons[3].innerText == buttons[6].innerText && buttons[6].innerText.length > 0) ||
        (buttons[1].innerText == buttons[4].innerText && buttons[4].innerText == buttons[7].innerText && buttons[7].innerText.length > 0) ||
        (buttons[2].innerText == buttons[5].innerText && buttons[5].innerText == buttons[8].innerText && buttons[8].innerText.length > 0) ||
        (buttons[0].innerText == buttons[4].innerText && buttons[4].innerText == buttons[8].innerText && buttons[8].innerText.length > 0) ||
        (buttons[2].innerText == buttons[4].innerText && buttons[4].innerText == buttons[6].innerText && buttons[6].innerText.length > 0)) {
        if (player1Turn) {
            alert('Player 1 wins!');
        } else {
            alert('Player 2 wins!');
        }
        resetBoard();
    }
}

const resetBoard = () => {
    buttons.forEach(button => {
        button.innerText = null;
    });
}

window.onload = () => {
    buttons = [...document.getElementsByTagName('button')];
    buttons.forEach(button => {
        button.onclick = () => {
            processClick(button);
        };
    });
};