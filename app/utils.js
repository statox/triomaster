const PI = 3.141592653589793;
const xOffset = TRIOMINO_SIZE * Math.sin(PI / 3);
const yOffset = TRIOMINO_SIZE + TRIOMINO_SIZE * Math.cos(PI / 3);

function ijToxy(i, j) {
    let x = xOffset + i * xOffset;
    let y = yOffset + j * yOffset;

    return {x, y};
}

function xyToij(x, y) {
    let i = parseInt(x / xOffset);
    let j = 1;
    return {i, j};
}

function placeTriomino() {
    if (!selectedCell || !selectedTriomino) {
        return;
    }

    // Don't allow placing a triomino on an already filled cell
    if (selectedCell.triomino) {
        return;
    }

    selectedCell.triomino = selectedTriomino;
    selectedTriomino.move(selectedCell.pos.x, selectedCell.pos.y);
    selectedTriomino.pointsDown = selectedCell.pointsDown;
    selectedCell.selected = false;
    selectedTriomino.selected = false;
    selectedTriomino.isInHand = false;
    selectedCell = undefined;
    selectedTriomino = undefined;
}
