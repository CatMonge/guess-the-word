const guessedLetter = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessedLetterInput = document.querySelector(".letter");
const wordsInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again")

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word){
const placeholderLetters = [];
for (const letters of word){
console.log(letters);
placeholderLetters.push("●");
}
wordsInProgress.innerText = placeholderLetters.join("●");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
e.preventDefault();
message.innertext = "";
const guess = guessedLetterInput.value;
console.log(guess);
guessedLetterInput.value = "";

const inputResults = inputValidation(guess);
makeGuess(inputResults)
//console.log (inputResults);
});

const inputValidation = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1){
        message.innerText = "Please enter only 1 letter at a time";
    }else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z";
    }
    
    return input;
};

const makeGuess = function(guess){
guess = guess.toUpperCase();

if (guessedLetters.includes(guess)){
    message.innerText = "You've already guessed that letter";
}else {
    guessedLetters.push(guess)
    console.log(guessedLetters);
}
return guess;
};