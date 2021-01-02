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

function keyPressed() {
    if (keyCode === LEFT_ARROW && selectedTriomino) {
        selectedTriomino.turnLeft();
    }
}

function unselectTriomino() {
    if (selectedTriomino) {
        selectedTriomino.unselect();
    }

    playerHand.ts.forEach((t) => t.unselect());
}
function unselectCell() {
    if (selectedCell) {
        selectedCell.unselect();
    }
}
function unselectEverything() {
    unselectTriomino();
    unselectCell();
}

function placeTriomino() {
    if (!isAllowedMove(selectedTriomino, selectedCell)) {
        unselectEverything();
        return;
    }

    selectedCell.triomino = selectedTriomino;
    selectedTriomino.move(selectedCell.pos.x, selectedCell.pos.y);
    selectedTriomino.pointsDown = selectedCell.pointsDown;
    playedTs.push(selectedTriomino);
    selectedTriomino.isPlayed = true;

    unselectEverything();

    if (ts.length) {
        const randI = parseInt(random(ts.length));
        const t = ts.splice(randI, 1)[0];
        playerHand.add(t);
    }
}

function isAllowedMove(triomino, cell) {
    if (!triomino || !cell) {
        return false;
    }

    // Don't allow placing a triomino on an already filled cell
    if (cell.triomino) {
        return false;
    }

    // On the first turn allow placing anywhere
    if (isFirstTurn) {
        isFirstTurn = false;
        return true;
    }

    for (let i = 0; i < 3; i++) {
        if (testMatch(triomino, cell)) {
            return true;
        }
        triomino.turnLeft();
    }
    return false;
}
function testMatch(triomino, cell) {
    const neighbors = grid.getNeighbors(cell.i, cell.j);
    // Object.values(neighbors).forEach((c) => (c.selected = true));

    // Don't allow placing on a cell with no neighbors
    if (Object.values(neighbors).filter((c) => !c.triomino).length === Object.values(neighbors).length) {
        return false;
    }
    const {right, left, top, bottom} = neighbors;
    if (right && right.triomino) {
        const rt = right.triomino;
        if (cell.pointsDown && (triomino.values[2] != rt.values[0] || triomino.values[0] != rt.values[2])) {
            return false;
        }
        if (!cell.pointsDown && (triomino.values[0] != rt.values[1] || triomino.values[1] != rt.values[0])) {
            return false;
        }
    }

    if (left && left.triomino) {
        const lt = left.triomino;
        if (!cell.pointsDown && (triomino.values[2] != lt.values[0] || triomino.values[0] != lt.values[2])) {
            return false;
        }
        if (cell.pointsDown && (triomino.values[0] != lt.values[1] || triomino.values[1] != lt.values[0])) {
            return false;
        }
    }

    if (top && top.triomino) {
        const tt = top.triomino;
        if (triomino.values[1] != tt.values[2] || triomino.values[2] != tt.values[1]) {
            return false;
        }
    }

    if (bottom && bottom.triomino) {
        const bt = bottom.triomino;
        if (triomino.values[1] != bt.values[2] || triomino.values[2] != bt.values[1]) {
            return false;
        }
    }

    return true;
}
