function Hand() {
    this.offset = 0; // Used the slide the triominos
    this.ts = [];

    this.add = (t) => {
        t.pointsDown = false;
        t.isInHand = true;
        const x = xOffset + this.ts.length * xOffset * 2;
        const y = height - TRIOMINO_SIZE;
        t.move(x, y);
        this.ts.push(t);
    };

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
            const y = height - TRIOMINO_SIZE;
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

    this.show = () => {
        this.update();
        fill(50);
        rect(0, height - TRIOMINO_SIZE * 2, width, TRIOMINO_SIZE * 2);

        this.ts.forEach((t) => t.show());
    };
}
