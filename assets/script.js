
//DOM Elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var endScreenEl = document.getElementById("end-screen");


// list of all questions, choices, and answers
var questions = [
    {
      question: "What chases Indy out of the Temple of the Chachapoyan Warriors in Peru?",
      choices: ["Chachapoyan Warriors", "Panther", "Giant Rolling Boulder", "Snakes"],
      answer: "Giant Rolling Boulder",
      description: ""
    },
    {
      question: "What does the Ark of the Covenant contain?",
      choices: ["Bones of Abraham", "Holy Grail", "Ten Commandments", "Dead Sea Scrolls"],
      answer: "Ten Commandments",
      description: ""
    },
    {
      question: "What does Henry Jones, Sr. call his son?",
      choices: [
        "Buddy", "Junior", "Sport", "Champ"],
      answer: "Junior",
      description: ""
    },
    {
      question:
        "Who gives Indy his first fedora?",
      choices: ["An Archaeologist", "A Grave Robber", "His College Professor", "Henry Jones Sr"],
      answer: "A Grave Robber",
      description: ""
    },
    {
      question:
        "What is Indy's worst fear?",
      choices: ["Women", "Snakes", "Spiders", "Nazis"],
      answer: "Snakes",
      description: ""
    }
  ];

//Game variables
var questionIndex = 0;
var time = questions.length * 20;
var timerId;
var score = 0;
// var pass = null

//reduces the game time and calls end of game when time expires
function clockTick() {
    if(time > 0){
      // update time
      time--;
      timerEl.textContent = time;
    }else{
      alert("TIME!");
      endScreenEl.setAttribute("class", "unhide");
      highscores();
    };
  };


//start timer
timerId = setInterval(clockTick, 1000);
  

function initGame (){
    //changes homescreen to hidden
    var homeScreenEl = document.getElementById("home-screen");
    console.log(homeScreenEl);
    homeScreenEl.setAttribute("class", "hide");

    //makes question secion visible
    questionsEl.removeAttribute("class");

    // start timer
    // timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    loadQuestion();
}

function endGame(event){

  endScreenEl.setAttribute("class", "unhide");
  console.log(`the game has ended. Score: ${score}`);
};

function loadQuestion(){

 var currentQuestion = questions[questionIndex];
 console.log(currentQuestion);

 var currentQuestionEL = document.getElementById("current-question");
 console.log(currentQuestion.question)
 currentQuestionEL.textContent = currentQuestion.question;

 choicesEl.innerHTML = "";
    
   //interates through the questions and call the answer handler when the event listener is triggered
 for (let i = 0; i < 4; i++) {
  console.log(currentQuestion.choices[i]);
  //creates button for each answer
  var questionOption = document.createElement("button");
  //adds event listener
  questionOption.onclick = answerHandler;

  questionOption.textContent = currentQuestion.choices[i];

  choicesEl.appendChild(questionOption);
}

function answerHandler (event){
  console.log("Answer Handler Ran");
  console.log("Answer Selected: " + this.textContent);

  if (this.textContent == currentQuestion.answer){
    console.log("CORRECT");

    score ++;
    console.log("Score: " + score);

    if(questionIndex < questions.length -1){
      questionIndex ++;
      loadQuestion();

    }else{

      // currentQuestionEL.innerHTML = "";
      // choicesEl.innerHTML = "";
      endGame()
    }

    

    //Display explaination/description **

  }else{
    console.log("WRONG");
    console.log("Time:" + time);
      
    //reduces time per requirement
    time = time - 10;
    //display something eventually **
  }

}}

function highscores(event){

  var initials = initialsEl.value.trim();
  var newScore = {
    newHighScore: score,
    newInitials: initials
  };

  console.log(newScore);
  var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

  // try{
  //   var highscores =
  //   JSON.parse(window.localStorage.getItem("highscores"));
  //   console.log('this ran 177');
  // } catch {
  //   var highscores = []
  //   console.log('this ran 178');
  // };

  console.log(highscores);

  //stores new score to local storage
  highscores.push(newScore);
  // console.log("Updated: "+ JSON.stringify(highscores));
  // console.log("Updated: "+ JSON.stringify(highscores[3]));
  
  window.localStorage.setItem("highscores", JSON.stringify(highscores));

  clearInterval(timerId);

  //link to highscores page
  window.location.href = './assets/highscores.html';
}

// user clicks button to start quiz
startBtn.onclick = initGame;
submitBtn.onclick = highscores;




// Timer function count down. (Maybe adds time for right answers)
// Init function that hides the home screen and calls the questions function
//Questions function
//calls questions from object and renders them each with their own div or span
//each should have their own event listener
//when a div/span is clicked it triggers a conditonal to check what
//...is clicked versus the answer
//If no render an image of the knight "he chose poorly"
//and change the background gif to one of the face melts/deaths
//MVP just make an X
// if yes maybe trigger an Indy escape
//tally the score +add time
//increment index to call next question
//end of game function that promts user to enter initals for high scores
//Add a times up condition that calls the end of the game

