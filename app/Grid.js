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

    this.show = () => {
        for (l of this.cells) {
            for (cell of l) {
                cell.show();
            }
        }
    };
}
