const start = document.getElementById('start');
const reset = document.getElementById('reset');
const new_game = document.getElementById('new_game');
const random = document.getElementById('random');
const player_cards = document.getElementById('player-cards');
const dealer_cards = document.getElementById('dealer-cards');
const stay = document.getElementById('stay');
const hit = document.getElementById('hit');
const playerTotal = document.getElementById('player-total');
const dealerTotal = document.getElementById('dealer-total');
let number = document.getElementById('deck');
let player_cards_count = 0;

const cards = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
const deck = [];
let deckNumber = 1;
let playerCards = [];
let cardsArray = [];
let new_player_card;
let new_div_player;

function createDeckOfCards() {
  number.addEventListener('change',() => {
    deckNumber = number.value;
    deck.length = 0;
    playerTotal.innerHTML;
    
    switch(deckNumber) {
      case "one":
        deckNumber = 1;
        break;
      case "two":
        deckNumber = 2;
        break;
      case "three":
        deckNumber = 3;
        break;
      case "four":
        deckNumber = 4;
        break;
      case "five":
        deckNumber = 5;
        break;
      case "six":
        deckNumber = 6;
        break;
      case "seven":
        deckNumber = 7;
        break;
      case "eight":
        deckNumber = 8;
        break;
    }
    let total = deckNumber * 4;
    for(let i = 0; i < cards.length; i++) {
      let allCards = Array(total).fill(cards[i]);
      allCards.forEach((card,index,array) => {
        deck.unshift(card);
        shuffleArray(deck);
      })
    }
  });
}
createDeckOfCards();

start.addEventListener("click",() => {
  let selection_value = number.value;
  console.log(deck)
  if(!selection_value) {
    return false;
  }
  if(selection_value) {
    startGame();
    start.disabled = true;
    reset.disabled = false;
  }
})

function shuffleArray(deck) {
  deck.sort(() => Math.random() - 0.5);
}

function startGame() {
  for(let k = 0; k < 2; k++) {
    addNewPlayerCards();
  }
  addNewDealerCards();
}

reset.addEventListener('click',() => {
  resetGame()
})

function resetGame() {
  clearHands()
  document.form.reset();
  start.disabled = false;
  deck.length = 0;
}

function startNewGame() {
  new_game.addEventListener('click',() => {
    if(playerTotal.innerHTML === "Bust! You lose..." || playerTotal.innerHTML > dealerTotal.innerHTML || dealerTotal.innerHTML > playerTotal.innerHTML || dealerTotal.innerHTML === playerTotal.innerHTML) {
      clearHands();
      setTimeout(startGame,1000);
      return true;
    }
  })
}

startNewGame()

function clearHands() {
  dealerCards = [];
  playerCards = [];
  min.length = 0;
  max.length = 0;
  min_sum = 0;
  max_sum = 0;
  dealer_min = [];
  dealer_max = [];
  prev_sum = 0;
  prev_total = 0;
  dealerTotal.innerHTML = "";
  playerTotal.innerHTML = "";
  for(let p = player_cards.childNodes.length-1; p >= 0; p--) {
    player_cards.removeChild(player_cards.childNodes[p]);
  }
  for(let d = dealer_cards.childNodes.length-1; d >= 0; d--) {
    dealer_cards.removeChild(dealer_cards.childNodes[d]);
  }
}
