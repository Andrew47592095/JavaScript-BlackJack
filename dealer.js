let dealerCards = [];
let new_dealer_card;
let new_div_dealer;
let dealer_min_sum = 0;
let dealer_max_sum = 0;
let dealer_sum = 0;
let prev_sum;

function startDealersTime() {
  addNewDealerCards();
}

function addNewDealerCards() {
  new_dealer_card = deck.shift();
  new_div_dealer = document.createElement('div');
  new_div_dealer.className = "card";
  new_div_dealer.innerHTML = new_dealer_card;
  dealer_cards.appendChild(new_div_dealer);
  dealerCards.push(new_dealer_card);
  if(dealerCards.length >= 2) {
    convertDealersCards()
  }
}

let dealer_min = [];
let dealer_max = [];

function convertDealersCards() {
  calculateDealerCards();
}

function convertAce() {
  if(dealerCards[0] === "A" ) {
    if(dealerCards[1] === 10 || dealerCards[1] === "J" || dealerCards[1] === "Q" || dealerCards[1] === "K") {
      dealerTotal.innerHTML = "Dealer gets BlackJack...";
      return true;
    } if(dealerCards[1] < 10) {
      dealer_min.push(dealerCards[0],dealerCards[1]);
      dealer_max.push(dealerCards[0],dealerCards[1]);
      dealer_min.splice(0,1,1);
      dealer_max.splice(0,1,11);
    } 
    if(dealerCards[1] === "A") {
      dealer_min.push(dealerCards[0],dealerCards[1]);
      dealer_max.push(dealerCards[0],dealerCards[1]);
      dealer_min.splice(0,2,1,1);
      dealer_max.splice(0,2,1,11);
    }
  } if(dealerCards[1] === "A") {
    if(dealerCards[0] === 10 || dealerCards[0] === "J" || dealerCards[0] === "Q" || dealerCards[0] === "K") {
      dealerTotal.innerHTML = "Dealer gets BlackJack...";
      return true;
    } if(dealerCards[0] < 10) {
      dealer_min.push(dealerCards[0],dealerCards[1]);
      dealer_max.push(dealerCards[0],dealerCards[1]);
      dealer_min.splice(1,1,1);
      dealer_max.splice(1,1,11);
    }
  }  
  reduceAce()
}

function joinAce() {
  dealer_min_sum = dealer_min.reduce((acc,value) => { 
    return acc + value;
  })
  dealer_max_sum = dealer_max.reduce((acc,value) => { 
    return acc + value;
  })
  dealerTotal.innerHTML = dealer_min_sum + "/" + dealer_max_sum;
}

function sumDealerCards() {
  for(let k = 0; k < dealerCards.length; k++) {
    if(dealerCards[k] === "J" || dealerCards[k] === "Q" || dealerCards[k] === "K") {
      dealerCards[k] = 10;
    } 
  }
}

function calculateDealerCards() {
  for(let k = 0; k < dealerCards.length; k++) {
    if(dealerCards[k] === "J" || dealerCards[k] === "Q" || dealerCards[k] === "K") {
      dealerCards[k] = 10;
    } 
  }
  let last_card = dealerCards.length - 1;
  prev_sum = 0;
  for(let h = 0; h < last_card; h++) {
    prev_sum += dealerCards[h];
  }
  if(new_dealer_card === "A" && dealerCards.length > 2) {
    if(prev_sum === 10) {
      dealerCards[last_card] = 11;
    }
    if(prev_sum < 10 ) {
      dealer_min.push(prev_sum,new_dealer_card);
      dealer_max.push(prev_sum,new_dealer_card);
      dealer_min.splice(1,1,1);
      dealer_max.splice(1,1,11);
      reduceAce();
    }
    if(prev_sum > 10) {
      dealerCards[last_card] = 1;
    }
  }
  dealer_sum = dealerCards.reduce((acc,value) => {
    return acc + value;
  })
  if(dealerCards[0] === "A" || dealerCards[1] === "A") {
    if(dealerCards.length === 2) {
      convertAce();
    }
  }
  
  if(dealer_sum < 17) {
    setTimeout(addNewDealerCards,1000);
    dealerTotal.innerHTML = dealer_sum;
  }
  if(dealer_sum >= 17) {
    dealerTotal.innerHTML = dealer_sum;
    setTimeout(compareNumbers,1000);
  }
  if(dealer_sum > 21) {
    dealerTotal.innerHTML = "Dealer Busted. Player Won!!";
  }
}

function reduceAce() {
  dealer_min_sum = dealer_min.reduce((acc,value) => { 
    return acc + value;
  })
  dealer_max_sum = dealer_max.reduce((acc,value) => { 
    return acc + value;
  })
  dealerTotal.innerHTML = dealer_min_sum + "/" + dealer_max_sum;
  if(dealer_max_sum > 21) {
    dealerTotal.innerHTML = dealer_min_sum;
  }
  decideDealersAction()
}

function decideDealersAction() {
  let counterId;
  if(dealer_max_sum < 17 || dealer_max_sum > 21 && dealer_min_sum < 17) {
    counterId = setTimeout(function() {
      addNewDealerCards();
      if(new_dealer_card === "A") {
        new_dealer_card = 1;
      }
      dealer_min.push(new_dealer_card);
      dealer_max.push(new_dealer_card);
      reduceAce()
    },1000);
  }
  if(dealer_max_sum >= 17 && dealer_max_sum <= 21) {
    clearTimeout(counterId);
    dealerTotal.innerHTML = dealer_max_sum;
    setTimeout(compareNumbers,1000);
    return true;
  }
}

function compareNumbers() {
  if(dealerTotal.innerHTML >= 17 && dealerTotal.innerHTML <= 21) {
    if(playerTotal.innerHTML > dealerTotal.innerHTML) {
      alert('Player won!!')
    } if(dealerTotal.innerHTML > playerTotal.innerHTML) {
      alert('Dealer won....')
    } if(dealerTotal.innerHTML === playerTotal.innerHTML) {
      alert('Push....')
    }
  }
}
