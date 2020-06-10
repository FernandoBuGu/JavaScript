/**
 * Your Age in days, weeks and months. 
 * 
 * Display your age in different forms and current date
 * 
 * @author feBueno, June 2020
 * fernando.bueno.gutie@gmail.com
 */

console.log('this html displays your age in different forms and current date');

//get current date in yyyy/mm//dd
var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
console.log(today);//Wed Jun 10 2020 01:59:57 GMT-0600 (Easter Island Standard Time)

//dates difference
const date2 = new Date(prompt("date of birth (yyyy/m/d)"));//1989/6/5
const diffTime = Math.abs(date2 - today);//take leap years into account  
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays + " days");

//define flexBoxResultChilded (true if flex-box-result has been appended a child) to enable reset when needed
var flexBoxResultChilded=false;

//age in differnet forms
var ageInDays_var = diffDays;
var ageInWeeks_var = Math.floor(diffDays/7);
var ageInMonths_var = Math.floor(diffDays/30);

//create h1 on the go
var h1 = document.createElement('h1');

function ageInDays(){
    /*
        clear flex-box-result if needed (if getElementById is true)
        prompt text with days in flex-box-result
        set getElementById to true
    */
    if(flexBoxResultChilded){
        reset();
    }    
    var textAnswer = document.createTextNode('You are '+ageInDays_var+' days old');
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays_var');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    flexBoxResultChilded=true;
}

function ageInWeeks(){
    /*
        clear flex-box-result if needed (if getElementById is true)
        prompt text with weeks in flex-box-result
        set getElementById to true
    */
    if(flexBoxResultChilded){
        reset();
    }
    var textAnswer = document.createTextNode('You are '+ageInWeeks_var+' weeks old');
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays_var');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    flexBoxResultChilded=true;
}

function ageInMonths(){
    /*
        clear flex-box-result if needed (if getElementById is true)
        prompt text with months in flex-box-result
        set getElementById to true
    */
    if(flexBoxResultChilded){
        reset();
    }
    var textAnswer = document.createTextNode('You are '+ageInMonths_var+' months old');
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays_var');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    flexBoxResultChilded=true;
}

function currentDate(){
    /*
        clear flex-box-result if needed (if getElementById is true)
        prompt text with current date (yyyy/m/d) in flex-box-result
        set getElementById to true
    */
    if(flexBoxResultChilded){
        reset();
    }
    var textAnswer = document.createTextNode(date);
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays_var');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    flexBoxResultChilded=true;
}

function reset(){
    /*
        clear flex-box-result
    */
    document.getElementById('flex-box-result').innerHTML = "";
}



