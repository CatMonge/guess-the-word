const letterGuess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessedLetterInput = document.querySelector(".letter");
const wordsInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again")

let word = "magnolia";
let guessedLetters = [];
var guessesRemaining = 8;

const getWord = async function (){
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    word = wordArray[randomIndex].trim();
   // console.log(word);
    placeholder(word);
};
getWord();

const placeholder = function (word){
const placeholderLetters = [];
for (const letter of word){
//console.log(letter);
placeholderLetters.push("●");
}

wordsInProgress.innerText = placeholderLetters.join("");

};

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
    countRemainingGuesses(guess);
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

const countRemainingGuesses = function (guess){
    const upperword = word.toUpperCase();
    if (!upperword.includes(guess)){
       message.innerText = `Word doesn't contain ${guess}`;
       guessesRemaining = guessesRemaining - 1;
    console.log(guessesRemaining);
    } else {
        message.innerText = `Yes! The word contains ${guess}!`;
    }

    if (guessesRemaining === 0){
        message.innerHTML = `Sorry :-( The word was <span class = "highlight">${word}</span>.`;
        startOver();
    } else if (guessesRemaining === 1){
        remainingGuessesSpan.innerText = `${guessesRemaining} guess left!`;
    } else {
        remainingGuessesSpan.innerText = `You have ${guessesRemaining} guesses.`;
        //console.log(guessesRemaining);
    }
    
};

const wonGame = function(){
    //console.log(wordsInProgress.innerText)
    if (word.toUpperCase() === wordsInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
        startOver();
    } 
 
};

const startOver = function (){
guessButton.classList.add("hide");
remainingGuesses.classList.add("hide");
letterGuess.classList.add("hide");
playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    guessesRemaining = 8;
    remainingGuessesSpan.innerText = `${guessesRemaining} guesses`;
    letterGuess.innerHTML = "";
    message.innertext = "";
    
    getWord();
    
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    letterGuess.classList.remove("hide");
    playAgain.classList.add("hide");
    
    });