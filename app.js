import * as readline from "node:readline/promises"

const secretNumber = Math.floor(Math.random() * 100) + 1

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(
    "Welcome to the Number Guessing Game!\n" +
    "I'm thinking of a number between 1 and 100.\n"
)
console.log(
    "Please select the difficulty level:\n" +
    "1. Easy (10 chances)\n" +
    "2. Medium (5 chances)\n" +
    "3. Hard (3 chances)"
)

let diff

//Asking difficulty until input is valid
while (true) {
    const answer = await rl.question("\nEnter your choice: ")
    diff = Number(answer)

    if (Number.isInteger(diff) && diff >= 1 && diff <= 3) {
        break
    }

    console.log("Invalid input. Please enter a number between 1 and 3.")
}

let chances

switch (diff) {
    case 1:
        chances = 10    
        console.log(
            "\nGreat! You have selected the easy difficulty level.\n" +
            "Let's start the game!"
        )
        break
    case 2:
        chances = 5
        console.log(
            "\nGreat! You have selected the medium difficulty level.\n" +
            "Let's start the game!"
        )
        break
    case 3:
        chances = 3
        console.log(
            "\nGreat! You have selected the hard difficulty level.\n" +
            "Let's start the game!"
        )
        break
}

let won = false

for (let i = 0; i < chances; i++) {
    const guess = await rl.question("\nEnter your guess: ")
    const validGuess = Number(guess)

    if (!Number.isInteger(validGuess) || validGuess < 1 || validGuess > 100) {
        console.log("Invalid guess. Please enter a number between 1 and 100.")
        i--
        continue
    }

    if (validGuess === secretNumber) {
        console.log(`Congratulations! You guessed the correct number in ${i + 1} attempts.`)
        won = true
        break
    } else if (validGuess > secretNumber) {
        console.log(`Incorrect! The number is less than ${validGuess}.`)
    } else {
        console.log(`Incorrect! The number is greater than ${validGuess}.`)
    }
}

if (!won) {
    console.log(`\nGame over! The correct number was ${secretNumber}.`)
}

rl.close()