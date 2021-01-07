const TRIOMINO_SIZE = 50;
let grid;
let ts;
let playerHand;
let player;
let computerHand;
let isFirstTurn;

let autoPlayBtn;
let drawBtn;
let resetBtn;
let slideRightBtn;
let slideLeftBtn;

function resetGame() {
    for (sprite of getSprites()) {
        sprite.remove();
    }
    if (grid && grid.cells.length) {
        for (let j = grid.H - 1; j >= 0; j--) {
            for (let i = grid.W; i >= 0; i--) {
                delete grid.cells[j][i];
            }
        }
    }

    ts = [];
    for (combination of combinations) {
        ts.push(new Triomino(0, 0, TRIOMINO_SIZE, false, combination));
    }
    isFirstTurn = true;

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

    resetBtn.hide();
    drawBtn.show();
    slideLeftBtn.show();
    slideRightBtn.show();
}

function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(800, 800);
    myCanvas.parent('canvasDiv');

    /*
     * autoPlayBtn = createButton('Auto');
     * autoPlayBtn.mousePressed(player.chooseMoveAuto);
     */

    drawBtn = createButton('Draw');
    resetBtn = createButton('Reset');
    resetBtn.mousePressed(resetGame);

    slideLeftBtn = createButton('');
    slideLeftBtn.class('fas fa-arrow-circle-left');
    slideLeftBtn.mousePressed(() => playerHand.slide('left'));
    slideRightBtn = createButton('');
    slideRightBtn.class('fas fa-arrow-circle-right');
    slideRightBtn.mousePressed(() => playerHand.slide('right'));

    resetGame();
}

function draw() {
    background(50, 100, 50);
    // The sprites are used to be clickable but their drawing function
    // doesn't actually show anything
    drawSprites();

    grid.show();
    playerHand.show();
    showGameInfo();
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

    if (game.isOver) {
        fill(250);
        const gameOverBaseHeight = height - 120;
        const gameOverText = 'GAME OVER';
        text(gameOverText, width / 2 - textWidth(gameOverText) / 2, gameOverBaseHeight);
        let winnerText = 'Equality';
        if (game.winner instanceof Player) {
            winnerText = 'You win!';
        }
        if (game.winner instanceof Computer) {
            winnerText = 'Computer wins!';
        }
        text(winnerText, width / 2 - textWidth(winnerText) / 2, gameOverBaseHeight + 40);
        const scoreText = `${game.player.score} - ${game.computer.score}`;
        text(scoreText, width / 2 - textWidth(scoreText) / 2, gameOverBaseHeight + 80);

        resetBtn.show();
        drawBtn.hide();
        slideLeftBtn.hide();
        slideRightBtn.hide();
    }
}
