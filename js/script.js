const letterGuess = document.querySelector(".guessed-letters");
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
for (const letter of word){
console.log(letter);
placeholderLetters.push("●");
}

wordsInProgress.innerText = placeholderLetters.join("");

};

placeholder(word);

guessButton.addEventListener("click", function(e){
e.preventDefault();
message.innertext = "";
const guess = guessedLetterInput.value;
//console.log(guess);

const goodGuess = inputValidation(guess);
if(goodGuess){
    makeGuess(guess)
}
guessedLetterInput.value = "";

});

const inputValidation = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1){
        message.innerText = "Please enter only 1 letter at a time";
    }else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z";
    } else{
        return input;
    }
};

const makeGuess = function(guess){
guess = guess.toUpperCase();

if (guessedLetters.includes(guess)){
    message.innerText = "You've already guessed that letter";
}else {
    guessedLetters.push(guess)
    console.log(guessedLetters);
    showLetter();
    updateWordInProgress(guessedLetters);
}
//return guess;
};

const showLetter = function (){
   letterGuess.innerHTML = "";
   for (const letter of guessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    letterGuess.append(li);
   };

};

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const showWord = [];

    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push ("●");
        }
    }
   wordsInProgress.innerText = showWord.join("");
   wonGame();
};

const wonGame = function(){
    //console.log(wordsInProgress.innerText)
    if (word.toUpperCase() === wordsInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    } 
};