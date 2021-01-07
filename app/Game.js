function Game(player, computer) {
    this.player = player;
    this.computer = computer;
    this.currentPlayer;
    this.otherPlayer;
    this.blockedPlayer;
    this.winner;
    this.isOver;

    this.start = () => {
        if (!this.player || !this.computer || !this.player.hand || !this.computer.hand) {
            throw new Error('Trying to start a game without initialized players');
        }

        this.blockedPlayer = new Set();
        this.winner = undefined;
        this.isOver = false;

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
                // Current player is not blocked anymore since they were able to play
                this.blockedPlayer.delete(this.currentPlayer);
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

                // If there is no more triomino to draw and the player has to draw
                // mark them as blocked (used to compute end of game)
                if (!ts.length) {
                    const tmp = this.otherPlayer;
                    this.otherPlayer = this.currentPlayer;
                    this.currentPlayer = tmp;
                    this.blockedPlayer.add(this.currentPlayer);
                }
            }

            if (this.isGameOver()) {
                return this.stop();
            }
            return this.play();
        });
    };

    this.isGameOver = () => {
        // Stops if a player has no triomino in their hand
        if (!this.player.hand.ts.length || !this.computer.hand.ts.length) {
            // console.log('Game over - no more tiles to play');
            return true;
        }

        // Stops if both player have to draw but no more triomino are in the pile
        if (this.blockedPlayer.size === 2) {
            // console.log('Game over - both players blocked');
            return true;
        }

        return false;
    };

    this.stop = () => {
        this.isOver = true;
        if (this.player.score > this.computer.score) {
            this.winner = this.player;
        }
        if (this.computer.score > this.player.score) {
            this.winner = this.computer;
        }
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
