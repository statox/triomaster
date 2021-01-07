function Game(player, computer) {
    this.player = player;
    this.computer = computer;
    this.currentPlayer;
    this.otherPlayer;

    this.start = () => {
        if (!this.player || !this.computer || !this.player.hand || !this.computer.hand) {
            throw new Error('Trying to start a game without initialized players');
        }

        // Compute the initial points and the starting player
        const playerTriples = this.player.hand.getTriples();
        const computerTriples = this.computer.hand.getTriples();

        // console.log('player', this.player.hand.ts.map((t) => t.values.join('')).join(' '));
        // console.log('comput', this.computer.hand.ts.map((t) => t.values.join('')).join(' '));

        if (!playerTriples.length && computerTriples.length) {
            // console.log('player no triples - computer tripples, choosing computer');
            this.currentPlayer = this.computer;
            this.otherPlayer = this.player;
            this.currentPlayer.score += 10;
        } else if (playerTriples.length && !computerTriples.length) {
            // console.log('player triples - computer no tripples, choosing player');
            this.currentPlayer = this.player;
            this.otherPlayer = this.computer;
            this.currentPlayer.score += 10;
        } else if (playerTriples.length && computerTriples.length) {
            // console.log('Both players tripples - choosing');
            const playerMaxTriple = getMaxTriomino(playerTriples);
            const computerMaxTriple = getMaxTriomino(computerTriples);

            if (computerMaxTriple.getNumericalValue() > playerMaxTriple.getNumericalValue()) {
                // console.log('Choosing computer');
                this.currentPlayer = this.computer;
                this.otherPlayer = this.player;
            } else {
                // console.log('Choosing player');
                this.currentPlayer = this.player;
                this.otherPlayer = this.computer;
            }
            this.currentPlayer.score += 10;
        } else {
            // console.log('no tripples at all - choosing');
            const playerMax = getMaxTriomino(player.hand.ts);
            const computerMax = getMaxTriomino(computer.hand.ts);

            if (computerMax.getNumericalValue() > playerMax.getNumericalValue()) {
                // console.log('Choosing computer');
                this.currentPlayer = this.computer;
                this.otherPlayer = this.player;
            } else {
                // console.log('Choosing player');
                this.currentPlayer = this.player;
                this.otherPlayer = this.computer;
            }
        }

        return this.play();
    };

    this.play = () => {
        this.currentPlayer.chooseMove(({triomino, cell, draw}) => {
            if (isAllowedMove(triomino, cell)) {
                if (draw) {
                    throw new Error('Move allowed after a draw. Should not happen');
                }
                // If the first player triomino is triple zero there is a 30 points bonus
                if (
                    isFirstTurn &&
                    triomino.values[0] === 0 &&
                    triomino.values[0] === triomino.values[1] &&
                    triomino.values[0] === triomino.values[2]
                ) {
                    this.currentPlayer.score += 30;
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
