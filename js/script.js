"use strict";

window.addEventListener('load', initialise);

// Global Variables
const availableFruitImages = ["../img/fruits/appelsien.jpg", "../img/fruits/banaan.png", "../img/fruits/druif.jpg", "../img/fruits/kers.jpg", "../img/fruits/peer.png"];
let sctFruitSlots, btnRoll, btnStop, btnReplay, lblScore, lblRollCounter, lblScoreHistory, lblFeedback;
let interval, rollCounter = 0;
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
   lblScore = document.querySelector('#score');
   lblScoreHistory = document.querySelector('#scoreHistory');
   lblRollCounter = document.querySelector('#rollCounter');
   lblFeedback = document.querySelector('#feedback');
};
// ----------------------------------------

// Cascade for 'STARTUP' or 'REPLAY' button event
function reset() {
   toggleButtonEvents();
   sctFruitSlots.forEach(slot => {
      slot.src = "../img/casino-slot-machine.png";
      slot.classList.add('fruitImage');
   });
   rollCounter = 0;
   lblRollCounter.textContent = `Aantal rolls: ${rollCounter} / 3`;
   lblScore.textContent = 'Score: ';
   lblScoreHistory.textContent = 'Score historiek: ';
   lblFeedback.textContent = '';
};
// ----------------------------------------

// Cascade for the 'ROLL' button click event
function rollFruits() {
   interval = setInterval(randomiseFruits, 100);
   toggleButtonEvents(1);
   rollCounter++;
   lblRollCounter.textContent = `Aantal rolls: ${rollCounter} / 3`;
};
// ----------------------------------------

// Spin the fruit images randomly
function randomiseFruits() {
   sctFruitSlots.forEach(slot => {
      let random = Math.floor(Math.random() * availableFruitImages.length);
      slot.src = availableFruitImages[random];
   })
};
// ----------------------------------------

// Cascade for the 'STOP' button click event
function stopFruits() {
   clearInterval(interval);
   if(rollCounter < 3) {
      toggleButtonEvents(0);
   }
   else {
      toggleButtonEvents(2);
      lblFeedback.textContent = 'GAME OVER';
   }
   lblScore.textContent = `Score: ${calculateScore()}`;
   lblScoreHistory.textContent += `*${calculateScore()}* `;
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
      if (results.includes(result, results.indexOf(result) + 1)) {
         score += 100;
      }
   });
   return score;
};
// ----------------------------------------




// Toggle buttons - Remove or Add event listeners and style
// TRY AND USE PROP
// btnRoll.prop('disabled', true);
function toggleButtonEvents(input) {
   switch(input) {
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



