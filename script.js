import generatePassword from './generator.js';

// Global variables
let characterLength = 12;
let includeUpper = true;
let includeLower = true;
let includeNumbers = true;
let includeSymbols = true;

// DOM elements
const lengthSlider = document.getElementById("length-slider")
const lengthBox = document.getElementById("length-box");
const upperBox = document.getElementById("upper");
const lowerBox = document.getElementById("lower");
const numberBox = document.getElementById("number");
const symbolBox = document.getElementById("symbol");
const outputBox = document.getElementById("output");

// Display password once loaded
document.addEventListener("DOMContentLoaded", () => updatePassword())

// Refresh password when button pressed 
document.getElementById("refresh-button").addEventListener("click", () => updatePassword())

lengthSlider.addEventListener("input", () => {
    lengthBox.value = lengthSlider.value;
    characterLength = Number(lengthSlider.value);
    updatePassword();
})

lengthBox.addEventListener("input", () => {
    lengthSlider.value = lengthBox.value;
    characterLength = Number(lengthBox.value);
    updatePassword();
})

upperBox.addEventListener("change", () => {
    includeUpper = upperBox.checked;
    updatePassword();
})

lowerBox.addEventListener("change", () => {
    includeLower = lowerBox.checked;
    updatePassword();
})

numberBox.addEventListener("change", () => {
    includeNumbers = numberBox.checked;
    updatePassword();
})

symbolBox.addEventListener("change", () => {
    includeSymbols = symbolBox.checked;
    updatePassword();
})


// Update password / output
function updatePassword() {
    let password;

    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
        password = "-";
    } else if (!Number.isInteger(characterLength) || (characterLength < 4) || (characterLength > 40)) {
        password = "-";
    } else {
        password = generatePassword(characterLength, includeUpper, includeLower, includeNumbers, includeSymbols);
    }

    outputBox.textContent = `Password: ${password}`;
}