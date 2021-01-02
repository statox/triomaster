function Hand() {
    this.ts = [];
    this.add = (t) => {
        t.pointsDown = false;
        t.isInHand = true;
        const x = xOffset + this.ts.length * xOffset * 2;
        const y = height - TRIOMINO_SIZE;
        t.move(x, y);
        this.ts.push(t);
    };

    this.update = () => {
        this.ts = this.ts.filter((t) => {
            if (t.isPlayed) {
                t.isInHand = false;
                return false;
            }
            return true;
        });

        for (let i = 0; i < this.ts.length; i++) {
            const x = xOffset + i * xOffset * 2;
            const y = height - TRIOMINO_SIZE;
            const t = this.ts[i];
            t.move(x, y);
        }
    };

    this.show = () => {
        this.update();
        fill(50);
        rect(0, height - TRIOMINO_SIZE * 2, width, TRIOMINO_SIZE * 2);

        this.ts.forEach((t) => t.show());
    };
}
