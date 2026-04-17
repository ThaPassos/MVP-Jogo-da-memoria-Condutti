// botão iniciar
function startGame() {
  window.location.href = "game.html"; // muda pra sua página do jogo
}


// =======================
// LÓGICA DO JOGO
// =======================

const cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// adiciona clique em todos os cards
cards.forEach(card => {
  card.addEventListener("click", flipCard);
});

// virar carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// checar se é par
function checkMatch() {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// se acertou
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  pairsFound++;
  document.getElementById("pairs").textContent = pairsFound;

  // venceu o jogo
  if (pairsFound === totalPairs) {
    clearInterval(timerInterval);
    
    setTimeout(() => {
      document.getElementById("winModal").classList.remove("hidden");
document.getElementById("finalTime").textContent = formatTime(time);
    }, 500);
  }

  resetBoard();
}

// se errou
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

// reset
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


// =======================
// EMBARALHAR CARTAS
// =======================

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// roda quando abre a página
shuffle();

let time = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = formatTime(time);
  }, 1000);
}

// inicia o timer quando abre a página
startTimer();

let pairsFound = 0;
const totalPairs = 8;

function restartGame() {
  window.location.href = "index.html"; // ou reiniciar o jogo
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}