/**
 * scissors-paper-rock game
 * 
 * Click in any of the 3 images provided (scissors-paper-rock) while a bot does the same. 
 * Results will be printed in browser.
 * 
 * @author feBueno, June 2020
 * fernando.bueno.gutie@gmail.com
 */

function rpsGame_fun(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice_fun(randToRpsInt_fun());
    console.log('bot: ',botChoice);

    result =decideWinner(humanChoice,botChoice);//[0,1], [0.5,0.5] [1,0]
    console.log(result);
    message = finalMessage(result); //{message: 'you won!', 'color':'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt_fun(){
    return Math.floor(Math.random()*3);
}

function numberToChoice_fun(number){
    return ["rock", "sci", "paper"][number]
}

function decideWinner(yourChoice,botChoice){
    var rpsDatabase ={
        'rock':{'sci':1,'paper':0,'rock':0.5},
        'sci':{'sci':0.5,'paper':1,'rock':0},
        'paper':{'sci':0,'paper':0.5,'rock':1}
    }

    var yourScore = rpsDatabase[yourChoice][botChoice];
    var botScore = rpsDatabase[botChoice][yourChoice];
    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]){
    if(yourScore===0){
        return {'message':'Ýou lost!','color':'red'}
    } else if (yourScore===0.5){
        return {'message':'Ýou tied!','color':'yellow'}
    } else if (yourScore===1){
        return {'message':'Ýou won!','color':'green'}
    }
}

function rpsFrontEnd(yourImageChoice,botImageChoice,finalMessage){
    var imagesDatabase = {//imagesDatabase[rock] will give me that pic
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'sci':document.getElementById('sci').src
    }

    //remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('sci').remove();

    //each pic in its div (create divs on the go with js)
    var yourDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    yourDiv.innerHTML = "<img src='" + imagesDatabase[yourImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML = "<h1 style='color: "+finalMessage['color'] + "; font=size: 60px; padding: 30px;  '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(233, 50, 12, 1)'>"

    document.getElementById('flex-box-rps-div').appendChild(yourDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

function mreset(){
    /*
        clear flex-box-result
    */
    location.reload();
}

