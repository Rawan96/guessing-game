const readline = require('readline');
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let secretNumber;
let numAttempts;

// Function to generate a random integer between min and max
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to check if input is a valid number
function isValidNumber(input) {
    return !isNaN(input) && Number.isInteger(Number(input));
}

// Function to check the user's guess
function checkGuess(num) {
    if (num > secretNumber) {
        console.log("Too high.");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low.");
        return false;
    } else {
        console.log("Correct!");
        return true
    }
}

// Function to ask the user for a guess
function askGuess() {
    if (numAttempts === 0) {
        console.log("You Lose! The secret number was:", secretNumber);
        rl.close();
        return;
    }

    rl.question('Enter your guess: ', (input) => {
        if (!isValidNumber(input)) {
            console.log("Invalid input. Please enter a valid number.");
            askGuess();
            return;
        }

        let userGuess = Number(input);
        numAttempts--;

        if (checkGuess(userGuess)) {
            console.log('You win!');
            rl.close();
        } else if (numAttempts > 0) {
            askGuess();
        } else {
            console.log("You Lose! The secret number was:", secretNumber);
            rl.close();
        }
    })
}

// Function to ask the user for the number of attempts
function askLimit() {
    rl.question('Enter the number of attempts: ', (limitInput) => {
        if (!isValidNumber(limitInput) || Number(limitInput) <= 0) {
            console.log("Invalid input. Please enter a positive integer.");
            askLimit();
            return;
        }
        numAttempts = Number(limitInput);
        askRange()
    })
}


// Function to ask for min and max range, then set the secret number
function askRange() {
    rl.question('Enter a max number: ', (maxInput) => {
        if (!isValidNumber(maxInput)) {
            console.log("Invalid input. Please enter a valid number.");
            askRange();
            return;
        }

        const maxNumber = Number(maxInput);

        rl.question('Enter a min number: ', (minInput) => {
            if (!isValidNumber(minInput)) {
                console.log(" Invalid input. Please enter a valid number.");
                askRange();
                return;
            }

            const minNumber = Number(minInput);

            if (minNumber >= maxNumber) {
                console.log("Invalid range. Min must be less than Max.");
                askRange();
                return;
            }

            secretNumber = randomInRange(minNumber, maxNumber);
            console.log(`🤔 I'm thinking of a number between ${minNumber} and ${maxNumber}. Try to guess it!`);
            askGuess()
        })
    })
}

// Start the game
console.log("🎮 Welcome to the Number Guessing Game!");
askLimit()