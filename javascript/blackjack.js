//Buttons to play Blackjack with.
const playButton = document.getElementById('play-button');
const passButton = document.getElementById('pass-button');
const replayButton = document.getElementById('replay-button');

//Paragraphs to display the dealer and player's hand.
const cardHand = document.getElementsByClassName('card-hand');

//Deck of cards, using standard unicode cards.
class DeckOfCards {
    constructor () {
        //Array of unicode characters for the deck. Note that last hex is an indicator of the card, the second to last a hex is for which card type.
        //1 = ace, 2 = 2, etc.. A = 10, B = jack, D = queen, E = king. C is knight, but we dont use that.
        this._spades = ['1F0A1','1F0A2','1F0A3','1F0A4','1F0A5','1F0A6','1F0A7','1F0A8','1F0A9', '1F0AA','1F0AB', '1F0AD','1F0AE'];
        this._hearts = ['1F0B1','1F0B2','1F0B3','1F0B4','1F0B5','1F0B6','1F0B7','1F0B8','1F0B9', '1F0BA','1F0BB', '1F0BD','1F0BE'];
        this._diamonds = ['1F0C1','1F0C2','1F0C3','1F0C4','1F0C5','1F0C6','1F0C7','1F0C8','1F0C9', '1F0CA','1F0CB', '1F0CD','1F0CE'];
        this._clubs = ['1F0D1','1F0D2','1F0D3','1F0D4','1F0D5','1F0D6','1F0D7','1F0D8','1F0D9','1F0DA','1F0DB','1F0DD','1F0DE'];
    }
    //Empty array to later store a shuffled deck into.
    #shuffledDeck = []
    
    get showDeck() {
        //Return all the cards in the deck as an array.
         return this._spades.concat(this._hearts, this._diamonds, this._clubs);
    }

    get shuffledDeck(){
        return this.#shuffledDeck;
    }

    shuffleDeck() {
        //Set shuffledDeck to a random array of all 52 cards within the class's values.
        //First, ensure the shuffleDeck of the object is empty.
        this.#shuffledDeck = []
        //Now, get a deck.
        var staticDeck = this.showDeck
        //Cardcounter to check how many cards we've iterated through. Also to prevent an infinite loop which is most likely bound to happen once or twice.
        let cardCounter = 0;
        //While either value's false, go through staticDeck, and add a random card to shuffleDeck and remove this random card from newDeck to prevent duplicates.
        while(staticDeck.length != 0 && cardCounter < 100){
            var cardToManipulateIndex = Math.floor(Math.random() * staticDeck.length)
            this.#shuffledDeck.push(staticDeck[cardToManipulateIndex]);
            staticDeck.splice(cardToManipulateIndex, 1);
            cardCounter++;
        }
    }

    drawCard() {
        //Return a card from a non-empty deck. Otherwise run shuffleDeck and return a card afterwards.
        if(this.#shuffledDeck.length > 0) {
            return this.#shuffledDeck.pop()
        }  else {
            this.shuffleDeck();
            return this.#shuffledDeck.pop()
        }
    }
}

//Class for player/dealer.
class Player {
    constructor(name){
        this._name = name;
        this._hand = [];
        this._score = 0;
        //Check for if the player hasn't skipped a turn, used to obsfuscate the last played card in the hand later on.
        this._freshTurn = true;
    }
    
    get hand(){
        return this._hand;
    }
    set hand(newArr){
        this._hand = newArr;
    }
    get name(){
        return this._name;
    }
    get score(){
        return this._score;
    }
    set score(newScore){
        this._score = newScore;
    }
    get freshTurn(){
        return this._freshTurn;
    }
    set freshTurn(update){
        this._freshTurn = update;
    }
    addCard(card){
        //Add card to the hand.
        this._hand.push(card);
    }
    removeCard(card){
        //Remove card from the hand.
        this._hand.slice(this._hand.indexOf(card), 1)
    }
    updateHand(){
        if(this._name === 'Dealer'){
            //Check if the element is visible, if not make it so.
            cardHand[0].style.visibility != "visible" ? cardHand[0].style.visibility = "visible" : 0;
            //Update the current player's hand and show it readable on screen.
            cardHand[0].innerHTML = ''
            //Check if the player's the dealer. If so, obfuscate the newest card with Playing Card Black Unicode (&#x1F0A0;) without messing up the hand data.
            for(let cardCount = 0; cardCount < this._hand.length;cardCount++){
                if(cardCount === this._hand.length - 1 && this.freshTurn === true){
                    cardHand[0].innerHTML += '&#x1F0A0;';
                } else {
                    cardHand[0].innerHTML += `&#x${this._hand[cardCount]};`
                }
            }
        } else {
            cardHand[1].style.visibility != "visible" ? cardHand[1].style.visibility = "visible" : 0;
            cardHand[1].innerHTML = ''
            this._hand.forEach(card => {
                cardHand[1].innerHTML += `&#x${card};`
            });
        }  
    }
}
        

//Class for point tally and played hands.
class Table {
    constructor(dealerMinimum){
        //Minimum amount of points a dealer has to play towards.
        this._dealerMinimum = dealerMinimum;
    }

    get dealerMinimum(){
        return this._dealerMinimum;
    }

    /*Return the amount of points the card should give.
    Array of valid 10-pointers, as noted in DeckOfCards. Aces are handled in checkPoints. If the partial hex is in the array, return 10.
    Otherwise return the substring converted to Number.*/
    calculateCardPoints = (card) => ['A','B','D','E'].includes(card.substring(4)) ? 10 : card.substring(4) * 1;

    //Return the sum of all points in one of the two points values.
    pointsSum = (accumulator, added) => accumulator + added;

    checkPoints(hand) {
        //return the sum of points, and add points when aces are applicable.
        //First, get the points from the hand and push it to a pointsArray.
        let pointsArray = []
        hand.forEach(card => {
            pointsArray.push(this.calculateCardPoints(card));
        });
        //Now, sort the array in descending order so that aces get applied fairly.
        pointsArray.sort().reverse();
        //For aces, check 
        var pointSum = pointsArray.reduce(this.pointsSum, 0);
        //After making the sum of points, check if the sum is less than 12. If it is, you can add 10 more to compensate for the ace.
        pointsArray.forEach(point => {
            point === 1 && pointSum < 12 ? pointSum += 10 : 0; 
        });
        return pointSum
    }

    playCard(player){
        //Play card on the table.
        //Check first the decks are empty, if so, deal 2 cards. Continue with 1 card per turn otherwise.
        if(player.hand.length < 1) {
            player.addCard(blackjackDeck.drawCard());
            player.addCard(blackjackDeck.drawCard());
            player.score = this.checkPoints(player.hand);
            playButton.innerHTML = "Hit";
            passButton.style.display = "inline-block";
        } else {
            //Draw a card.
            player.addCard(blackjackDeck.drawCard());
            player.score = this.checkPoints(player.hand);
        }
    }

}
//Make a blackjackDeck Class to play Blackjack with.
const blackjackDeck = new DeckOfCards();
//Also make a player class to use.
const player = new Player('Player');
//And a dealer.
const dealer = new Player('Dealer');
//Lastly, a table to play upon.
const blackjackTable = new Table(16);



function finishGame(winner){
    //Finish the game, popping off the relevant alert and display the right buttons.
    playButton.style.display = "none"
    passButton.style.display = "none"
    replayButton.style.display = "inline-block"
    //Don't forget to deobfuscate the dealer's hand so the player knows what the dealer drew if they lost.
    dealer.freshTurn = false;
    dealer.updateHand();
    alert(winner.name + " wins!");
}

function updatePlayButton() {
    //Check if the dealer's score is less than the player's, and below the minimum. If so, let the dealer play.
    if( dealer.score <= blackjackTable.dealerMinimum && player.score >= dealer.score && dealer.score < 22){
        dealer.freshTurn = true;
        blackjackTable.playCard(dealer);
    }
    blackjackTable.playCard(player);
    //Update the hand, then check if someone has either a blackjack or dealt too much. If so, finish the game.
    dealer.updateHand();
    player.updateHand();
    if(dealer.score === 21 || player.score > 21){
        finishGame(dealer);
    } else if(player.score === 21 || dealer.score > 21){
        finishGame(player);
    }
    dealer.freshTurn = false;
}

playButton.addEventListener("click", updatePlayButton);

function updatePassButton() {
    //Skip the player's turn, and let the dealer play if they're able to.
    if( dealer.score <= blackjackTable.dealerMinimum || player.score >= dealer.score && dealer.score < 21){
        dealer.freshTurn = true;
        blackjackTable.playCard(dealer);
    }
    //Update the hand, then check if someone has either a blackjack or dealt too much. If so, finish the game.
    dealer.updateHand();
    if(dealer.score === 21 || player.score > 21){
        finishGame(dealer);
    } else if(dealer.score > player.score && dealer.score > 16 && dealer.score < 22){
        //Also making sure the dealer has a higher score than the player, but not above the max of 21.
        finishGame(dealer);
    } else if(player.score === 21 || dealer.score > 21){
        finishGame(player);
    }
    dealer.freshTurn = false;
}

passButton.addEventListener("click", updatePassButton);

function resetGame() {
    //Reset the game after the game's finished.
    dealer.hand = [];
    dealer.score = 0;
    player.hand = [];
    player.score = 0;
    blackjackDeck.shuffleDeck();
    blackjackTable.playCard(dealer);
    blackjackTable.playCard(player);
    dealer.freshTurn = true;
    dealer.updateHand();
    player.updateHand();
    replayButton.style.display = "none"
    playButton.style.display = "inline-block"
    passButton.style.display = "inline-block"
}

replayButton.addEventListener("click", resetGame);