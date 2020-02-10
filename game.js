// win conditions are a mess
// tell whose turn it is
// highlight winning tiles, reset on click

let tiles;

const player1Symbol = 'X';
const player2Symbol = 'O';

let player1Points = 0;
let player2Points = 0;

let player1Turn = true;
let turn = 0;

const processClick = (tile) => {
    if (!tileOccupied(tile)) {
        if (player1Turn) {
            tile.innerText = player1Symbol;
        } else {
            tile.innerText = player2Symbol;
        }
        checkForWin();
        toggleTurn();
    }
}

const tileOccupied = (tile) => (tile.innerText.length > 0);

const tilesEqual = (tile1, tile2, tile3) => (tile1.innerText == tile2.innerText && tile2.innerText == tile3.innerText);

const checkForWin = () => {
    // const winConditions = [
    //     [0,1,2],
    //     [3,4,5],
    // ];
    // // nested for loop, check occupied and equal, tiles[x], tiles[y], tiles[z]
    if ((tilesEqual(tiles[0], tiles[1], tiles[2]) && tileOccupied(tiles[0])) ||
        (tilesEqual(tiles[3], tiles[4], tiles[5]) && tileOccupied(tiles[3])) ||
        (tilesEqual(tiles[6], tiles[7], tiles[8]) && tileOccupied(tiles[6])) ||
        (tilesEqual(tiles[0], tiles[3], tiles[6]) && tileOccupied(tiles[0])) ||
        (tilesEqual(tiles[1], tiles[4], tiles[7]) && tileOccupied(tiles[1])) ||
        (tilesEqual(tiles[2], tiles[5], tiles[8]) && tileOccupied(tiles[2])) ||
        (tilesEqual(tiles[0], tiles[4], tiles[8]) && tileOccupied(tiles[0])) ||
        (tilesEqual(tiles[2], tiles[4], tiles[6]) && tileOccupied(tiles[2]))) {
        if (player1Turn) {
            alert('Player 1 wins!');
            player1Points++;
        } else {
            alert('Player 2 wins!');
            player2Points++;
        }
        updateScore();
        resetBoard();
    } else if (turn == 9) {
        alert("It's a draw!");
        resetBoard();
    }
}

const resetBoard = () => {
    tiles.forEach(tile => {
        tile.innerText = null;
    });
    turn = 0;
}

const toggleTurn = () => {
    const title1 = document.getElementById('title1');
    const title2 = document.getElementById('title2');
    title1.classList.toggle('highlighted');
    title2.classList.toggle('highlighted');
    turn++;
    player1Turn = !player1Turn;
}

const updateScore = () => {
    const scoreDisplay1 = document.getElementById('score1');
    const scoreDisplay2 = document.getElementById('score2');
    scoreDisplay1.innerText = player1Points;
    scoreDisplay2.innerText = player2Points;
}

window.onload = () => {
    tiles = [...document.getElementsByTagName('button')];
    tiles.forEach(tile => {
        tile.onclick = () => {
            processClick(tile);
        };
    });
    updateScore();
};