// var highscoresEL = document.getElementById("highscores");
// console.log("HighscoresEl: " + highscoresEL);


function renderHighscores(){

    try{
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores"));
      } catch {
        var highscores = []
      };

    console.log(highscores);

      // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        console.log("li tag: " + liTag);
        console.log(score.newInitials + '  ' + score.newHighScore);
        liTag.textContent = score.newInitials + " - " + score.newHighScore;

        // display on page
        var olEl = document.getElementById("highscores");
        console.log('olEL output: ' + olEl);
        olEl.appendChild(liTag);
    });


}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
window.onload = renderHighscores;

document.getElementById("clear").onclick = clearHighscores;


