// Add questions
let questions = [
    { title: "Commonly used data type DO Not include:", choices: ["1.strings", "2.booleans", "3.alerts", "4.numbers"], answer: "3.alerts" },
    { title: "The condition in an if / else statement is enclosed with _____.", choices: ["1.quotes", "2.curly brackets", "3.parenthesis", "4.square brackets"], answer: "2.curly brackets" },
    { title: "String values must be enclosed within _____ when being assigned to variables.", choices: ["1.commas", "2.curly brackets", "3.quotes", "4.parenthesis"], answer: "3.quotes" },
    { title: "A very useful tool used during development and debugging for printing content to the debugger is:", choices: ["1.Javascript", "2.terminal / bash", "3.for loops", "4.console.log"], answer: "4.console.log" },
    { title: "Arrays in JavaScript can be used to store ______.", choices: ["1.numbers and strings", "2.other arrays", "3.booleans", "4.all of the above"], answer: "4.all of the above" },
    
];
let currentQuestionIndex = 0;
let time = 60; 
let timerId;
// Add event to the button
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('score-form').addEventListener('submit', saveScore);

function startGame() {
    
    document.getElementById('start-view').classList.add('hidden');
    document.getElementById('question-view').classList.remove('hidden');
    document.getElementById('time').textContent = time;
    timerId = setInterval(updateTime, 1000);
    showNextQuestion();
}

function showNextQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = currentQuestion.title;
    let choicesContainer = document.getElementById('question-choices');
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach(function(choice, index){
        let choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', selectChoice);
        choicesContainer.appendChild(choiceButton);
    });
}

function selectChoice(event) {
    let choice = event.target.textContent;
    let correctAnswer = questions[currentQuestionIndex].answer;
    
    // Check if the chosen answer is correct
    if (choice === correctAnswer) {
        document.getElementById('feedback').textContent = 'Correct!'
       
    } else {
        document.getElementById('feedback').textContent = 'Wrong!'
        time -= 10; // Subtract time for wrong answer
        if (time < 0) { time = 0; }
    }
    // Move to the next question or end the game
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length || time <= 0) {
        endGame();
    } else {
        showNextQuestion();
    }
}




function updateTime() {
    time--;
    document.getElementById('time').textContent = time;
    if (time <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerId);
    document.getElementById('question-view').classList.add('hidden');
    document.getElementById('results-view').classList.remove('hidden');
    document.getElementById('timer').classList.add('hidden');
    document.getElementById('score').textContent = time;
}

function saveScore(event) {
    event.preventDefault();
    let initials = document.getElementById('initials').value;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];//Retreive from local storage
    let newScore = { score: time, initials: initials };

    // Save to local storage
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score); // Rank the scores
    localStorage.setItem('highScores', JSON.stringify(highScores));

    viewHighScores();
}

function viewHighScores() {
    document.getElementById('high-scores-view').classList.remove('hidden');
    document.getElementById('start-view').classList.add('hidden');
    document.getElementById('question-view').classList.add('hidden');
    document.getElementById('results-view').classList.add('hidden');
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    let highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = highScores.map(score => `<li>${score.initials} - ${score.score}</li>`).join('');
}

function goBack() {
    document.getElementById('high-scores-view').classList.add('hidden');
    document.getElementById('start-view').classList.remove('hidden');
    resetQuiz();
}

function clearHighScores() {
    localStorage.removeItem('highScores');
    document.getElementById('high-scores-list').innerHTML = '';
}

function resetQuiz() {
    time = 60;
    currentQuestionIndex = 0;
    document.getElementById('time').textContent = time;
    document.getElementById('timer').classList.remove('hidden');
}


console.log (this);
console.log (document.body);
