const amountBill = document.getElementsByClassName('total-bill');
const numberOfPeople = document.getElementById('totalPeopleInput');
const numberOfTips = document.querySelectorAll('.tip-amount');
const btnSend = document.getElementById('btnSend');

// Declaring the default variables
let pressedNumber = '';
let isPressed = false;
let pressedBtnTips = numberOfTips;
let pressedIndex = -1;
