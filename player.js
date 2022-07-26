let min = [];
let max = [];
let sum = 0;
let indexOfA;
let min_sum;
let max_sum;
let prev_total = 0;

function sumPlayerCards() {
  sum = playerCards.reduce((acc,value) => {
    return acc + value;
  })
  playerTotal.innerHTML = sum;
  if(sum === 21) {
    setTimeout(startDealersTime,500);
  }
  if(sum > 21) {
    playerTotal.innerHTML = 'Bust! You lose...';
  }
}

function addAce() {
  min_sum = min.reduce((acc,value) => { 
    return acc + value;
  })
  max_sum = max.reduce((acc,value) => { 
    return acc + value;
  })
  if(max_sum < 21) {
    playerTotal.innerHTML = min_sum + "/" + max_sum;
  } else {
    if(max_sum === 21) {
      playerTotal.innerHTML = max_sum;
      setTimeout(startDealersTime,500);
    } if(max_sum > 21) {
      playerTotal.innerHTML = min_sum;
    } if(min_sum > 21) {
      playerTotal.innerHTML = 'Bust! You lose...';
    }
  }
}

function addNewPlayerCards() {
  new_player_card = deck.shift();
  new_div_player = document.createElement('div');
  new_div_player.className = "card";
  new_div_player.innerHTML = new_player_card;
  player_cards.appendChild(new_div_player);
  playerCards.push(new_player_card);
  convertPlayersCard();
  player_cards_count = player_cards.childElementCount;
}

function convertPlayersCard() {
  indexOfA = playerCards.indexOf('A');
  sumPlayerCards()
  if(playerCards.length >= 2) {
    for(let k = 0; k < playerCards.length; k++) {
      if(playerCards[k] === "J" || playerCards[k] === "Q" || playerCards[k] === "K") {
        playerCards[k] = 10;
      }
      sumPlayerCards() 
    }
  }
   
  if(playerCards.length === 2) {
    if(indexOfA === 0) {
      if(playerCards[1] < 10) {
        min.push(...playerCards);
        max.push(...playerCards);
        min.splice(0,1,1);
        max.splice(0,1,11);
        addAce();
      } if(playerCards[1] === "A") {
        min.push(...playerCards);
        max.push(...playerCards);
        min.splice(0,2,1,1);
        max.splice(0,2,1,11);
        addAce();
      } if(playerCards[1] === 10 || playerCards[1] === "J" || playerCards[1] === "Q" || playerCards[1] === "K") {
        playerTotal.innerHTML = "BlackJack!!";
      }
    } if(indexOfA === 1) { 
      if(playerCards[0] < 10) {
        min.push(...playerCards);
        max.push(...playerCards);
        min.splice(1,1,1);
        max.splice(1,1,11);
        addAce();
      } if(playerCards[0] === 10 || playerCards[0] === "J" || playerCards[0] === "Q" || playerCards[0] === "K") {
        playerTotal.innerHTML = "BlackJack!!";
      }
    } 
  }
}

hit.addEventListener('click',() => {
  if(player_cards_count === 0 || dealerCards.length >= 2 || sum > 21 || playerTotal.innerHTML.includes('BlackJack')) {
    return false;
  }
  addNewPlayerCards();
  addNumbers();
})

function addNumbers() {
  let last_card_num = playerCards.length - 1;
  for(let n = 0; n < last_card_num; n++) {
    prev_total += playerCards[n];
  }
  if(new_player_card === "J" || new_player_card === "Q" || new_player_card === "K") {
    new_player_card = 10;
  }
  if(min_sum >= 2 && max_sum >= 12) {
    if(new_player_card === "A") {
      new_player_card = 1;
    }
    min.push(new_player_card);
    max.push(new_player_card);
    addAce();
  }
  if(new_player_card === "A") {
    if(prev_total < 10) {
      min.push(prev_total,1);
      max.push(prev_total,11);
      addAce();
    } if(prev_total > 10) {
      playerCards[last_card_num] = 1;
      sumPlayerCards();
    } if(prev_total === 10) {
      playerCards[last_card_num] = 11;
      sumPlayerCards();
    }
  }
}

stay.addEventListener('click',() => {
  if(player_cards_count === 0 || dealerCards.length >= 2 || playerTotal.innerHTML === "BlackJack!!") {
    return false;
  }
  if(playerTotal.innerHTML === min_sum + "/" + max_sum) {
    playerTotal.innerHTML = max_sum;
  }
  setTimeout(startDealersTime,400);
})
