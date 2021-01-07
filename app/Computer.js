function Computer(hand) {
    Player.call(this, hand);

    this.chooseMove = (cb) => {
        let handIndex = 0;
        const possibleMoves = [];

        if (isFirstTurn) {
            const cell = grid.cells[parseInt(grid.H / 2)][parseInt(grid.W / 2)];
            const triomino = this.hand.ts[0];
            return this.selectionMade({triomino, cell}, cb);
        }

        for (let handIndex = 0; handIndex < this.hand.ts.length; handIndex++) {
            const t = this.hand.ts[handIndex];
            for (l of grid.cells) {
                for (cell of l) {
                    if (isAllowedMove(t, cell)) {
                        possibleMoves.push({t, cell});
                    }
                }
            }
        }

        if (possibleMoves.length > 0) {
            const {t, cell} = possibleMoves[parseInt(Math.random() * possibleMoves.length) % possibleMoves.length];
            //console.log('COMPUTER playing', t.values, [cell.i, cell.j].join(','));
            return this.selectionMade({triomino: t, cell}, cb);
        }

        //console.log('COMPUTER no move to play');
        if (ts.length) {
            //console.log('COMPUTER drawing');
            this.draw();
            return cb({draw: true});
        }

        //console.log('COMPUTER No more triominos to draw');
        return;
    };
}
