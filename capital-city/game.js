let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement    = document.querySelector('#user-answer');
let submitButton         = document.querySelector('#submit-answer');
let resultTextElement    = document.querySelector('#result');
let playAgainButton      = document.querySelector('#play-again');

var country;

function init() {
    country = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)];

    randomCountryElement.innerHTML = country['name'];
    userAnswerElement.value        = '';
    resultTextElement.innerHTML    = '';
}

init();

submitButton.addEventListener('click', playGame);

function playGame() {
    let answer = userAnswerElement.value;
    
    let url = `https://api.worldbank.org/v2/country/${country['alpha-2']}?format=json`;

    fetch(url)
        .then( res => res.json() )
        .then( data => {
            let correctAnswer = data[1][0]['capitalCity'];

            if (answer.toUpperCase() === correctAnswer.toUpperCase()) {
                resultTextElement.innerHTML = `Congratulations! ${correctAnswer} was correct!`;
            } else {
                resultTextElement.innerHTML = `Not quite; the capital of ${country['name']} is ${correctAnswer}.`;
            }
        })
        .catch( err => alert(`Error! ${err}`) );
}

playAgainButton.addEventListener('click', init);
