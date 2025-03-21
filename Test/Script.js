function backtohome() {
  // Navigate to the Quizz.html page
  window.location.href = '../taketest.html'; // Update with the correct path if necessary
}


document.addEventListener('DOMContentLoaded', () => {
  const quizElement = document.getElementById('quiz');
  const questionContainerElement = document.getElementById('question-container');
  const nextBtn = document.getElementById('next-btn');
  const finishBtn = document.getElementById('finish-btn');
  const resultElement = document.getElementById('result');
  const scorePercentElement = document.getElementById('score-percent');
  const backHomeBtn = document.getElementById('back-home-btn');
  const timerElement = document.getElementById('timer');
  const prevBtn = document.getElementById('prev-btn'); // New Previous button
  const topic=document.getElementById('topic')

  let currentQuiz = null;
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 1200; // 20 minutes timer
  let countdown;

  const startTimer = () => {
    countdown = setInterval(() => {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerElement.innerHTML = `Time Left: ${minutes}:${seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(countdown);
        timerElement.innerHTML = "Time's Up!";
        finishQuiz(); // Automatically finish quiz when time is up
      }
    }, 1000);
  };

  const quizData = [
    {
      topic: "jQuery",
      questions: [
        {
          question: "What does the `$` symbol represent in jQuery?",
          options: [
            "It is just a dollar sign",
            "It is an alias for jQuery",
            "It is used for variables",
            "It represents nothing"
          ],
          answer: "It is an alias for jQuery"
        },
        {
          question: "Which function is used to hide an element in jQuery?",
          options: ["hide()", "fadeOut()", "css('hide')", "invisible()"],
          answer: "hide()"
        },
        {
          question: "How do you select an element by its class name in jQuery?",
          options: [
            "$('.classname')",
            "$('#classname')",
            "$('classname')",
            "$('element.classname')"
          ],
          answer: "$('.classname')"
        },
        {
          question: "Which jQuery method is used to attach an event handler function to an element?",
          options: ["on()", "click()", "attach()", "bind()"],
          answer: "on()"
        },
        {
          question: "How do you include jQuery in an HTML file?",
          options: [
            "Download jQuery and include it locally",
            "Link to a CDN",
            "Both A and B",
            "Use jQuery without including it"
          ],
          answer: "Both A and B"
        },
        {
          question: "Which method in jQuery is used to perform an asynchronous HTTP request?",
          options: ["ajax()", "get()", "post()", "fetch()"],
          answer: "ajax()"
        },
        {
          question: "How do you check if an element has a specific class in jQuery?",
          options: [
            "$('element').hasClass('classname')",
            "$('element').checkClass('classname')",
            "$('element').isClass('classname')",
            "$('element').className == 'classname'"
          ],
          answer: "$('element').hasClass('classname')"
        },
        {
          question: "Which jQuery method is used to add elements to the DOM?",
          options: ["append()", "html()", "prepend()", "add()"],
          answer: "append()"
        },
        {
          question: "What does the jQuery method `fadeIn()` do?",
          options: [
            "Slowly hides an element",
            "Changes an element's opacity",
            "Slowly shows an element",
            "Animates the width of an element"
          ],
          answer: "Slowly shows an element"
        },
        {
          question: "How do you remove an attribute from an HTML element in jQuery?",
          options: [
            "$('element').removeAttr('attribute')",
            "$('element').attr('remove', 'attribute')",
            "$('element').deleteAttr('attribute')",
            "$('element').unsetAttr('attribute')"
          ],
          answer: "$('element').removeAttr('attribute')"
        },
        {
          question: "Which method is used to stop an animation in jQuery?",
          options: ["stop()", "pause()", "end()", "clear()"],
          answer: "stop()"
        },
        {
          question: "How do you trigger a click event in jQuery?",
          options: [
            "$('element').click()",
            "$('element').trigger('click')",
            "$('element').fire('click')",
            "$('element').simulate('click')"
          ],
          answer: "$('element').trigger('click')"
        },
        {
          question: "Which method is used to remove all child nodes from an element in jQuery?",
          options: ["empty()", "remove()", "detach()", "clear()"],
          answer: "empty()"
        },
        {
          question: "What is the use of the jQuery `.animate()` method?",
          options: [
            "To stop an animation",
            "To perform custom animations",
            "To remove an element",
            "To fade an element"
          ],
          answer: "To perform custom animations"
        },
        {
          question: "How do you get the value of an input field in jQuery?",
          options: [
            "$('input').val()",
            "$('input').text()",
            "$('input').html()",
            "$('input').getValue()"
          ],
          answer: "$('input').val()"
        },
        {
          question: "Which jQuery method is used to toggle between slide up and slide down?",
          options: ["slideToggle()", "toggle()", "slideSwitch()", "slide()"],
          answer: "slideToggle()"
        },
        {
          question: "How do you get the text inside an HTML element using jQuery?",
          options: [
            "$('element').text()",
            "$('element').html()",
            "$('element').getText()",
            "$('element').val()"
          ],
          answer: "$('element').text()"
        },
        {
          question: "How do you execute a function when the DOM is fully loaded in jQuery?",
          options: [
            "$(document).ready()",
            "$(window).load()",
            "$(document).load()",
            "window.onload"
          ],
          answer: "$(document).ready()"
        },
        {
          question: "How do you hide an element when the user clicks on it using jQuery?",
          options: [
            "$('element').click(function(){ $(this).hide(); });",
            "$('element').click(function(){ $(this).remove(); });",
            "$('element').click(function(){ $(this).css('visibility', 'hidden'); });",
            "$('element').click(function(){ $(this).fadeOut(); });"
          ],
          answer: "$('element').click(function(){ $(this).hide(); });"
        },
        {
          question: "Which jQuery function is used to get the width of an element including padding?",
          options: ["outerWidth()", "width()", "innerWidth()", "css('width')"],
          answer: "innerWidth()"
        }
      ]
    }
  ];

  function startQuiz() {
    requestFullScreen()
    currentQuiz = quizData[0];
    currentQuestionIndex = 0;
    score = 0;
    quizElement.classList.remove('hidden');
    resultElement.classList.add('hidden');
    topic.innerHTML=currentQuiz.topic
    loadQuestion();
    updateButtons();
    startTimer();
  }

  function loadQuestion() {
    const questionObj = currentQuiz.questions[currentQuestionIndex];
    questionContainerElement.innerHTML = `
      <h2>Q${currentQuestionIndex + 1}: ${questionObj.question}</h2>
      <div class="options-container">
        ${questionObj.options.map((option, i) => `
          <div class="option">
            <label>
              <input type="radio" name="answer" value="${option}"> ${option}
            </label>
          </div>`).join('')}
      </div>
    `;
  }

  // Add event listener for Previous button
  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
    updateButtons();
  });

  // Handle the next button click event
  nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
      loadQuestion();
    }
    updateButtons();
  });

  finishBtn.addEventListener('click', finishQuiz);

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === currentQuiz.questions[currentQuestionIndex].answer) {
      score++;
    }
  }

  // Update button visibility (Previous, Next, Finish)
  function updateButtons() {
    // Disable Previous button on the first question
    if (currentQuestionIndex === 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled'); // Add disabled class
    } else {
      prevBtn.disabled = false;
      prevBtn.classList.remove('disabled'); // Remove disabled class
    }
  
    // Disable Next button on the last question
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
      nextBtn.disabled = true;
      nextBtn.classList.add('disabled'); // Add disabled class
    } else {
      nextBtn.disabled = false;
      nextBtn.classList.remove('disabled'); // Remove disabled class
    }
  }
  

  function finishQuiz() {
    clearInterval(countdown); // Stop the timer
    quizElement.classList.add('hidden');
    resultElement.classList.remove('hidden');
    
    const scorePercent = ((score / currentQuiz.questions.length) * 100).toFixed(2);
    const scorePercentElement = document.getElementById('score-percent');
    const resultMessageElement = document.getElementById('result-message');
    
    // Display the score
    scorePercentElement.innerText = `Your Score: ${scorePercent}%`;

    // Check if the score is 60% or higher
    if (scorePercent >= 60) {
        scorePercentElement.style.color = 'green'; // Set text color to green
        resultMessageElement.innerText = "Congratulations! You passed!";
    } else {
        scorePercentElement.style.color = 'red'; // Set text color to red
        resultMessageElement.innerText = "Sorry, you failed. Better luck next time!";
    }
}

  backHomeBtn.addEventListener('click', () => {
    resultElement.classList.add('hidden');
    quizElement.classList.add('hidden');
    clearInterval(countdown);
    document.exitFullscreen();
  });

  function requestFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }

  startQuiz();
});
