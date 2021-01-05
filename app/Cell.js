function Cell(i, j, r) {
    this.i = i;
    this.j = j;
    this.r = r;
    const {x, y} = ijToxy(i, j);
    this.pos = new p5.Vector(x, y);
    this.pointsDown = (i + j) % 2 === 1;
    this.selected = false;
    this.triomino;

    // The sprite is used to detect the clicks
    // its draw function creates the right shape but doesn't really draw it on screen
    this.sprite = createTriangleSprite(x, y, this.r);

    this.sprite.onMousePressed = () => {
        grid.cells.forEach((l) => {
            l.forEach((c) => {
                c.selected = false;
            });
        });

        this.select();
        placeTriomino();
    };

    this.select = () => {
        if (!selectedTriomino) {
            return;
        }
        selectedCell = this;
        this.selected = true;
    };

    this.unselect = () => {
        if (selectedCell) {
            selectedCell = undefined;
        }
        this.selected = false;
    };

    this.show = () => {
        push();
        stroke('rgba(0, 0, 0, 0.1)');
        strokeWeight(1);
        noFill();

        if (this.selected) {
            fill('rgba(50, 200, 50, 0.3)');
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
        pop();

        if (this.triomino) {
            this.triomino.show();
        }
    };
}
