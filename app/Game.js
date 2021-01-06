function Game(player, computer) {
    this.currentPlayer = player;
    this.otherPlayer = computer;

    this.play = () => {
        this.currentPlayer.chooseMove(({triomino, cell, draw}) => {
            if (isAllowedMove(triomino, cell)) {
                if (draw) {
                    throw new Error('Move allowed after a draw. Should not happen');
                }
                const tmp = this.otherPlayer;
                this.currentPlayer.score += triomino.values.reduce((a, b) => a + b);
                this.makeMove(triomino, cell);
                this.otherPlayer = this.currentPlayer;
                this.currentPlayer = tmp;
            }

            if (draw) {
                this.currentPlayer.score -= 5;
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
        this.currentPlayer.hand.update();
    };
}
