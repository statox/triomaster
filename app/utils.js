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
    if (keyCode === LEFT_ARROW) {
        playerHand.slide('left');
    }
    if (keyCode === RIGHT_ARROW) {
        playerHand.slide('right');
    }
    // SPACE
    if (keyCode === 32) {
        player.draw();
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
        triomino.rotate();
    }
    return false;
}

function testMatch(triomino, cell) {
    const neighbors = grid.getNeighbors(cell.i, cell.j);

    // Don't allow placing on a cell with no neighbors
    if (Object.values(neighbors).filter((c) => !c.triomino).length === Object.values(neighbors).length) {
        return false;
    }

    // For all 3 corners, check that the adjacent values are the same
    for (let c = 0; c < 3; c++) {
        if (grid.getNeighborsValuesForCorner(cell.i, cell.j, c).some((v) => v !== triomino.values[c])) {
            return false;
        }
    }

    return true;
}

function getMaxTriomino(ts) {
    return ts.reduce((max, curr) => {
        if (curr.getNumericalValue() > max.getNumericalValue()) {
            return curr;
        }
        return max;
    }, ts[0]);
}
