const questions = [
  {
    question: "Which of the following is correct about JavaScript?",
    answers: [
      { text: "JavaScript is an Object-Based language", correct: true},
      { text: "JavaScript is Assembly-language", correct: false},
      { text: "JavaScript is an Object-Oriented language", correct: false},
      { text: "JavaScript is a High-level language", correct: false}
    ]
  },
  {
    question: "Arrays in JavaScript are defined by which of the following statements?",
    answers: [
      { text: "It is an ordered list of objects", correct: false},
      { text: "It is an ordered list of values", correct: true},
      { text: "It is an ordered list of string", correct: false},
      { text: "It is an ordered list", correct: false}
    ]
  },
  {
    question: "Where is Client-side JavaScript code is embedded within HTML documents?",
    answers: [
      { text: "A URL that uses the special javascript:code", correct: false},
      { text: "A URL that uses the special javascript:protocol", correct: true},
      { text: "A URL that uses the special javascript:encoding", correct: false},
      { text: " A URL that uses the special javascript:stack", correct: false}
    ]
  },
  {
    question: " Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine?",
    answers: [
      { text: "must be restricted to a Unix Machine only", correct: false},
      { text: "will be displayed as JavaScript text on the browser", correct: false},
      { text: "will throw errors and exceptions", correct: false},
      { text: "will work perfectly well on a Windows Machine", correct: true}
    ]
  },
  {
    question: "Which of the following scoping type does JavaScript use?",
    answers: [
      { text: "Sequential", correct: false},
      { text: "Segmental", correct: false},
      { text: "Lexical", correct: true},
      { text: "Literal", correct: false}
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState(){  
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Start Again"
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();