"use strict";

window.addEventListener('load', initialise);

// Global Variables
const availableFruitsImages = ["../img/fruits/appelsien.jpg", "../img/fruits/banaan.png", "../img/fruits/druif.jpg", "../img/fruits/kers.jpg", "../img/fruits/peer.png"];
let imgFruitsSlots;
let btnRoll, btnStop, btnReplay;
let interval;
// ----------------------------------------

// Start the system
function initialise() {
   bindElements();
   setStartingImages();
   addEventListeners();
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

// Event listeners
function addEventListeners() {
   btnRoll.addEventListener('click', rollFruits);
   btnStop.addEventListener('click', stopFruits);
   btnReplay.addEventListener('click', reset);
};
// ----------------------------------------




function rollFruits() {
   btnStop.hidden = false;
   btnRoll.hidden = true;
   btnReplay.hidden = true;

   interval = setInterval(spinTheFruits, 100);
};

function stopFruits() {
   btnStop.hidden = true;
   btnRoll.hidden = false;
   btnReplay.hidden = false;

   clearInterval(interval);
   setScores();
   countTurn();
};

function reset() {
   setStartingImages();
   clearScores();
};



// Spin the fruit images randomly
function spinTheFruits() {
   imgFruitsSlots.forEach(image => {
      let random = Math.floor(Math.random() * availableFruitsImages.length);
      image.src = availableFruitsImages[random];
   })
};
// ----------------------------------------


function countTurn() {

};


function setScores() {

};

function clearScores() {

};
