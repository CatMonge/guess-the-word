const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessedLetterInput = document.querySelector(".letter");
const wordsInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messaeg = document.querySelector(".message");
const playAgain = document.querySelector(".play-again")

const word = "magnolia"

const placeholder = function (word){
const placeholderLetters = [];
for (const letters of word){
console.log(letters)
placeholderLetters.push("●")
}
wordsInProgress.innerText = placeholderLetters.join("●")
};

placeholder(word);

guessButton.addEventListener("click", function(e){
e.preventDefault();
const guess = guessedLetterInput.value;
console.log(guess);
guessedLetterInput.value = "";
});