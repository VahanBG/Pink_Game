'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scor0El = document.querySelector('#score--0');
const scor1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scor0El.textContent = 0;
  scor1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--actyve');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rollin dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //  current0El.textContent = currentScore; ///we will change later
    } else {
      //swich to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active players scor
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player scor id >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
