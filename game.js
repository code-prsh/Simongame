var gamePattern=[];
var userClickedPattern = [];
var buttonColours=["red","blue","green","yellow"];

var started=false;

var level=0;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {

  
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    
    if (userClickedPattern.length === gamePattern.length){

     
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    playSound("wrong");

      
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      
      $("#level-title").text("Game Over, Press Any Key to Restart");
       
      startOver();
  }

}

function nextSequence(){

    level++;

    
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);

var randomChosenColour=buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChosenColour);
}

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });



$(".btn").click(function() {

 
  var userChosenColour = $(this).attr("id");

 
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {

  
  level = 0;
  gamePattern = [];
  started = false;
}