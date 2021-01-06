function Computer(hand) {
    Player.call(this, hand);

    this.chooseMove = (cb) => {
        let handIndex = 0;
        const possibleMoves = [];

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
            console.log('COMPUTER playing', t.values, [cell.i, cell.j].join(','));
            return this.selectionMade({triomino: t, cell}, cb);
        }

        console.log('COMPUTER no move to play');
        if (ts.length) {
            console.log('COMPUTER drawing');
            this.draw();
            return cb({draw: true});
        }

        console.log('COMPUTER No more triominos to draw');
        return;
    };
}
