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
const securityText = document.querySelector("#security span");

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
    let security;

    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
        password = "-";
        security = "-";
    } else if (!Number.isInteger(characterLength) || (characterLength < 4) || (characterLength > 40)) {
        password = "-";
        security = "-";
    } else {
        let results = generatePassword(characterLength, includeUpper, includeLower, includeNumbers, includeSymbols);
        password = results[0];
        
        // Determine the security of the password using entropy
        let entropy = characterLength * Math.log2(results[1]);
        if (entropy < 28) security = 1;
        if (entropy >= 28 && entropy < 36) security = 2;
        if (entropy >= 36 && entropy < 60) security = 3;
        if (entropy >= 60 && entropy < 80) security = 4;
        if (entropy >= 80) security = 5;
    }

    // Display new password
    outputBox.querySelector("#password").textContent = password;

    // Display security indicator
    if (security == 1) {
        securityText.textContent = "Very Weak";
        securityText.style.color = "#cc0000";
    } else if (security == 2) {
        securityText.textContent = "Weak";
        securityText.style.color = "#d57c34";
    } else if (security == 3) {
        securityText.textContent = "Moderate";
        securityText.style.color = "#c1b227";
    } else if (security == 4) {
        securityText.textContent = "High";
        securityText.style.color = "#38761d";
    } else if (security == 5) {
        securityText.textContent = "Very High";
        securityText.style.color = "#0b5394";
    } else {
        securityText.textContent = "-";
        securityText.style.color = "black";
    }
}