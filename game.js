var gamePattern = [];
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameLength = 4;
var randomChosenColour = "";
var level = 0;
var boolTest = false;
var keyPress = false;
var tempArray = [];
var sequenceTest = false;
var sequenceLength = 0;



function checkAnswer(currentLevel) {

    // console.log(currentLevel);
    //  console.log("gamePattern "+gamePattern[currentLevel ]);
    //  console.log("userPattern "+userPattern[currentLevel ]);
    if(gamePattern[currentLevel ] === userPattern[currentLevel ]) {
    //  console.log("success");
     if(gamePattern.length === userPattern.length ) {
        // console.log("nextSequence");
        setTimeout(function() {
         nextSequence();
        }, 1000);
        if(gamePattern.length === gameLength) {
            restartGame();
        }
     }
    }else {
    //  console.log("wrong");
     gameOver();
    }
 }


function nextSequence () {
    
    userPattern = [];
    
    $("h1").text("level " +level);

    var randomNumber = Math.floor(Math.random() * 4); 
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var buttonAni = $("."+gamePattern[level]);
    buttonAni.animate({opacity: .1});
    setTimeout(function() {
    buttonAni.animate({opacity: 1});
    } , 100);

    buttonSound(gamePattern[level]);
    // console.log(level);
    level++;
    // console.log(level);
    
 
  
    
}






$(document).on("keypress",  function(event) {
    keyPress = true;
    nextSequence();
});



function recordUserPattern (buttonId) {
    userPattern.push(buttonId);
    console.log("userPattern length "+userPattern.length);
}



$(".btn").on("click" ,function(){
    //record button clicks into array
    var button = this.id;
    //  console.log(button);
    recordUserPattern(button);
    
    //html button for animation
    animatePress(button);
    buttonSound(button);
     console.log("userPattern.length - 1 " + (userPattern.length  - 1));
    checkAnswer(userPattern.length - 1);
    
    

 
});

function animatePress(userChoosenColour) {
    //button animation & sound
    $("."+userChoosenColour).addClass("pressed");
    // console.log($(userChoosenColour));
    setTimeout(function() {
        $("#"+userChoosenColour).removeClass("pressed");
        } , 100);
    
}

function restartGame() {
    level = 0;
    boolTest = false;
    gamePattern = [];
    userPattern = [];
    setTimeout(function(){
        $("h1").text("Press A key to Start!" );
    }, 1000);
    
}

function gameOver () {


    console.log("Game Over!");
    buttonSound("wrong");
    $("h1").text("Game Over!" );
    $("body").addClass("game-over ");
    setTimeout(function() {
        $("body").removeClass("game-over");
        } , 100);
        
                
    restartGame();
    
}

function buttonSound(buttonId) {
    switch (buttonId) {
        case "green":
            var green = new Audio("./sounds/green.mp3");
                green.play();
                // console.log("green audio");
            break;
        case "red":
            var red = new Audio("./sounds/red.mp3");
                red.play();
                // console.log("red audio");
            break;
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            // console.log("yellow audio");
        break;
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            // console.log("blue audio");
            break;
        default:
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

