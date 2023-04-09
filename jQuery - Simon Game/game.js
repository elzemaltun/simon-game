var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColors = ["green","red","yellow","blue"];
var started = false;

// when key pressed 
$(document).keydown(function () {
    if (!started){
        nextSequence();
        started = true;
    }
});

// User Pattern
$(".btn").click(function (){
    // find id and create pattern
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
    // play sound
    playSound(userChosenColor);

    // animation
    animatePress(this);    
})

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(nextSequence, 1000);
        }
    } else{

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout (function () {
            $("body").removeClass("game-over")}, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }    
}


// Game Pattern
function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    // Generate random number and choose a color
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    // flash animation
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    
    //play sound
    playSound(randomChosenColor);

}

// play sound of the selected button
function playSound(name){
    var sound = new Audio("sounds/"+ name + ".mp3"); 
    sound.play();
}

// animate when a button pressed
function animatePress(currentColor){
    $(currentColor).addClass("pressed");

    setTimeout(function (){
        $(currentColor).removeClass("pressed");
    }, 100)
}

function startOver(){
    gamePattern =[];
    started = false;
    level = 0;
}