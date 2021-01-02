function Triomino(x, y, r, pointsDown, values) {
    this.pos = new p5.Vector(x, y);
    this.r = r;
    this.values = values;
    this.pointsDown = pointsDown;
    this.selected = false;
    this.isInHand = false;

    // The sprite is used to detect the clicks
    // its draw function creates the right shape but doesn't really draw it on screen
    this.sprite = createTriangleSprite(x, y, this.r);
    this.sprite.onMousePressed = () => {
        if (this.isInHand) {
            playerHand.ts.forEach((t) => (t.selected = false));
            this.selected = true;
            selectedTriomino = this;

            placeTriomino();
        }
    };

    this.move = (x, y) => {
        this.pos.x = x;
        this.pos.y = y;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    };

    this.show = () => {
        push();
        stroke(0);
        strokeWeight(1);
        fill('rgba(200, 200, 200, 0.5)');

        if (this.selected) {
            fill('rgba(200, 200, 200, 0.8)');
        }

        // Move to the right position and rotate to point up
        translate(this.pos.x, this.pos.y);
        // If needed rotate again to point down and translate so that we are aligned with those pointing up
        if (this.pointsDown) {
            translate(0, -this.r * Math.cos(PI / 3));
            rotate(PI);
        }
        rotate(-PI / 2);

        // Draw the triangle shape
        beginShape();
        vertex(this.r, 0);
        vertex(this.r * Math.cos((2 * PI) / 3), this.r * Math.sin((2 * PI) / 3));
        vertex(this.r * Math.cos((4 * PI) / 3), this.r * Math.sin((4 * PI) / 3));
        endShape(CLOSE);

        // Drawn the values in each corners
        textSize(15);
        fill(0);
        for (let i = 0; i < this.values.length; i++) {
            push();
            rotate(-PI / 2);
            translate(-textWidth(this.values[i]) / 2, this.r - textSize());
            text(this.values[i], 0, 0);
            pop();
            rotate((2 * PI) / 3);
        }

        strokeWeight(5);
        point(0, 0);
        pop();
    };
}
