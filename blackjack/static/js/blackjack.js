/**
 * blackjack game
 * 
 * click hit to add a random card
 * click stand to let the bot play. Bot will play a card every second
 * click deal to start another hand
 * blackjack rules can be found online
 * 
 * @author feBueno, June 2020
 * fernando.bueno.gutie@gmail.com
 */

let BJGame ={

    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
        //scoreSpan: natural number in [2,21] or string "BUST!" if greater than 21, indicates cards count on board
        //div: box where cards and scoreSpan are
        //score: natural number in [2,Inf), score for a particular hand
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},

    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},

    'wins':0,//natural number in [0,Inf), indicates number of hands won by user
    'losses':0,//natural number in [0,Inf), indicates number of hands lost by user
    'draws':0,//natural number in [0,Inf), indicates number of hands tied by user

    'isStand': false,//wether Stand button has been clicked
    'turnsOver':false,//wether the hand is finished
};

const YOU = BJGame['you']
const DEALER = BJGame['dealer']

const hitSound = new Audio('/home/febueno/Documents/JSchallanges/blackjack/static/sounds/swish.m4a')
const winSound = new Audio('/home/febueno/Documents/JSchallanges/blackjack/static/sounds/cash.mp3')
const lossSound = new Audio('/home/febueno/Documents/JSchallanges/blackjack/static/sounds/aww.mp3')

//relate buttons with js-functions
document.querySelector('#blackjack-hit-button').addEventListener('click', BJHit_fun);//select as in css
document.querySelector('#blackjack-deal-button').addEventListener('click', BJDeal_fun);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


function BJHit_fun() {
    //if stand has not been click, add a random cart and show updated score
    if(BJGame['isStand']===false){
        let card=randomCard();
        showCard(YOU,card);
        updateScore(YOU,card);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

function randomCard(){
    //return a random char in ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] that is key for BJGame['cardsMap']
    let randomIndex = Math.floor(Math.random()*13);
    return BJGame['cards'][randomIndex];
}

function showCard(activePlayer,card){
    //activePlayer: string in ['you','dealer'] that is key for BJGame
    //card: char in ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] that works as html-img name

    //display card in your-box or dealer-box, depending on activePlayer. Makes adding-card-sound
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        cardImage.src = `/home/febueno/Documents/JSchallanges/blackjack/static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play(); 
    }

}

function BJDeal_fun(){
    /*if the hand is finished (after clicking deal-button):
        remove all card-images
        set scores to 0
        update overall score in wins, losses and draws
        set turnsOver to true, so another hand can start
    */
    if(BJGame['turnsOver']===true){

        BJGame['isStand']=false;

        let yourImages=document.querySelector('#your-box').querySelectorAll('img');//select as in css. Returns a list
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');//select as in css

        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        //reset active player score
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent = "Lets play";
        document.querySelector('#blackjack-result').style.color='black';

        BJGame['turnsOver']==true;
    }

}

function updateScore(activePlayer,card){
    /*activePlayer: string in ['you','dealer'] that is key for BJGame
    card: char in ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] that works as html-img name

    updates score for activePlayer adding value of card
    */


    if(card=='A'){
        if(activePlayer['score'] += BJGame['cardsMap'][card] <=21 ){
            activePlayer['score'] += BJGame['cardsMap'][card][1]//value 11
        } else {
            activePlayer['score'] += BJGame['cardsMap'][card][0]//value 1
        } 
    } else {
        activePlayer['score'] += BJGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    //activePlayer: string in ['you','dealer'] that is key for BJGame
    //display scoreSpan
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!'; 
        document.querySelector(activePlayer['scoreSpan']).style.color='red'; 
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']; 
    }
}

function sleep(ms){
    //ms: number, miliseconds
    //return Promise with ms-resolve-setTimeout
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    //execute dealer game
    BJGame['isStand']=true;

    //add intelligence-logic to bot
    //bot will stand for scores larger than 16
    while(DEALER['score']<16 && BJGame['isStand']){
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
        await sleep(1000);  //wait 1000 ms before returning to loop 
    }

    BJGame['turnsOver']=true;//enable another hand
    let winner=computeWinner();//finish this hand
    showResults(winner);
}

function computeWinner(){
    //compute winner based on score and blackjack rules
    //print in console indicating winner

    //winner: String constant in [YOU,DEALER] with the following keys: scoreSpan, div and score
    let winner;

    if(YOU['score']<=21){
        if((YOU['score']>DEALER['score']) || (DEALER['score']>21)){
            BJGame['wins']++;
            winner=YOU;
        } else if(YOU['score']<DEALER['score']){
            BJGame['losses']++;
            winner=DEALER;
        } else if((YOU['score']===DEALER['score'])){
            BJGame['draws']++;
        }
    } else if((YOU['score']>21) && (DEALER['score']<=21)){
        BJGame['losses']++;
        winner=DEALER;
    } else if((YOU['score']>21) && (DEALER['score']>21)){
        BJGame['draws']++;
    }
    console.log('winner is: ' + winner);
    console.log(BJGame['wins']);

    return winner;
}

function showResults(winner){
    //winner: String constant in [YOU,DEALER]
    //add hand-result to overall results and display in browser who the winner was
    let message, messageColor; 

    if(BJGame['turnsOver']===true){

        if(winner===YOU){
            document.querySelector('#wins').textContent = BJGame['wins'];
            message='You won!';
            messageColor='green';
            winSound.play();
        } else if(winner===DEALER){
            document.querySelector('#losses').textContent = BJGame['losses'];
            message='You lost!';
            messageColor='red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = BJGame['draws'];
            message='You drew!';
            messageColor='black';
        }

        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
}

