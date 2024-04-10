const amountBill = document.querySelector('#totalBillInput');
const numberOfPeople = document.querySelector('#totalPeopleInput');
const numberOfTips = document.querySelectorAll('.tip-amount');
const btnSend = document.querySelector('#btnSend');
const btnReset = document.querySelector('#btnReset');
const amountTipPerPerson = document.querySelector('#tipAmountPerPerson');
const totalBillPerPerson = document.querySelector('#totalBillPerPerson');

// Declaring the default variables
let pressedNumber = '';
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

/**
 * Handles the click event of a tip button.
 *
 * This function takes an index as a parameter representing the position of the tip button in the array.
 * It resets the visual state of all tip buttons, adds an 'active' class to the clicked button,
 * updates the 'pressedIndex' variable, and logs a message indicating the button that was clicked.
 *
 * @param {number} index The index of the tip button clicked.
 * @returns {void} This function does not return a value, but it modifies the visual state of the buttons.
 */
function handleTipButtonClick(index) {
    resetButtons();
    numberOfTips[index].classList.add('btn-tip-amount-active');
    pressedIndex = index;
}

/**
 * Handles error display and styling for input fields.
 *
 * This function checks if the total bill input field or the number of people input field
 * is empty or equals '0'. If either of them is empty or '0', it displays an error message
 * and changes the border color of the corresponding input field to indicate an error.
 * Otherwise, it hides the error message and resets the border color of the input field.
 *
 * @returns {void} This function does not return a value, but it modifies the display and styling of error messages and input fields.
 */
function handleErrorText() {
    const inputs = [
        { element: amountBill, errorText: 'errorTextBill' },
        { element: numberOfPeople, errorText: 'errorTextNumberOfPeople' },
    ];

    inputs.forEach((input) => {
        const isEmpty = !input.element.value || input.element.value === '0';
        document.getElementById(input.errorText).style.display = isEmpty
            ? 'block'
            : 'none';
        input.element.style.borderColor = isEmpty ? '#b58070' : '#f2f8fc';
    });
}

/**
 * Calculates the total bill including tip and the bill per person.
 *
 * This function takes in the tip percentage as a parameter and calculates
 * the total bill before tip, the tip amount, the total bill including tip,
 * and finally the bill per person based on the total bill and the number
 * of people. It assumes the variables 'pressedNumber' and 'numberOfPeople'
 * are correctly set elsewhere in the code.
 *
 * @param {number} tipPercentage The percentage of tip to be applied to the total bill.
 * @returns {number} The bill per person after including the tip.
 */
function calculateTotalPerPerson(tipPercentage) {
    if (
        isNaN(parseFloat(pressedNumber)) ||
        parseFloat(pressedNumber) <= 0 ||
        isNaN(parseInt(numberOfPeople.value)) ||
        parseInt(numberOfPeople.value) <= 0
    ) {
        amountTipPerPerson.innerHTML = '$0.00';
        totalBillPerPerson.innerHTML = '$0.00';
        return 0;
    }

    let totalBeforeTip = parseFloat(pressedNumber);
    let tipAmount = totalBeforeTip * tipPercentage;
    let totalWithTip = totalBeforeTip + tipAmount;
    let totalPerPerson = totalWithTip / numberOfPeople.value;
    let tipAmountPerPerson = tipAmount / numberOfPeople.value;

    displayIncrementalTip(tipAmountPerPerson, totalPerPerson);

    return totalPerPerson;
}

/**
 * Displays the tip amount incrementally on the web page.
 *
 * @param {number} tipValue - The total tip value to be displayed.
 *
 * This function gradually displays the tip amount on the web page in increments of $0.01
 * until reaching the total tip value specified. If the tip value is 0, it displays "$0.00".
 * The tip amount is updated every 5 milliseconds.
 */
function displayIncrementalTip(tipValue, billPerPerson) {
    amountTipPerPerson.innerHTML = `$${tipValue.toFixed(2)}`;
    totalBillPerPerson.innerHTML = `$${billPerPerson.toFixed(2)}`;
}

/**
 * Calculates the tipAmount value and displays it on the screen as tipAmount per person.
 *
 * @param {number} tipPercentage The percentage of tip to be applied to the total bill.
 * @returns {void} This function doesn't directly return a value, but displays the tipAmount per person on the screen.
 */
function displayTipAmountPerPerson(tipPercentage) {
    calculateTotalPerPerson(tipPercentage);
    printTotalPerPersonByIndex(pressedIndex);
}

/**
 * Prints the total bill per person based on the provided tip index.
 * @param {number} index The index of the selected tip option.
 * @returns {void} This function doesn't directly return a value, but prints the total bill per person to the console.
 */
function printTotalPerPersonByIndex(index) {
    const tipPercentages = [0, 0.05, 0.1, 0.15, 0.25, 0.5];
    calculateTotalPerPerson(tipPercentages[index]);
    // if (!tipPercentages) {
    //     calculateTotalPerPerson(tipPercentages[index]);
    // }
}

// Iterates over each button in the "numberOfTips" array and adds an event listener to it.
// When a button is clicked, it invokes the "handleTipButtonClick" function with the index of the button.
numberOfTips.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleTipButtonClick(index);
    });
});

// Listens for the 'keydown' event on the amountBill input field to handle numeric input.
// Calls the handleNumericInput function to validate and process numeric entries,
// including the 'Backspace' key.
amountBill.addEventListener('keydown', handleNumericInput);

// Listens for the 'click' event on the send button to handle error messages and print total bill per person.
btnSend.addEventListener('click', function () {
    handleErrorText();
    printTotalPerPersonByIndex(pressedIndex);
});

// Listens for the 'click' event on the reset button to handle
btnReset.addEventListener('click', function () {
    amountBill.value = '';
    numberOfPeople.value = '';

    amountTipPerPerson.innerHTML = '$0.00';
    totalBillPerPerson.innerHTML = '$0.00';

    resetButtons();

    pressedNumber = '';

    const resetInputs = [
        { element: amountBill, errorText: 'errorTextBill' },
        { element: numberOfPeople, errorText: 'errorTextNumberOfPeople' },
    ];

    resetInputs.forEach((resetInput) => {
        document.getElementById(resetInput.errorText).style.display = 'none';
        resetInput.element.style.borderColor = '#f2f8fc';
    });
});
