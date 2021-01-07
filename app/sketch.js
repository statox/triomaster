const TRIOMINO_SIZE = 50;
let grid;
let ts;
let playerHand;
let player;
let computerHand;
let isFirstTurn = true;

let selectedTriomino;
let selectedCell;

let autoPlayBtn;
let drawBtn;
let resetBtn;
let slideRightBtn;
let slideLeftBtn;

function resetGame() {
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

    playerHand = new Hand(true);
    for (let i = 0; i < playerHand.initialNbOfTriominos; i++) {
        playerHand.draw();
    }
    computerHand = new Hand(false);
    for (let i = 0; i < computerHand.initialNbOfTriominos; i++) {
        computerHand.draw();
    }

    player = new Player(playerHand, drawBtn);
    computer = new Computer(computerHand);
    game = new Game(player, computer);
    game.start();
}

function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(800, 800);
    myCanvas.parent('canvasDiv');

    drawBtn = createButton('Draw');
    resetGame();

    /*
     * autoPlayBtn = createButton('Auto');
     * autoPlayBtn.mousePressed(player.chooseMoveAuto);
     */

    /*
     * resetBtn = createButton('Reset');
     * resetBtn.mousePressed(resetGame);
     */

    slideLeftBtn = createButton('');
    slideLeftBtn.class('fas fa-arrow-circle-left');
    slideLeftBtn.mousePressed(() => playerHand.slide('left'));
    slideRightBtn = createButton('');
    slideRightBtn.class('fas fa-arrow-circle-right');
    slideRightBtn.mousePressed(() => playerHand.slide('right'));
}

function draw() {
    background(50, 100, 50);
    // The sprites are used to be clickable but their drawing function
    // doesn't actually show anything
    drawSprites();

    showGameInfo();
    grid.show();
    playerHand.show();
}

function showGameInfo() {
    textSize(20);
    noStroke();
    fill(0);
    const opponentHandStr = `Computer hand: ${computer.hand.ts.length}`;
    const remainingStr = `Triominos left: ${ts.length}`;
    const playerScoreStr = `Player: ${player.score}`;
    const computerScoreStr = `Computer: ${computer.score}`;
    const debugComputerHand = computer.hand.ts.map((t) => t.values.join('')).join('-');

    const infoStr = [opponentHandStr, remainingStr].join('\t');
    const scoresStr = ['Scores: ', playerScoreStr, computerScoreStr].join('\t');

    text(infoStr, 0, height - TRIOMINO_SIZE * 2 - 55);
    text(scoresStr, 0, height - TRIOMINO_SIZE * 2 - 25);
    // text(debugComputerHand, width - textWidth(debugComputerHand), height - TRIOMINO_SIZE * 2 - 55);
}
