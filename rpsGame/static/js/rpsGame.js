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
    /*
    yourChoice: html-img from which rpsGame_fun() was called
    rpsGame_fun() is called on clicking one of the 3 images available in browser

    prompts 2 images corresponding to your click-choice and the random-bot-choice, 
    and a message indicating wether you won or lost

    */

    var humanChoice, botChoice;
    humanChoice=yourChoice.id;//string in ["rock", "sci", "paper"] depending on click. It is the image id

    botChoice=numberToChoice_fun(randToRpsInt_fun());//string in ["rock", "sci", "paper"] depending on randomly generated number in [0,1,2]. 
    //It will be the image id that enables to generate it with rpsFrontEnd

    result =decideWinner(humanChoice,botChoice);//[0,1], [0.5,0.5] [1,0]
    message = finalMessage(result); //{message: 'you won!', 'color':'green'}

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt_fun(){
    //return random natural number in [0-2]
    return Math.floor(Math.random()*3);//example: 0
}

function numberToChoice_fun(number){
    //number: natural number in [0-2]
    //return one string in ["rock", "sci", "paper"], provided number (index) in [0-2]
    return ["rock", "sci", "paper"][number]//example: "rock"
}

function decideWinner(yourChoice,botChoice){
    /*
    yourChoice: string in ["rock", "sci", "paper"]. Example: "rock"
    botChoice: string in ["rock", "sci", "paper"]. Example: "rock"

    [yourScore, botScore]: [int, int] list, where int is in [0,0.5,1]
    Possible returns: [0,1], [0.5,0.5] and [1,0]
    The 1st possible return means that you lost the game, the 2nd is a draw and the 3rd one means that you won
    */
    var rpsDatabase ={
        'rock':{'sci':1,'paper':0,'rock':0.5},
        'sci':{'sci':0.5,'paper':1,'rock':0},
        'paper':{'sci':0,'paper':0.5,'rock':1}
    }

    var yourScore = rpsDatabase[yourChoice][botChoice];//Number in [0,0.5,1] provided an outer key (your choice) and an inner key (bot choice) from rpsDatabase object. 
    var botScore = rpsDatabase[botChoice][yourChoice];//Number in [0,0.5,1] provided an outer key (your choice) and an inner key (bot choice) from rpsDatabase object. 
    //keys need to be in ["rock", "sci", "paper"]
    return [yourScore, botScore];//example: [0,1]
}

function finalMessage([yourScore, botScore]){
    //return message with a string in ['Ýou lost!','Ýou tied!','Ýou won!'] and color red, yellow, green, respectively
    if(yourScore===0){
        return {'message':'Ýou lost!','color':'red'}
    } else if (yourScore===0.5){
        return {'message':'Ýou tied!','color':'yellow'}
    } else if (yourScore===1){
        return {'message':'Ýou won!','color':'green'}
    }
}

function rpsFrontEnd(yourImageChoice,botImageChoice,finalMessage){
    /*
    yourImageChoice: String in ["rock", "sci", "paper"] that is the id of a html-img
    botImageChoice: String in ["rock", "sci", "paper"] that is the id of a html-img
    finalMessage: message with String and color

    replace the 3 images in browser by 2 images (by your-click-choice and bot-choice) and a message
    */

    //enable access of image by id
    var imagesDatabase = {//imagesDatabase[rock] will give me the rock pic
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'sci':document.getElementById('sci').src
    }

    //remove all 3 images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('sci').remove();

    //create 3 div for: selected images (by-your-click and by bot) and the message
    var yourDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    //create child for the 2 images and the message
    yourDiv.innerHTML = "<img src='" + imagesDatabase[yourImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML = "<h1 style='color: "+finalMessage['color'] + "; font=size: 60px; padding: 30px;  '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(233, 50, 12, 1)'>"

    //display images and message in flex-box-rps-div
    document.getElementById('flex-box-rps-div').appendChild(yourDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

function mreset(){
    //refresh page
    location.reload();
}

