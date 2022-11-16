"use strict";

window.addEventListener('load', initialise);

// Global Variables
const availableFruitsImages = ["../img/fruits/appelsien.jpg", "../img/fruits/banaan.png", "../img/fruits/druif.jpg", "../img/fruits/kers.jpg", "../img/fruits/peer.png"];
let imgFruitsSlots;
let btnRoll, btnStop, btnReplay, lblScore, lblRollCounter, lblScoreHistory;
let interval;
let rollCounter = 0;
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
};
// ----------------------------------------

// Set starting slots image
function setStartingImages() {
   imgFruitsSlots.forEach(image => {
      image.src = "../img/casino-slot-machine.png";
      image.classList.add('fruitImages');
   });
};
// ----------------------------------------

// Cascade for the 'ROLL' button click event
function rollFruits() {
   interval = setInterval(randomiseFruits, 100);
   toggleButtons(1);
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
      toggleButtons(0);
   }
   else {
      toggleButtons(2);
   }
   lblScore.textContent = `Score: ${calculateScore()}`;
   lblScoreHistory.textContent += `*${calculateScore()}* `;
};
// ----------------------------------------

// Cascade for the 'REPLAY' button click event
function reset() {
   clearScores();
   rollCounter = 0;
   lblRollCounter.textContent = `Aantal rolls: ${rollCounter} / 3`;
   setStartingImages();
   toggleButtons();
};
// ----------------------------------------

// Toggle buttons - Remove or Add event listeners and style
function toggleButtons(input) {
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

function clearScores() {

};

