function createTriangleSprite(x, y, r) {
    const sprite = createSprite(x, y, r, r);

    sprite.draw = () => {
        noStroke();
        noFill();

        // Move to the right position and rotate to point up
        // translate(this.pos.x, this.pos.y);
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
    };

    return sprite;
}
