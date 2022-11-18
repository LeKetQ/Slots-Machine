"use strict";

window.addEventListener('load', initialise);

// Global Variables
const fruitImages = ["../img/fruits/cherry.png", "../img/fruits/goldBag.png", "../img/fruits/grapefruit.png", "../img/fruits/luckySeven.png", "../img/fruits/pomegranate.png"];
let sctFruitSlots, btnRoll, btnStop, btnReplay, lblRollScore, lblRollCounter, lblScoreHistory, lblFeedback, figFeedback;
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
   sctFruitSlots = document.querySelectorAll('#fruitSlots > img');
   btnRoll = document.querySelector('#roll');
   btnStop = document.querySelector('#stop');
   btnReplay = document.querySelector('#replay');
   lblRollScore = document.querySelector('#rollScore');
   lblScoreHistory = document.querySelector('#scoreHistory');
   lblRollCounter = document.querySelector('#rollCounter');
   lblFeedback = document.querySelector('#feedbackLabel');
   figFeedback = document.querySelector('#figure');
};
// ----------------------------------------

// Cascade for 'STARTUP' or 'REPLAY' button event
function reset() {
   toggleButtonEvents();
   sctFruitSlots.forEach(slot => {
      slot.src = "../img/fruits/luckySeven.png";
      slot.classList.add('fruitImage');
   });
   rollCounter = 0;
   totalScore = 0;
   lblRollCounter.textContent = `Total rolls: ${rollCounter} / 3`;
   lblRollScore.textContent = 'Score: ';
   lblScoreHistory.textContent = 'Score history: ';
   lblFeedback.textContent = '';
   figFeedback.innerHTML = '';
};
// ----------------------------------------

// Cascade for the 'ROLL' button click event
function rollFruits() {
   interval = setInterval(randomiseFruits, 100);
   figFeedback.innerHTML = '';
   toggleButtonEvents(1);
   rollCounter++;
   lblRollCounter.textContent = `Aantal rolls: ${rollCounter} / 3`;
};
// ----------------------------------------

// Spin the fruit images randomly
function randomiseFruits() {
   sctFruitSlots.forEach(slot => {
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
   lblScoreHistory.textContent += `Game ${rollCounter}: ${rollScore}\n`;

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
      lblFeedback.textContent = `Total score: ${totalScore}`;
   }
   // Toggle buttons on end game and return messageand add a high score picture on scoring 900 points
   else {
      toggleButtonEvents(2);
      lblFeedback.textContent = `GAME OVER - Total score: ${totalScore}`;
      if(totalScore === 900){
         figFeedback.innerHTML = '<img class="fruitImage" src="./img/high-score.gif">';
      }
   }
};
// ----------------------------------------

// Add 100 points for each similar element 
function calculateScore() {
   let score = 0;
   let results = [];

   sctFruitSlots.forEach(slot => {
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



