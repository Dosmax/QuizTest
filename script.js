var questions = [];
var currentQuestion = {};
var selectedAnswer = "";
var correctAnswers = 0;
var incorrectAnswers = 0;
var usedQuestionIds = [];

Papa.parse("https://docs.google.com/spreadsheets/d/162pAjssS4Sz-z4L8h41-Bxa1uk8yiTpoe0-aauYuYyo/export?format=csv", {
  download: true,
  header: true,
  complete: function(results) {
    questions = results.data;
    showRandomQuestion();
  }
});
 
function showRandomQuestion() {
  // Select a random question from 'questions' that has not been used yet
  var randomQuestionId = Math.floor(Math.random() * questions.length);
  while (usedQuestionIds.indexOf(randomQuestionId) !== -1) {
    randomQuestionId = Math.floor(Math.random() * questions.length);
  }
  usedQuestionIds.push(randomQuestionId);
  currentQuestion = questions[randomQuestionId];

  

  var img = document.querySelector("#question-img");
  if (!currentQuestion.img_url || currentQuestion.img_url === "") {
    currentQuestion.img_url = "https://www.techrepublic.com/wp-content/uploads/2021/04/power-bi-770x578.jpg";
  } else {
    currentQuestion.img_url = currentQuestion.img_url;
  }
 
  // Set array of answers
  var answers = [currentQuestion.answerA, currentQuestion.answerB, currentQuestion.answerC, currentQuestion.answerD, currentQuestion.correctAnswer];


  // Set question image

  document.querySelector("#question-img").src = currentQuestion.img_url;
  // Set question text
  document.querySelector("#question").innerHTML = currentQuestion.question;
  // Set question description
  document.querySelector("#description").innerHTML = currentQuestion.description;

  
 
  var NewCorrectAnswer = "";
  var DescCorrentAnswer = "";

  if (answers[4] === "A") { NewCorrectAnswer = 0 } 
  else if (answers[4] === "B" ) {NewCorrectAnswer = 1}
  else if (answers[4] === "C" ) {NewCorrectAnswer = 2}
  else if (answers[4] === "D" ) {NewCorrectAnswer = 3}

  DescCorrentAnswer = answers[NewCorrectAnswer];

  var uniqueNumbers = [];
while (uniqueNumbers.length < 4) {
    var randomNumber = Math.floor(Math.random() * 4);
    if (uniqueNumbers.indexOf(randomNumber) === -1) {
        uniqueNumbers.push(randomNumber);
    }
}

 var NewPositionAnswer = [ answers[uniqueNumbers[0]],answers[uniqueNumbers[1]], answers[uniqueNumbers[2]], answers[uniqueNumbers[3]] ];
 
 var FinalNewCorrectAnswer = 0;
 if (NewPositionAnswer[0] === DescCorrentAnswer) { FinalNewCorrectAnswer = 0 } 
 else if (NewPositionAnswer[1] === DescCorrentAnswer ) {FinalNewCorrectAnswer = 1}
 else if (NewPositionAnswer[2] === DescCorrentAnswer ) {FinalNewCorrectAnswer = 2}
 else if (NewPositionAnswer[3] === DescCorrentAnswer ) {FinalNewCorrectAnswer = 3}

  // Set answer options
  document.querySelector("#answerA").innerHTML = NewPositionAnswer[0] ;
  document.querySelector("#answerB").innerHTML = NewPositionAnswer[1] ;
  document.querySelector("#answerC").innerHTML = NewPositionAnswer[2] ;
  document.querySelector("#answerD").innerHTML = NewPositionAnswer[3] ;


  if (FinalNewCorrectAnswer === 0) { currentQuestion.correctAnswer = "A" } 
  else if (FinalNewCorrectAnswer === 1) {currentQuestion.correctAnswer = "B"}
  else if (FinalNewCorrectAnswer === 2 ) {currentQuestion.correctAnswer = "C"}
  else if (FinalNewCorrectAnswer === 3) {currentQuestion.correctAnswer = "D"}

   
  // Deselect all answers
  var answers = document.querySelectorAll(".answer");
  for (var i = 0; i < answers.length; i++) {
    answers[i].classList.remove("selected", "correct", "incorrect");
  }
  selectedAnswer = "";
}

function selectAnswer(answer) {
  // Deselect all answers
  var answers = document.querySelectorAll(".answer");
  for (var i = 0; i < answers.length; i++) {
    answers[i].classList.remove("selected");
  }
  // Select current answer
  document.querySelector("#answer" + answer).classList.add("selected");
  selectedAnswer = answer;
}

function verifyAnswer() {
  // Check if an answer is selected
  if (selectedAnswer === "") {
    alert("Please select an answer");
    return;
  }

    // update counter

  function updateCounter() {
    document.querySelector("#correct-count").innerHTML = correctAnswers;
    document.querySelector("#wrong-count").innerHTML = incorrectAnswers;
    var percentage = correctAnswers / questions.length * 100;
    document.querySelector("#percentage").innerHTML = percentage.toFixed(2);
    document.querySelector("#result-counter").classList.remove("d-none");
  }
  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    correctAnswers++;
    updateCounter();
    document.querySelector("#answer" + selectedAnswer).classList.add("correct");
  } else {
    incorrectAnswers++;
    updateCounter();
    document.querySelector("#answer" + selectedAnswer).classList.add("incorrect");
    document.querySelector("#answer" + currentQuestion.correctAnswer).classList.add("correct");
  }
  // Check if the user passed the test
  if (correctAnswers >= 40) {
  alert("Congratulations! You have passed the test with " + correctAnswers + " correct answers and " + incorrectAnswers + " incorrect answers");
  } else if (usedQuestionIds.length === questions.length) {
  alert("You have answered all the questions. You got " + correctAnswers + " correct answers and " + incorrectAnswers + " incorrect answers");
  } else {
  // Show another random question
  setTimeout(showRandomQuestion, 1000);
  }
  updateCounter();
  }

  function init() {
    usedQuestionIds = [];
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.querySelector("#result-counter").classList.add("d-none");
    location.reload();
    showRandomQuestion();
  }
  
  
