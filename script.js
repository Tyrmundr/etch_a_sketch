"use strict"

//DOM
const btnSetGrid = document.querySelector(".btn-grid");
const btnColor = document.querySelector(".btn-color");
const btnShade = document.querySelector(".btn-shade");
const grid = document.querySelector(".grid");

//Game Logic
function getGrid() {
    let cells = Number(prompt("Number between 1-100"));
    if(cells < 1 || cells > 100 || isNaN(cells)) {
        alert("Number must be between 1-100!");
        return;
    }
    return cells;
}

function clearGrid() {
    let i = 0;
    while(grid.childElementCount > 0) {
        grid.removeChild(grid.lastElementChild);
        i++
    }
}

//UI
function setupDefault() {
    for(let i = 1; i <= (64 * 64); i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.cssText = `min-width: calc(700px/${64}); min-height: calc(700px/${64}); box-shadow: inset 0 0 1px rgb(237, 76, 103, .4); flex-grow: 1;`
        grid.appendChild(div);
    }
}

function setGrid() {
    clearGrid();
    let number = getGrid();
    
    for(let i = 1; i <= (number * number); i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.cssText = `min-width: calc(700px/${number}); min-height: calc(700px/${number}); box-shadow: inset 0 0 1px rgb(237, 76, 103, .3); flex-grow: 1;`
        grid.appendChild(div);
    }
}


//Event Listeners
btnSetGrid.addEventListener("click", setGrid);
window.onload(setupDefault());