const PI = 3.141592653589793;
const xOffset = TRIOMINO_SIZE * Math.sin(PI / 3);
const yOffset = TRIOMINO_SIZE + TRIOMINO_SIZE * Math.cos(PI / 3);

function ijToxy(i, j) {
    let x = xOffset + i * xOffset;
    let y = yOffset + j * yOffset;

    return {x, y};
}

function xyToij(x, y) {
    let i = parseInt(x / xOffset);
    let j = 1;
    return {i, j};
}

function mouseClicked() {
    grid.cells.forEach((l) => {
        l.forEach((c) => {
            c.selected = false;
        });
    });

    const {i, j} = xyToij(mouseX, mouseY);

    console.log({mouseX, mouseY, i, j});
    grid.cells[j][i].selected = true;
}
