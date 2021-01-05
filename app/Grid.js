const TOP = 0;
const BOTTOM_RIGHT = 1;
const BOTTOM_LEFT = 2;
const BOTTOM = 0;
const TOP_LEFT = 1;
const TOP_RIGHT = 2;

function Grid() {
    this.W = 17;
    this.H = 8;

    this.cells = [];
    for (let j = 0; j < this.H; j++) {
        this.cells.push([]);
        for (let i = 0; i < this.W; i++) {
            this.cells[j].push(new Cell(i, j, TRIOMINO_SIZE));
        }
    }

    // Given the coordinates i, j of a cell return its three adjacent neighbors
    // Top, left and right for cells pointing down
    // Bottom, left and right for cells pointing up
    this.getNeighbors = (i, j) => {
        const n = {};
        if (i > 0) {
            n.left = this.cells[j][i - 1];
        }
        if (i < this.W - 1) {
            n.right = this.cells[j][i + 1];
        }
        if (this.cells[j][i].pointsDown && j > 0) {
            n.top = this.cells[j - 1][i];
        }
        if (!this.cells[j][i].pointsDown && j < this.H - 1) {
            n.bottom = this.cells[j + 1][i];
        }

        return n;
    };

    // Given some coordinates i, j return the corresponding cell on the grid
    // or undefined if the coordinates are out of grid
    this.getCell = (i, j) => {
        if (i < 0 || i >= this.W || j < 0 || j >= this.H) {
            return;
        }
        return this.cells[j][i];
    };

    // Given the coordinates of a cell and one of its three corners return the value of the corner
    // valid corner values are BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT, TOP, TOP_LEFT and TOP_RIGHT
    this.getCellCorner = (i, j, c) => {
        const cell = this.getCell(i, j);
        if (!cell || !cell.triomino) {
            return;
        }
        return cell.triomino.values[c];
    };

    // Given the coordinates of a cell and one of its corner
    // return a list of the values of other cells touching this corner
    // Each corner has up to 5 valid adjacent values
    this.getNeighborsValuesForCorner = (i, j, c) => {
        if (this.cells[j][i].pointsDown) {
            if (c === BOTTOM) {
                return [
                    this.getCellCorner(i + 1, j, BOTTOM_LEFT),
                    this.getCellCorner(i + 1, j + 1, TOP_LEFT),
                    this.getCellCorner(i, j + 1, TOP),
                    this.getCellCorner(i - 1, j + 1, TOP_RIGHT),
                    this.getCellCorner(i - 1, j, BOTTOM_RIGHT)
                ].filter((c) => c !== undefined);
            }
            if (c === TOP_LEFT) {
                return [
                    this.getCellCorner(i - 1, j, TOP),
                    this.getCellCorner(i - 2, j, TOP_RIGHT),
                    this.getCellCorner(i - 2, j - 1, BOTTOM_RIGHT),
                    this.getCellCorner(i - 1, j - 1, BOTTOM),
                    this.getCellCorner(i, j - 1, BOTTOM_LEFT)
                ].filter((c) => c !== undefined);
            }
            if (c === TOP_RIGHT) {
                return [
                    this.getCellCorner(i, j - 1, BOTTOM_RIGHT),
                    this.getCellCorner(i + 1, j - 1, BOTTOM),
                    this.getCellCorner(i + 2, j - 1, BOTTOM_LEFT),
                    this.getCellCorner(i + 2, j, TOP_LEFT),
                    this.getCellCorner(i + 1, j, TOP)
                ].filter((c) => c !== undefined);
            }
        }

        // If it's not down then it's up
        if (c === TOP) {
            return [
                this.getCellCorner(i - 1, j, TOP_RIGHT),
                this.getCellCorner(i - 1, j - 1, BOTTOM_RIGHT),
                this.getCellCorner(i, j - 1, BOTTOM),
                this.getCellCorner(i + 1, j - 1, BOTTOM_LEFT),
                this.getCellCorner(i + 1, j, TOP_LEFT)
            ].filter((c) => c !== undefined);
        }
        if (c === BOTTOM_RIGHT) {
            return [
                this.getCellCorner(i + 1, j, BOTTOM),
                this.getCellCorner(i + 2, j, BOTTOM_LEFT),
                this.getCellCorner(i + 2, j + 1, TOP_LEFT),
                this.getCellCorner(i + 1, j + 1, TOP),
                this.getCellCorner(i, j + 1, TOP_RIGHT)
            ].filter((c) => c !== undefined);
        }
        if (c === BOTTOM_LEFT) {
            return [
                this.getCellCorner(i, j + 1, TOP_LEFT),
                this.getCellCorner(i - 1, j + 1, TOP),
                this.getCellCorner(i - 2, j + 1, TOP_RIGHT),
                this.getCellCorner(i - 2, j, BOTTOM_RIGHT),
                this.getCellCorner(i - 1, j, BOTTOM)
            ].filter((c) => c !== undefined);
        }

        return;
    };

    this.show = () => {
        for (l of this.cells) {
            for (cell of l) {
                cell.show();
            }
        }
    };
}
