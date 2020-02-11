class Utils {
    static cellOccupied = (cell) => cell.innerText.length > 0;

    static cellsEqual = (cell1, cell2, cell3) => (cell1.innerText == cell2.innerText && cell2.innerText == cell3.innerText);
}