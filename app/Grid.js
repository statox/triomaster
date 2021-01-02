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

    this.show = () => {
        for (l of this.cells) {
            for (cell of l) {
                cell.show();
            }
        }
    };
}
