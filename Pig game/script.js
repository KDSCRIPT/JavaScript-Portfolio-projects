'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //little faster than querySelector
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //add class if not there and removes if is there
  player1El.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled one
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to other player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if score is greater than or equal to 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      //3.if yes current player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      //4.else switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
