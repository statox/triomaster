function Triomino(x, y, r, pointsDown, values) {
    this.pos = new p5.Vector(x, y);
    this.r = r;
    this.values = values;
    this.pointsDown = pointsDown;

    this.show = () => {
        push();
        stroke(0);
        strokeWeight(1);
        fill('rgba(200, 200, 200, 0.5)');

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
