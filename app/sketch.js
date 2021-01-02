const TRIOMINO_SIZE = 50;
let grid;
let ts;

function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(800, 800);
    myCanvas.parent('canvasDiv');

    const values = [];
    for (let a = 0; a <= 9; a++) {}
    ts = [];
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 8; i++) {
            const {x, y} = ijToxy(i, j);
            ts.push(
                new Triomino(x, y, TRIOMINO_SIZE, (i + j) % 2 === 1, combinations[(i + j * 8) % combinations.length])
            );
        }
    }

    grid = new Grid();
}

function draw() {
    background(100, 100, 100);
    grid.show();

    // ts.forEach((t) => {
    // t.show();
    // });
}
