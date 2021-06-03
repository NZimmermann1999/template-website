let values = [];
let w = 5;
let canvas;
let states = [];

function setup() {
  var sliderUsed = false;
  var length = 185;
  values = new Array(185);
  canvas = createCanvas(values.length*w, 640);
  canvas.position((windowWidth - values.length * w)/2, (windowHeight - 500)/2);
  createArray(values.length);
  var slider = document.getElementById("slider");
  const output = document.getElementById("value-el")
  slider.oninput = function() {
    //canvas = null;
    sliderUsed = true;
    canvas = createCanvas(values.length*w, 640);
    canvas.position((windowWidth - values.length * w)/2, (windowHeight - 500)/2);
    length = this.value;
    output.innerHTML = "Array length: " + length;
    createArray(length);
    redraw();
  }
  var buttonQS = document.getElementById("quicksort");
    buttonQS.onclick = function(){ 
        sliderUsed = true;
        quickSort(values, 0, values.length - 1);
  }
  var buttonSE = document.getElementById("selectionsort");
    buttonSE.onclick = function(){ 
        sliderUsed = true;  
        selectionsort(values);
  }
  var buttonIS = document.getElementById("insertionsort");
    buttonIS.onclick = function(){ 
        sliderUsed = true;
        insertionsort(values);
  }
  var buttonBS = document.getElementById("bubblesort");
    buttonBS.onclick = function(){ 
        sliderUsed = true;
        bubblesort(values);
  }
  var reset = document.getElementById("reset");
    reset.onclick = function(){
      if (sliderUsed){
        stop();
        noLoop();
        canvas = createCanvas(values.length*w, 640);
        canvas.position((windowWidth - values.length * w)/2, (windowHeight - 500)/2);
        createArray(length);
        redraw();
      } 
      loop();
  }
}

//SETUP CALL

function createArray(value){
    values = [];
    states = [];
    for (let i = 0; i < value; i++) {
        values[i] = random(height);
        states[i] = -1;
      }
}

//SORTS

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

// END QUICKSORT

async function selectionsort(array){
  var lowest = null;
  var indicee = 0;
  var saver = 0;
  for(var z = 0; z < array.length; z++){
    states[z] = 1;
  }
  for(var i = 0; i < array.length; i++){
      lowest = null;
      for (var j = i; j < array.length; j++){
        states[j] = 1;
          if (lowest == null){
              lowest = array[j];
          }
          if (array[j] <= lowest){
              lowest = array[j];
              indicee = j;
          }
      }
      states[indicee] = 0;
      await sleep(50);
      saver = array[i];
      array[i] = array[indicee];
      array[indicee] = saver;
      states[i] = -1;
      states[indicee] = -1;
  }
  var sorted = true;
  for(var i = 0; i < array.length; i++){
      if (array[i] > array[i+1]){
          sorted = false;
      }
      else{
        states[i] = -1;
      }
  }
  return array;
}

// END SELECTIONSORT

async function insertionsort(array){
  let index = 0;
  let lowest = null; 
  let iteration = 0;
  for(var z = 0; z < array.length; z++){
    states[z] = 1;
  }
  for(var i = 0; i < array.length; i++){
      index = i;
      lowest = null;
      iteration = i;
      if (iteration == 0){
          continue
      }
      while(iteration > 0){
          if (array[iteration] < array[iteration - 1]){
              states[iteration] = 0;
              await sleep(0.5)
              lowest = array[iteration];
              array[iteration] = array[iteration - 1];
              array[iteration - 1] = lowest;
              states[iteration] = 1;
              states[iteration - 1] = 1;
              iteration--;
          }
          else{
              break;
          }
      }   
  }
  return array
}

// END INSERTIONSORT

function checkNeighbor(leftSite, rightSite){
  if (leftSite > rightSite){
      return true;
  }
  else{
      return false;
  }
}


async function bubblesort(array){
  var test_bool = false;
  while(test_bool != true){
      test_bool = true;
      for (let i = 0; i < array.length; i++){
          if (checkNeighbor(array[i], array[i+1])){
              states[i] = 0;
              await sleep(0.5);
              var saver = array[i+1];
              array[i+1] = array[i];
              array[i] = saver;
              test_bool = false;
              states[i] = 1;
              }
          }
      }
  for(var i = 0; i < array.length; i++){
    states[i] = -1;
  }
  return array;
}

// END BUBBLESORT

/* END :

  END OF SORTING ALGORITHMS

*/

async function swap(arr, a, b) {
  await sleep(25);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
  background(0);
  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#E0777D');
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}