const timerElement = document.querySelector(".timer") as HTMLDivElement;
const firstNumElement = document.getElementById("first_num") as HTMLHeadingElement;
const operatorElement = document.getElementById("operator") as HTMLHeadingElement;
const secondNumElement = document.getElementById("second_num") as HTMLHeadingElement;
const optionsContainer = document.querySelector(".options") as HTMLDivElement;
const questionButtons = document.querySelectorAll(".questions button");

let correctAnswer: number;
let timer: number = 15;
let interval: number;

function generateQuestion(): void {
  const num1 = Math.floor(Math.random() * 50) + 1;
  const num2 = Math.floor(Math.random() * 50) + 1;
  const operators = ["+", "-", "*", "%"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  firstNumElement.textContent = num1.toString();
  operatorElement.textContent = operator;
  secondNumElement.textContent = num2.toString();

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "%":
      correctAnswer = num1 % num2;
      break;
    default:
      correctAnswer = 0;
  }
  
  generateOptions(correctAnswer);
  resetTimer();
}

function generateOptions(correct: number): void {
  optionsContainer.innerHTML = "";
  const answers = new Set<number>();
  answers.add(correct);

  while (answers.size < 4) {
    const wrongAnswer = correct + Math.floor(Math.random() * 10) - 5;
    if (wrongAnswer !== correct && wrongAnswer >= 0) {
      answers.add(wrongAnswer);
    }
  }
  
  const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);
  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.toString();
    button.addEventListener("click", () => checkAnswer(answer));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selected: number): void {
  if (selected === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
  generateQuestion();
}

function resetTimer(): void {
  clearInterval(interval);
  timer = 15;
  timerElement.textContent = timer.toString();
  interval = window.setInterval(() => {
    timer--;
    timerElement.textContent = timer.toString();
    if (timer <= 0) {
      alert("Time's up!");
      generateQuestion();
    }
  }, 1000);
}

questionButtons.forEach(button => {
  button.addEventListener("click", () => {
    generateQuestion();
  });
});

generateQuestion();