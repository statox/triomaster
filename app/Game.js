function Game() {
    this.playerHand = new Hand(true);
    for (let i = 0; i < this.playerHand.initialNbOfTriominos; i++) {
        this.playerHand.draw();
    }

    this.computerHand = new Hand(false);
    for (let i = 0; i < this.computerHand.initialNbOfTriominos; i++) {
        this.computerHand.draw();
    }

    this.show = () => {
        this.playerHand.show();
        this.computerHand.show();
    };
}
