const amountBill = document.getElementsByClassName('total-bill');
const numberOfPeople = document.getElementById('totalPeopleInput');
const numberOfTips = document.querySelectorAll('.tip-amount');
const btnSend = document.getElementById('btnSend');

// Declaring the default variables
let pressedNumber = '';
let isPressed = false;
let pressedBtnTips = numberOfTips;
let pressedIndex = -1;

/**
 * Handles numeric input events and ensures input validation.
 *
 * This function takes an event object as a parameter, typically representing a keyboard event.
 * It checks if the input is numeric and allows decimal point '.' only once.
 * When 'Backspace' is pressed, it removes the last character from the input.
 *
 * @param {Event} e The event object representing a keyboard input event.
 * @returns {void} This function does not return a value, but it modifies the 'pressedNumber' variable.
 */
function handleNumericInput(e) {
    if (
        /^\d$|\.$/.test(e.key) ||
        (e.key === '.' && !pressedNumber.includes('.'))
    ) {
        pressedNumber += e.key;
    } else if (e.key == 'Backspace') {
        pressedNumber = pressedNumber.slice(0, -1);
    }
}

/**
 * Removes a specific class from a group of buttons.
 *
 * This function iterates over a collection of buttons and removes the specified class
 * from each button. It is typically used to reset the visual state of buttons, for example,
 * removing an 'active' class after a certain action.
 *
 * @returns {void} This function does not return a value, but it modifies the classes of the buttons.
 */

function resetButtons() {
    numberOfTips.forEach((button) => {
        button.classList.remove('btn-tip-amount-active');
    });
}
