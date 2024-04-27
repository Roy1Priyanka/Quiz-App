const quizData = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyperlinks and Text Markup Language', 'Hypertext Markup Language', 'High-level Text Manipulation Language', 'Hyperlinks and Tables Markup Language'],
      answer: 'Hypertext Markup Language',
    },
    {
      question: 'What is the purpose of JavaScript in web development?',
      options: ['Styling web pages', 'Server-side scripting', 'Enhancing interactivity and functionality', 'Creating animations'],
      answer: 'Enhancing interactivity and functionality',
    },
    {
      question: 'Describe the difference between HTTP and HTTPS.',
      options: [
        'HTTP is secure, while HTTPS is not.',
        'HTTP stands for Hypertext Transfer Protocol, while HTTPS stands for Hypertext Transfer Protocol Secure.',
         'HTTP is faster than HTTPS.',
          'HTTP is used for static websites, while HTTPS is used for dynamic websites.'
        ],
      answer: 'HTTP stands for Hypertext Transfer Protocol, while HTTPS stands for Hypertext Transfer Protocol Secure.',
    },
    {
      question: 'What is the box model in CSS?',
      options: ['Defines element shapes', 'Used for animations', 'Defines content area, padding, border, and margin', 'Refers to a grid system'],
      answer: 'Defines content area, padding, border, and margin',
    },
    {
      question: 'What are the advantages of using a CSS preprocessor?',
      options: [
        ' Faster page loading times',
        ' More efficient coding with variables and nesting',
        'Better compatibility with older browsers',
        'Enhanced security features',
      ],
      answer: ' More efficient coding with variables and nesting',
    },
    {
      question: 'Explain the concept of responsive web design?',
      options: ['Designing heavy graphics', 'Ensuring consistent appearance on all devices', ' Not necessary in modern web development', 'Focusing on text content only'],
      answer: 'Ensuring consistent appearance on all devices',
    },
    {
      question: 'What is a front-end framework?',
      options: [
        'Used for server-side scripting',
        'Helps with styling and layout',
        'Used for database management',
        'Used for animations',
      ],
      answer: 'Helps with styling and layout',
    },
    {
      question: 'Describe the role of a web server?',
      options: ['Creates web pages', 'Stores and manages website data, delivering them to users upon request', ' Client-side scripting', 'Ensures website security'],
      answer: 'Stores and manages website data, delivering them to users upon request',
    },
    {
      question: 'What are some best practices for optimizing website performance?',
      options: [
        'Using large images and videos',
        'Minimizing HTTP requests and using CSS sprites',
        'Avoiding caching techniques',
        'Using inline styles for every element'
      ],
      answer: 'Minimizing HTTP requests and using CSS sprites',
    },
    
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();