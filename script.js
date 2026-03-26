document.addEventListener('DOMContentLoaded', () => {
    const questionTitle = document.querySelector("#question-text");
    const answersContainer = document.querySelector('#answers-container');
    let questionIndex = 0;
    let score = 0;
    let interval = 0;
    let brick = 0;
    let brickResult = document.querySelector("#brick-result");
    const startscrn = document.querySelector("#start-screen");
    const quizscrn = document.querySelector("#quiz-screen");
    const resultscrn = document.querySelector("#result-screen");
    const startbtn = document.querySelector("#start-btn");
    const restartbtn = document.querySelector("#restart-btn");
    
    const questions = [
        {
            question: "Квіз завершено!",
            answers: ["Так", "Ні","Що?", "brick"],
            correct: 1,
            background: 'linear-gradient(to right, orange, purple)'
        },
        {
            question: "У яку секунду відео 'chip' він не дивиться на камеру",
            answers: ["35:49", "35:48", "35:47", "brick"],
            correct: 0,
            background: 'linear-gradient(to top right, orange, purple)'
            
        },
        {
            question: "SyntaxError",
            answers: ["SyntaxError", "SyntaxError", "SyntaxError", "brick"],
            correct: 2,
            background: 'linear-gradient(to top, orange, purple, orange)'
        },
        {
            question: "brick",
            answers: ["brick?", "BRICK", "brick!", "brick"],
            correct: 2,
            background: 'linear-gradient(to top left, orange, purple)'
            
        },
        {
            question: "Хто найкращі веб девелопери",
            answers: ["Павуки", "Ми", "Хтось", "brick"],
            correct: 0,
             background: 'linear-gradient(to top left, orange, purple)'
            
        },
        {
            question: "Відповідь на все",
            answers: ["42", "Незламність", "Їжа", "brick"],
            correct: 0,
             background: 'linear-gradient(to top left, orange, purple)'
            
        }
    ];
    function startTimer() {
        let timeLeft = 100;
        document.querySelector("#timer").textContent = `Час: ${timeLeft}`;
        let timer = setInterval(function() {
            timeLeft -= 1;
            document.querySelector("#timer").textContent = `Час: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.querySelector("body").classList.remove("glitch");
                showResult();
            }
            if (questionIndex >= questions.length) {
                    clearInterval(timer);
                }
        }, 1000);
    }
    function showQuestion(question) {
        
        answersContainer.innerHTML = '';
        questionTitle.innerHTML = question.question;
        document.querySelector("body").style.backgroundImage = `${question.background}`;
        for (let i = 0; i < question.answers.length; i++) {
            let answerBtn = document.createElement('button');
            answerBtn.textContent = question.answers[i];
            answerBtn.classList.add('answer-btn');
            if (questionIndex == 2) {
                answerBtn.classList.add('glitch')
            }
            answersContainer.append(answerBtn);
            answerBtn.onclick = function () {checkAnswer(answerBtn,i)};
        }
        
    }
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
            if (questionIndex == 2) {
                document.querySelector("body").classList.add("glitch")
            }
            if (questionIndex > 2 || questionIndex < 2 ) {
                document.querySelector("body").classList.remove("glitch")
            }
        }
        else {
            showResult();
        }
    }
    function showResult() {
        quizscrn.classList.add("hide");
        resultscrn.classList.remove("hide");
        let accuracy = Math.round((score / questions.length) * 100);
        document.querySelector("#result-text").textContent = `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
        if (brick > 0) {
            brickResult.textContent = `brick: ${brick}`;
            brickResult.classList.remove("hide");
        }
    }
    function checkAnswer(button, answerIndex) {
        if (answerIndex == questions[questionIndex].correct) {
            button.classList.add("correct");
            score += 1;
            console.log("Правильно!");
            button.disabled = true;
            document.querySelector("#score-display").textContent = `Бали: ${score}`;
        }
        else {
            if (answerIndex == 3) {
                questionTitle.textContent = "brick";
                brick += 1;
            }
            button.classList.add("wrong");
            console.log("Помилка!");
            button.disabled = true;
        }
        setTimeout(nextQuestion, 1000);
    }
    function startGame() {
        clearInterval(timer);
        startscrn.classList.add("hide");
        quizscrn.classList.remove("hide");
        resultscrn.classList.add("hide");
        score = 0;
        document.querySelector("#score-display").textContent = `Бали: ${score}`;
        questionIndex = 0;
        startTimer();
        showQuestion(questions[0]);
    }
    startbtn.onclick = function () {startGame()};
    restartbtn.onclick = function () {if (brick > 0) {brickResult.classList.add("hide")} startGame()};
});