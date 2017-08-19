//Click on Start-Reset button
//If we are playing - reload page and set score to zero
//If not, show countdown box and reduce time in seconds while continuously checking for time available. If time finishes, the game ends
//change buttn to reset 
//Generate new question and multiple answers 
var playing = false;
var score;
var action;
var timeRemaining;
var answer;
document.getElementById("start").onclick = function(){
    if(playing == true){//If playing
        location.reload();//page reloading
        document.getElementById("gameOver").style.display = "none" ;
    }else{//If not playing
        document.getElementById("gameOver").style.display = "none" ;
        playing = true;
        score = 0;
        timeRemaining = 60;
        document.getElementById("timerSeconds").innerHTML = timeRemaining;
        document.getElementById("scoreValue").innerHTML = score;
        document.getElementById("timer").style.display = "block";
        //countdown
        startCountdown();
        document.getElementById("start").innerHTML = "Reset Game";
        //generate Q&A
        generateQA();
        
    }
}
for(i=1;i<5;i++){
document.getElementById("box"+i).onclick = function(){
     if(playing == true){
         if(this.innerHTML == answer){
             document.getElementById("correct").style.display = "block" ;
             score += 1;
             document.getElementById("scoreValue").innerHTML = score;
               setTimeout(function(){
             document.getElementById("correct").style.display = "none" ;              
             },1000)
             generateQA();
         }else{
             document.getElementById("wrong").style.display = "block" ;
             setTimeout(function(){
             document.getElementById("wrong").style.display = "none" ;                 
             },1000)

         }
     }
}
}


function startCountdown (){
    action = setInterval(function (){
        if(timeRemaining > 0){
        timeRemaining -= 1; 
        document.getElementById("timerSeconds").innerHTML = timeRemaining;}
        else{
            stopCountdown();
            document.getElementById("gameOver").style.display = "block" ;
            document.getElementById("gameOver").innerHTML = "<p>GAME OVER!</p> <p>YOUR SCORE IS "+score+".</p>";
            document.getElementById("timer").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
        }
    },1000);
        
}

function stopCountdown (){
    clearInterval(action);
}

function generateQA(){
    var number1 = 1+ Math.round(9*Math.random());
    var number2 = 1+ Math.round(9*Math.random());
    answer = number1*number2;
    document.getElementById("question").innerHTML = number1+"x"+number2;
    var position = 1+ Math.round(3*Math.random());
    document.getElementById("box"+position).innerHTML = answer;
    var answerArray = [answer];
    for(i=1; i<5 ; i++){
    if(i!==position){
        var wrongAnswer
        do{wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));}
        while(answerArray.indexOf(wrongAnswer)>-1)
        answerArray.push(wrongAnswer);
        document.getElementById("box"+i).innerHTML = wrongAnswer;
        
        }
    }
     
}
//Click on answer box. 
//If we are playing and answer is correct, increase score and show correct box and generate new question and answers. 
//If answer is wrong, show try again box.