function Hand(isPlayerHand) {
    this.offset = 0; // Used the slide the triominos
    this.initialNbOfTriominos = 9;
    this.ts = [];
    this.isPlayerHand = isPlayerHand;
    this.baseY = isPlayerHand ? height - TRIOMINO_SIZE : -TRIOMINO_SIZE;

    this.add = (t) => {
        t.pointsDown = false;
        t.isInHand = true;
        const x = xOffset + this.ts.length * xOffset * 2;
        const y = this.baseY;
        t.move(x, y);
        this.ts.push(t);
    };

    this.select = (selectedTriomino) => {
        this.ts.forEach((t) => {
            t.selected = t.values.join() === selectedTriomino.values.join();
        });
    };

    this.getTriples = () => this.ts.filter((t) => t.values[0] === t.values[1] && t.values[1] === t.values[2]);

    // Used after a triomino is placed
    // Make sure the played triominos are removed from the hand
    // and move the remaining ones to fill the gap left by the played one
    this.update = () => {
        this.ts = this.ts.filter((t) => {
            if (t.isPlayed) {
                t.isInHand = false;
                return false;
            }
            return true;
        });

        for (let i = 0; i < this.ts.length; i++) {
            const x = xOffset + i * xOffset * 2 + this.offset;
            const y = this.baseY;
            const t = this.ts[i];
            t.move(x, y);
        }
    };

    // Move the triominos left and right to be able to see the ones out of screen
    this.slide = (direction) => {
        if (!['left', 'right'].includes(direction)) {
            return;
        }
        this.offset += direction === 'right' ? -TRIOMINO_SIZE : TRIOMINO_SIZE;
    };

    // If there are remaining triominos in the game draw one and add it to the hand
    this.draw = () => {
        if (!ts.length) {
            return;
        }
        const randI = parseInt(random(ts.length));
        const t = ts.splice(randI, 1)[0];
        this.add(t);
        return t;
    };

    this.show = () => {
        this.update();
        if (this.isPlayerHand) {
            fill(50);
            rect(0, height - TRIOMINO_SIZE * 2, width, TRIOMINO_SIZE * 2);

            this.ts.forEach((t) => t.show());
        }
    };
}
