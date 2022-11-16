"use strict";

window.addEventListener('load', initialise);

// Global Variables
const availableFruitsImages = ["../img/fruits/appelsien.jpg", "../img/fruits/banaan.png", "../img/fruits/druif.jpg", "../img/fruits/kers.jpg", "../img/fruits/peer.png"];
let imgFruitsSlots;
let btnRoll, btnStop, btnReplay;
let interval;
let turnCounter = 0;
// ----------------------------------------

// Start the system
function initialise() {
   bindElements();
   setStartingImages();
   resetButtons();
};
// ----------------------------------------

// Element binding
function bindElements() {
   imgFruitsSlots = document.querySelectorAll('#fruitSlots > img');
   btnRoll = document.querySelector('#roll');
   btnStop = document.querySelector('#stop');
   btnReplay = document.querySelector('#replay');
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

// Reset buttons on startup and stop
function resetButtons() {
   btnRoll.addEventListener('click', rollFruits);
   btnRoll.classList.add('btn-pink');
   btnStop.classList.add('disabled');
   btnReplay.classList.add('disabled');
};
// ----------------------------------------

// Cascade for the 'ROLL' button click event
function rollFruits() {
   interval = setInterval(randomiseFruits, 100);
   toggleButtons(1);
   turnCounter++;
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
   if(turnCounter < 3){
      toggleButtons(0);
   }
   else{
      toggleButtons();
   }
   setScores();
};
// ----------------------------------------

// Cascade for the 'REPLAY' button click event
function reset() {
   clearScores();
   turnCounter = 0;
   setStartingImages();
   resetButtons();
};
// ----------------------------------------

// Toggle buttons - Remove or Add event listeners and style
function toggleButtons(input) {
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

      default:
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
   }
};
// ----------------------------------------



function setScores() {

};

function clearScores() {

};

