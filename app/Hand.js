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

    this.show = () => {
        fill(50);
        rect(0, height - TRIOMINO_SIZE * 2, width, TRIOMINO_SIZE * 2);

        this.ts.forEach((t) => t.show());
    };
}
