"use strict"

let color = "#f7f7f7";
let state = false;
let shade = false;

//DOM
const btnSetGrid = document.querySelector(".btn-grid");
const btnRandomColor = document.querySelector(".btn-random");
const btnColor = document.querySelector(".btn-color");
const btnShade = document.querySelector(".btn-shade");
const colors = document.querySelector(".color-picker");
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

function setRandomColor() {
    let r = Math.ceil(Math.random() * 255);
    let g = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    let color = `rgb(${r}, ${g}, ${b})`;

    return color;
}

function changeColor() {
    if(state) {
        this.style.backgroundColor = setRandomColor();
    } else {
        this.style.backgroundColor = color;
    }
    
    if(shade) {
        let brightness = Number(this.style.filter.slice(11, -1));
        if(brightness <= 1 && brightness >= 0) {
            this.style.filter = `brightness(${brightness - 0.1})`;
        }
    }
}

//UI
function setupDefault() {
    setMode("default");
    for(let i = 1; i <= (16 * 16); i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.addEventListener("mouseover", changeColor);
        div.style.cssText = `min-width: calc(700px/${16}); min-height: calc(700px/${16}); box-shadow: inset 0 0 1px rgb(237, 76, 103, .4); flex-grow: 1; filter: brightness(1)`
        grid.appendChild(div);
    }
}

function setGrid() {
    clearGrid();
    let number = getGrid();
    
    for(let i = 1; i <= (number * number); i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.addEventListener("mouseover", changeColor);
        div.style.cssText = `min-width: calc(700px/${number}); min-height: calc(700px/${number}); box-shadow: inset 0 0 1px rgb(237, 76, 103, .3); flex-grow: 1; filter: brightness(1)`;
        grid.appendChild(div);
    }
}

function setMode(mode) {
    const modeSpan = document.querySelector(".mode");
    modeSpan.innerText = mode;
}


//Event Listeners
btnSetGrid.addEventListener("click", setGrid);
window.addEventListener("load", setupDefault)

colors.addEventListener("change", (e) => {
    setMode("custom");
    color = e.target.value;
})

btnRandomColor.addEventListener("click", () => {
    state = !state;
    shade = false;
    setMode("random");
});

btnShade.addEventListener("click", () => {
    state = false;
    shade = !shade;
    setMode("shader");
})