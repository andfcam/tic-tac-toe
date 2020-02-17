class Game {
    constructor() {
        this.player1 = { name: 'player 1', symbol: 'x', points: 0, turn: true };
        this.player2 = { name: 'player 2', symbol: 'o', points: 0, turn: false };
        this.turns = 1;

        this.conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    }

    start() {
        this.createTable();

        this.cells = document.querySelectorAll('td');
        this.cells.forEach(cell => { cell.onclick = (event) => this.newTurn(event.target); });

        this.populateDom();
    }

    createTable() {
        const table = document.querySelector('table');

        for (let r = 0; r < 3; r++) {
            table.insertRow();
            for (let c = 0; c < 3; c++) {
                table.rows[r].insertCell();
            }
        }
    }

    populateDom() {
        document.querySelector('#p1 .name').innerText = this.player1.name;
        document.querySelector('#p2 .name').innerText = this.player2.name;
        document.querySelector('#p1 .symbol').innerText = this.player1.symbol;
        document.querySelector('#p2 .symbol').innerText = this.player2.symbol;
        this.updateScore();
    }

    newTurn(cell) {
        if (Utils.cellOccupied(cell)) return;

        this.drawSymbol(cell);
        this.checkForWin();
        this.changeTurn();
    }

    drawSymbol(cell) {
        if (this.player1.turn) cell.innerText = this.player1.symbol;
        else cell.innerText = this.player2.symbol;
    }

    checkForWin() {
        this.conditions.forEach(condition => {
            if ((Utils.cellsEqual(this.cells[condition[0]], this.cells[condition[1]], this.cells[condition[2]])) &&
                Utils.cellOccupied(this.cells[condition[0]])) {
                this.processWinner();
            }
        });
        if (this.turns === 9) this.processDraw();
    }

    processWinner() {
        if (this.player1.turn) {
            this.popup({ h2: `Player 1 wins!`, p: `Congratulations!`, src: `url(./img/victory.gif)` });
            this.player1.points++;
        } else {
            this.popup({ h2: `Computer wins!`, p: `01101100 01101111 01101100!`, src: `url(./img/robot.gif)` });
            this.player2.points++;
        }
        this.updateScore();
        this.resetBoard();
    }

    processDraw() {
        this.popup({ h2: `It's a draw!`, p: `Play again?`, src: `url(./img/bushes.gif)` });
        this.resetBoard();
    }

    popup(data) {
        document.querySelector('#popup').classList.toggle('hidden');
        setTimeout(() => { document.querySelector('#popup').classList.toggle('hidden'); }, 2000);
        document.querySelector('#popup h2').innerText = data.h2;
        document.querySelector('#popup p').innerText = data.p;
        document.querySelector('#popup #img').style.backgroundImage = data.src;
    }

    resetBoard() {
        this.cells.forEach(cell => { cell.innerText = null; });
        this.turns = 0; // turn changes after, increments to 1
    }

    changeTurn() {
        this.toggleActive();
        this.turns++;
        this.player1.turn = !this.player1.turn;
        this.player2.turn = !this.player2.turn;
    }

    toggleActive() {
        document.querySelector('#p1 .symbol').classList.toggle('active');
        document.querySelector('#p2 .symbol').classList.toggle('active');
    }

    updateScore() {
        document.querySelector('#p1 .score').innerText = this.player1.points;
        document.querySelector('#p2 .score').innerText = this.player2.points;
    }
}

    // -- Attempted to process win conditions with fewer explicitly declared conditions
    // winningRow() {
    //     for (let i = 0; i <= 6; i += 3) {
    //         if (Utils.cellsEqual(this.cells[i], this.cells[i + 1], this.cells[i + 2]) && Utils.cellOccupied(this.cells[i])) return true;
    //     }
    //     return false;
    // }

    // winningColumn() {
    //     for (let i = 0; i < 3; i++) {
    //         if (Utils.cellsEqual(this.cells[i], this.cells[i + 3], this.cells[i + 6]) && Utils.cellOccupied(this.cells[i])) return true;
    //     }
    //     return false;
    // }

    // winningDiagonal() {
    //     if ((Utils.cellsEqual(this.cells[0], this.cells[4], this.cells[8]) ||
    //         Utils.cellsEqual(this.cells[2], this.cells[4], this.cells[6])) &&
    //         Utils.cellOccupied(this.cells[4])) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }