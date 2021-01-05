function Game(player, computer) {
    this.currentPlayer = player;
    this.otherPlayer = computer;

    this.play = () => {
        this.currentPlayer.chooseMove(({triomino, cell, draw}) => {
            if (draw || isAllowedMove(triomino, cell)) {
                const tmp = this.otherPlayer;
                if (!draw) {
                    this.makeMove(triomino, cell);
                }

                this.otherPlayer = this.currentPlayer;
                this.currentPlayer = tmp;
            }

            this.play();
        });
    };

    this.makeMove = (triomino, cell) => {
        cell.triomino = triomino;
        triomino.move(cell.pos.x, cell.pos.y);
        triomino.pointsDown = cell.pointsDown;
        triomino.isPlayed = true;
        triomino.selected = false;
    };
}
