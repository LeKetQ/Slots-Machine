"use strict";

window.addEventListener('load', initialise);

// Global Variables
const fruitImages = ["./img/fruits/cherry.png", "./img/fruits/goldBag.png", "./img/fruits/grapefruit.png", "./img/fruits/luckySeven.png", "./img/fruits/pomegranate.png"];
let divFruitSlots, divButtons, divFeedback; 
let btnRoll, btnStop, btnReplay, lblRollScore, lblRollCounter, lblScoreHistory, lblTotalScore, lblGameOver, figFeedback, ulGameScore;
let interval, rollCounter = 0, totalScore = 0;
// ----------------------------------------

// Start the system
function initialise() {
   bindElements();
   reset();
};
// ----------------------------------------

// Element binding
function bindElements() {
   divFruitSlots = document.querySelectorAll('img');

   divButtons = document.querySelectorAll('button');
   btnRoll = divButtons[0];
   btnStop = divButtons[1];
   btnReplay = divButtons[2];

   divFeedback = document.querySelectorAll('label');
   lblRollScore = divFeedback[0];
   lblRollCounter = divFeedback[1];
   lblGameOver = divFeedback[2];
   lblTotalScore = divFeedback[3];
   lblScoreHistory = divFeedback[4];

   figFeedback = document.querySelector('figure');
   
   ulGameScore = document.querySelector('ul');
};
// ----------------------------------------

// Cascade for 'STARTUP' or 'REPLAY' button event
function reset() {
   toggleButtonEvents();
   divFruitSlots.forEach(slot => {
      slot.src = "./img/fruits/luckySeven.png";
      slot.classList.add('fruitImage');
   });
   rollCounter = 0;
   totalScore = 0;
   lblRollCounter.textContent = `Total rolls: ${rollCounter} / 3`;
   lblRollScore.textContent = 'Score: ';
   lblScoreHistory.textContent = 'Score history: ';
   lblTotalScore.textContent = 'Total score: ';
   lblGameOver.textContent = '';
   ulGameScore.innerHTML = '';
   figFeedback.innerHTML = '';
};
// ----------------------------------------

// Cascade for the 'ROLL' button click event
function rollFruits() {
   interval = setInterval(randomiseFruits, 100);
   toggleButtonEvents(1);
   figFeedback.innerHTML = '';
   rollCounter++;
   lblRollCounter.textContent = `Total rolls: ${rollCounter} / 3`;
};
// ----------------------------------------

// Spin the fruit images randomly
function randomiseFruits() {
   divFruitSlots.forEach(slot => {
      let random = Math.floor(Math.random() * fruitImages.length);
      slot.src = fruitImages[random];
   })
};
// ----------------------------------------

// Cascade for the 'STOP' button click event
function stopFruits() {
   let rollScore = 0;
   clearInterval(interval);
   rollScore = calculateScore();
   totalScore += rollScore;
   lblRollScore.textContent = `Score: ${rollScore}`;

   // Create score history list
   ulGameScore.appendChild(createGameScoreListItem(rollCounter, rollScore));
   lblScoreHistory.appendChild(ulGameScore);

   // Add a picture on winning roll
   switch(rollScore){
      case 200:
         figFeedback.innerHTML = '<img class="fruitImage" src="./img/winner.gif">';
         break;
      case 300:
         figFeedback.innerHTML = '<img class="fruitImage" src="./img/jackpot.gif">';
         break;
      default:
         figFeedback.innerHTML = '';
         break;
   }

   // Toggle buttons when game is in play, and return total score
   if(rollCounter < 3) {
      toggleButtonEvents(0);
      lblTotalScore.textContent = `Total score: ${totalScore}`;
   }
   // Toggle buttons on end game, return message and add a high score picture on scoring 900 points
   else {
      toggleButtonEvents(2);
      lblTotalScore.textContent = `Total score: ${totalScore}`;
      lblGameOver.innerHTML = `<strong class="highlight">GAME OVER</strong>`;
      if(totalScore === 900){
         figFeedback.innerHTML = '<img class="fruitImage" src="./img/highScore.gif">';
      }
   }
};
// ----------------------------------------

// Add 100 points for each similar element 
function calculateScore() {
   let score = 0;
   let results = [];

   divFruitSlots.forEach(slot => {
      results.push(slot.src);
   });

   results.forEach(result => {
      if(results.includes(result, results.indexOf(result) + 1)) {
         score += 100;
      }
   });
   return score;
};
// ----------------------------------------

// Create list element for the score history
function createGameScoreListItem(roll, score) {
   let listItem = document.createElement('li');
   listItem.textContent += `Game ${roll}: ${score}`;
   return listItem;
};
// ----------------------------------------

// Toggle buttons - Remove or Add event listeners and style
function toggleButtonEvents(input) {
   switch(input) {
         // GAME IN PROGRESS - 'ROLL' and 'REPLAY' buttons available
      case 0:
         btnRoll.addEventListener('click', rollFruits);
         btnRoll.classList.add('btn-pink');
         btnRoll.classList.remove('disabled');

         btnStop.removeEventListener('click', stopFruits);
         btnStop.classList.remove('btn-yellow');
         btnStop.classList.add('disabled');

         btnReplay.addEventListener('click', reset);
         btnReplay.classList.add('btn-grey');
         btnReplay.classList.remove('disabled');
         break;

         // GAME IN PROGRESS - 'STOP' button only
      case 1:
         btnRoll.removeEventListener('click', rollFruits);
         btnRoll.classList.remove('btn-pink');
         btnRoll.classList.add('disabled');

         btnStop.addEventListener('click', stopFruits);
         btnStop.classList.add('btn-yellow');
         btnStop.classList.remove('disabled');

         btnReplay.removeEventListener('click', reset);
         btnReplay.classList.remove('btn-grey');
         btnReplay.classList.add('disabled');
         break;

         // GAME OVER - 'REPLAY' button only
      case 2:
         btnRoll.removeEventListener('click', rollFruits);
         btnRoll.classList.remove('btn-pink');
         btnRoll.classList.add('disabled');

         btnStop.removeEventListener('click', stopFruits);
         btnStop.classList.remove('btn-yellow');
         btnStop.classList.add('disabled');

         btnReplay.addEventListener('click', reset);
         btnReplay.classList.add('btn-grey');
         btnReplay.classList.remove('disabled');
         break;

         // NEW GAME - 'ROLL' button only
      default:
         btnRoll.addEventListener('click', rollFruits);
         btnRoll.classList.add('btn-pink');
         btnRoll.classList.remove('disabled');

         btnStop.removeEventListener('click', stopFruits);
         btnStop.classList.remove('btn-yellow');
         btnStop.classList.add('disabled');

         btnReplay.removeEventListener('click', reset);
         btnReplay.classList.remove('btn-grey');
         btnReplay.classList.add('disabled');
         break;
   }
};
// ----------------------------------------



