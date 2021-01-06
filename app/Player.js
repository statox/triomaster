function Player(hand, drawBtn) {
    this.score = 0;
    this.hand = hand;
    this.chosenMove = {triomino: null, cell: null};
    this.drawBtn = drawBtn;

    this.chooseMove = (cb) => {
        this.hand.ts.forEach((triominoInHand) => {
            this.setTriominoCallback(triominoInHand);
        });

        for (let j = 0; j < grid.cells.length; j++) {
            for (let i = 0; i < grid.cells[j].length; i++) {
                const cellInGrid = grid.cells[j][i];
                cellInGrid.sprite.parentCell = cellInGrid;
                cellInGrid.sprite.onMousePressed = (thisSprite) => {
                    const chosenCell = thisSprite.parentCell;
                    return this.selectionMade({cell: chosenCell}, cb);
                };
            }
        }

        this.drawBtn.mousePressed(() => {
            this.draw();
            return cb({draw: true});
        });
    };

    this.selectionMade = ({triomino, cell}, cb) => {
        // Always select a triomino when clicked
        if (triomino) {
            this.hand.select(triomino);
            this.chosenMove.triomino = triomino;
        }
        // Only allow to select a cell if a triomino has already been chosen
        // When both have been chose make the move
        if (this.chosenMove.triomino && cell) {
            this.chosenMove.cell = cell;
            return cb(this.chosenMove);
        }

        return;
    };

    this.setTriominoCallback = (triominoInHand, cb) => {
        triominoInHand.sprite.parentTriomino = triominoInHand;
        triominoInHand.sprite.onMousePressed = (thisSprite) => {
            const chosenTriomino = thisSprite.parentTriomino;
            return this.selectionMade({triomino: chosenTriomino}, cb);
        };
    };

    this.draw = () => {
        const newT = this.hand.draw();
        this.setTriominoCallback(newT);
    };
}
