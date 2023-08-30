"use strict";

const questions = [
    {
        question: '1. Who is the prettiest girl in the world?',
        correct: 'A. Erika Thalia Jurajuria Casañola',
        options: [
            "A. Erika Thalia Jurajuria Casañola",
            "B. Random Girl",
            "C. Random Girl",
            "D. Random Girl"
        ]
    }, {
        question: '2. Who is the funniest guy in the world?',
        correct: 'B. Kevin Carrera Calzado',
        options: [
            "A. Kevin Hart",
            "B. Kevin Carrera Calzado",
            "C. Adam Sandler",
            "D. Jim Carrey"
        ]
    }, {
        question: '3. Who is the best programmer EVER?',
        correct: 'D. You :)',
        options: [
            "A. Me",
            "B. SoyDalto",
            "C. Pirate King",
            "D. You :)"
        ]
    }, {
        question: '4. What is the best series of the history?',
        correct: 'B. South Park',
        options: [
            "A. Game of Thrones",
            "B. South Park",
            "C. Breaking Bad",
            "D. The Blacklist"
        ]
    }, {
        question: '5. Who is the GOAT?',
        correct: 'A. Lionel Messi',
        options: [
            "A. Lionel Messi",
            "B. Pele",
            "C. Cristiano Ronaldo",
            "D. Maradona"
        ]
    }
]

const startButton = document.querySelector(".start-btn");
const modal = document.querySelector(".modal-container");
const mainMenu = document.querySelector(".main");
const continueButton = document.querySelector(".continue-btn");
const home = document.querySelector(".home");
const quiz = document.querySelector(".quiz");
const quizBox = document.querySelector(".quiz-box");
const question = document.querySelector(".question");
const answers = document.querySelector(".quiz-answers");
const nextButton = document.querySelector(".next-btn");
const scoreEl = document.querySelector(".score");
const questionCountEl = document.querySelector(".question-count");
const resultBox = document.querySelector(".result-box");
const tryAgainButton = document.querySelector(".tryAgain-btn");
const goHomeButton = document.querySelector(".goHome-btn");
const quit = document.querySelector(".x");

let questionCount = 0;
let score = 0;

startButton.addEventListener("click", () => {
    modal.classList.add("active");
    mainMenu.classList.add("active");
});

quit.addEventListener("click", () => {
    modal.classList.remove("active");
    mainMenu.classList.remove("active");
})

continueButton.addEventListener("click", () => {
    modal.classList.remove('active');
    startQuiz(questionCount);
    setTimeout(() => {
        mainMenu.classList.remove('active');
    }, 550)
  
});

nextButton.addEventListener("click", () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        startQuiz(questionCount);
            
    } else {
        showResults();
    }
})

goHomeButton.addEventListener("click", () => {
    quiz.classList.remove('active');
    resultBox.classList.remove('active');
    nextButton.classList.remove('active')
    questionCount = 0;
    score = 0;
});

tryAgainButton.addEventListener("click", () => {
    quizBox.classList.add('active')
    resultBox.classList.remove('active');
    nextButton.classList.remove('active')
    questionCount = 0;
    score = 0;
    startQuiz(questionCount);
})



function startQuiz(index) {
    nextButton.classList.remove('active');
    quiz.classList.add('active');
    quizBox.classList.add('active');
    questionCountEl.textContent = `Question ${questionCount + 1} of ${questions.length}`;
    scoreEl.textContent = `Score: ${score}/${questions.length}`;
    question.textContent = questions[index].question;
    let op = `<span class="option">${questions[index].options[0]}</span>
    <span class="option">${questions[index].options[1]}</span>
    <span class="option">${questions[index].options[2]}</span>
    <span class="option">${questions[index].options[3]}</span>`;

    answers.innerHTML = op;

    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
        option.addEventListener("click", function () {
            let userAnswer = this.textContent;
            let correctAnswer = questions[index].correct;
            let allOptions = answers.children.length;

            if (userAnswer == correctAnswer) {
                this.classList.add('correct');
                nextButton.classList.add('active');
                score++;
            } else {
                this.classList.add('incorrect');
                nextButton.classList.add('active');
                let i = 0;
                while (i < allOptions) {
                    let children = answers.children[i];
                    if (children.textContent == correctAnswer) {
                        children.classList.add('correct');
                        i = allOptions + 1;
                    }
                    i++;
                }
            }

            for (let i = 0; i < allOptions; i++) {
                answers.children[i].classList.add('disabled');
            }
        })
    })
};

function showResults() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score: ${score} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-percentage");
    const progresssValue = document.querySelector(".progress-value");

    let progressStartValue = -1;
    let progresEndValue = (score / questions.length) * 100;
    let speed = 20;


        let interval = setInterval(() => {

            progressStartValue++;
            progresssValue.textContent = `${progressStartValue}%`;
            
            circularProgress.style.background = `conic-gradient(#0ef ${progressStartValue * 3.6}deg, #1f293a 0deg)`
    
            if (progressStartValue == progresEndValue) {
                clearInterval(interval);  
                setTimeout(() => {
                        if (score <= 1) {
                            progresssValue.textContent = ':(';
                        } else if (score <= 3) {
                            progresssValue.textContent = 'Well done!';
                        } else if (score == 4) {
                            progresssValue.textContent = 'Awesome!';
                        } else
                          progresssValue.textContent = 'Perfect!';
                    }, 1000);                              
            }
        }, speed);
    
    
};

