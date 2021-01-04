const TRIOMINO_SIZE = 50;
let grid;
let ts;
let playerHand;
let playedTs;
let isFirstTurn = true;

let selectedTriomino;
let selectedCell;

let autoPlayBtn;
let drawBtn;
let resetBtn;

function resetGame() {
    ts = [];
    playedTs = [];
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 8; i++) {
            const {x, y} = ijToxy(i, j);
            ts.push(
                new Triomino(x, y, TRIOMINO_SIZE, (i + j) % 2 === 1, combinations[(i + j * 8) % combinations.length])
            );
        }
    }

    grid = new Grid();

    playerHand = new Hand();
    for (let i = 0; i < 6; i++) {
        drawTriomino();
    }
}

function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(800, 800);
    myCanvas.parent('canvasDiv');

    resetGame();

    autoPlayBtn = createButton('Auto');
    autoPlayBtn.mousePressed(autoPlay);

    drawBtn = createButton('Draw');
    drawBtn.mousePressed(drawTriomino);

    resetBtn = createButton('Reset');
    resetBtn.mousePressed(resetGame);
}

function draw() {
    background(100, 100, 100);
    // The sprites are used to be clickable but their drawing function
    // doesn't actually show anything
    drawSprites();

    grid.show();

    playerHand.show();

    playedTs.forEach((t) => {
        t.show();
    });
}
