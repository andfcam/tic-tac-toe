class Game {
    constructor() {
        this.symbolP1 = 'x';
        this.symbolP2 = 'o';
        this.nameP1 = 'player 1';
        this.nameP2 = 'player 2';
        this.pointsP1 = 0;
        this.pointsP2 = 0;

        this.player1 = true;
        this.turn = 1;
    }

    start() {
        this.createTable();

        this.cells = document.querySelectorAll('td');
        this.cells.forEach(cell => { cell.onclick = (event) => this.newTurn(event.target); });

        this.populateDom();
    }

    populateDom() {
        document.querySelector('#p1 .name').innerText = this.nameP1;
        document.querySelector('#p2 .name').innerText = this.nameP2;
        document.querySelector('#p1 .symbol').innerText = this.symbolP1;
        document.querySelector('#p2 .symbol').innerText = this.symbolP2;
        this.updateScore();
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

    newTurn(cell) {
        if (Utils.cellOccupied(cell)) return;

        this.drawSymbol(cell);
        this.checkForWin();
        this.changeTurn();
    }

    drawSymbol(cell) {
        if (this.player1) cell.innerText = this.symbolP1;
        else cell.innerText = this.symbolP2;
    }

    winningRow() {
        for (let i = 0; i <= 6; i += 3) {
            if (Utils.cellsEqual(this.cells[i], this.cells[i + 1], this.cells[i + 2]) && Utils.cellOccupied(this.cells[i])) return true;
        }
        return false;
    }

    winningColumn() {
        for (let i = 0; i < 3; i++) {
            if (Utils.cellsEqual(this.cells[i], this.cells[i + 3], this.cells[i + 6]) && Utils.cellOccupied(this.cells[i])) return true;
        }
        return false;
    }

    winningDiagonal() {
        if ((Utils.cellsEqual(this.cells[0], this.cells[4], this.cells[8]) ||
            Utils.cellsEqual(this.cells[2], this.cells[4], this.cells[6])) &&
            Utils.cellOccupied(this.cells[4])) {
            return true;
        } else {
            return false;
        }
    }

    checkForWin() {
        console.log(this.turn);
        if (this.winningRow() || this.winningColumn() || this.winningDiagonal()) {
            this.processWinner();
        } else if (this.turn === 9) {
            this.processDraw();
        }
    }

    processWinner() {
        if (this.player1) {
            this.popup({ h2: `Player 1 wins!`, p: `Congratulations!`, src: `url(./img/victory.gif)` });
            this.pointsP1++;
        } else {
            this.popup({ h2: `Computer wins!`, p: `01101100 01101111 01101100!`, src: `url(./img/robot.gif)` });
            this.pointsP2++;
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
        this.turn = 0;
    }

    changeTurn() {
        this.toggleActive();
        this.turn++;
        this.player1 = !this.player1;
    }

    toggleActive() {
        const symbolP1 = document.querySelector('#p1 .symbol');
        const symbolP2 = document.querySelector('#p2 .symbol');
        symbolP1.classList.toggle('active');
        symbolP2.classList.toggle('active');
    }

    updateScore() {
        const scoreP1 = document.querySelector('#p1 .score');
        const scoreP2 = document.querySelector('#p2 .score');
        scoreP1.innerText = this.pointsP1;
        scoreP2.innerText = this.pointsP2;
    }
}