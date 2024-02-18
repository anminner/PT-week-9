class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.cardDeck();
        this.shuffle();
    }


// Cards in standard 52 card deck
    cardDeck() {
        let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

// Shuffle cards
    shuffle() {
    
    }

    dealCard() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }

    playCard() {
        return this.hand.pop();
    }
}

class Game {
    constructor(player1Name, player2Name) {
        this.players = [new Player(player1Name), new Player(player2Name)];
        this.deck = new Deck();
    }

    // Play WAR
    startGame() {
        this.dealCards();
        this.playRounds();
        this.displayScoreAndWinner();
    }

    dealCards() {
        for (let i = 0; i < 26; i++) {
            for (let player of this.players) {
                player.hand.push(this.deck.dealCard());
            }
        }
    }

    playRounds() {
        for (let i = 0; i < 26; i++) {
            let [card1, card2] = this.players.map(player => player.playCard());
            if (this.compareCards(card1, card2) > 0) {
                this.players[0].score++;
            } else if (this.compareCards(card1, card2) < 0) {
                this.players[1].score++;
            }
        }
    }

    compareCards(card1, card2) {
        const values = { "J": 11, "Q": 12, "K": 13, "A": 14 };
        const value1 = values[card1.rank] || parseInt(card1.rank);
        const value2 = values[card2.rank] || parseInt(card2.rank);
        return value1 - value2;
    }

    // Score & winner
    displayScoreAndWinner() {
        let [player1, player2] = this.players;
        console.log(`${player1.name} scored ${player1.score} points.`);
        console.log(`${player2.name} scored ${player2.score} points.`);
        if (player1.score > player2.score) {
            console.log(`${player1.name} wins!`);
        } else if (player1.score < player2.score) {
            console.log(`${player2.name} wins!`);
        } 
    }
}

const game = new Game("Player 1", "Player 2");
game.startGame();

