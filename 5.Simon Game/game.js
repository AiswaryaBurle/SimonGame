var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var flag=0;
var level=0;
var f=1;

$(document).keydown(function(){
  if(flag!==1)
   {
     flag=1;
     nextSequence();
   }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPattern.length);
});

function nextSequence()
{
  userPattern=[];
  level++;
  $("h1").text("Level "+level);
  var num= Math.floor(Math.random()*4);
  var randomColor=buttonColors[num];
  gamePattern.push(randomColor);//correct pattern
  $("#"+randomColor).fadeOut(150).fadeIn(150);//Indicating user which to memorise
  playSound(randomColor);
}

function checkAnswer(currentLevel)
{
  for(var i=0;i<currentLevel;i++)
  {
    if(gamePattern[i]!==userPattern[i])
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game OVER! Press any key to restart");
      setTimeout( function(){$("body").removeClass("game-over")} , 200);
      f=0;
      startOver();

    }
  }
  if(f!=0)
    if(gamePattern.length===userPattern.length)
      setTimeout(function(){ nextSequence() }, 1000);
}

function playSound(name)
{
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout( function(){ $("#"+currentColor).removeClass("pressed"); } , 100);
}

function startOver()
{
  userPattern=[];
  gamePattern=[];
  flag=0;
  level=0;
  f=1;
}
