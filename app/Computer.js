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
            return this.selectionMade({triomino: t, cell}, cb);
        }

        console.log('no move to play');
        if (ts.length) {
            console.log('drawing');
            this.draw();
            return cb({draw: true});
        }

        console.log('No more triominos to draw');
        return;
    };
}
