"use strict";

window.addEventListener('load', initialise);

// Global Variables
const availableFruitsImages = ["../img/fruits/appelsien.jpg", "../img/fruits/banaan.png", "../img/fruits/druif.jpg", "../img/fruits/kers.jpg", "../img/fruits/peer.png"];
let imgFruitsSlots, btnRoll, btnStop, btnReplay, lblScore, lblRollCounter, lblScoreHistory, lblFeedback;
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
   imgFruitsSlots = document.querySelectorAll('#fruitSlots > img');
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
   imgFruitsSlots.forEach(image => {
      image.src = "../img/casino-slot-machine.png";
      image.classList.add('fruitImages');
   });
   rollCounter = 0;
   lblRollCounter.textContent = `Aantal rolls: ${rollCounter} / 3`;
   lblScore.textContent = 'Score: ';
   lblScoreHistory.textContent = 'Score historiek: ';
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
   imgFruitsSlots.forEach(image => {
      let random = Math.floor(Math.random() * availableFruitsImages.length);
      image.src = availableFruitsImages[random];
   })
};
// ----------------------------------------

// Cascade for the 'STOP' button click event
function stopFruits() {
   clearInterval(interval);
   if (rollCounter < 3) {
      toggleButtonEvents(0);
   }
   else {
      toggleButtonEvents(2);
   }
   lblScore.textContent = `Score: ${calculateScore()}`;
   lblScoreHistory.textContent += `*${calculateScore()}* `;
};
// ----------------------------------------

// Add 100 points for each similar element 
function calculateScore() {
   let score = 0;
   let result = new Array();

   imgFruitsSlots.forEach(element => {
      result.push(element.src);
   });

   result.forEach(element => {
      if (result.includes(element, result.indexOf(element) + 1)) {
         score += 100;
      }
   });
   return score;
};
// ----------------------------------------


// Toggle buttons - Remove or Add event listeners and style
function toggleButtonEvents(input) {
   switch (input) {
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



