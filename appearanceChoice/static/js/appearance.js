/**
 * Choose buttons-background-color
 * 
 * Select within the combobox: 
 *      Reset (default): will reinitialize the buttons background color
 *      Red: will change background of all buttons to red
 *      Green: will change background of all buttons to green
 *      Random: will change background of all buttons randomly. Possible colors are blue, red, orange and green
 * 
 * Gene buttons are inactivated
 * 
 * @author feBueno, June 2020
 * fernando.bueno.gutie@gmail.com
 */

var all_genes= document.getElementsByTagName('button');//each of the html-option within the select-html in browser
//each option has a name and a value. The valus is in ["random","red","green","reset"]
console.log(all_genes);

var copyAllButtons = [];//all_genes copy
for (let i=0; i<all_genes.length;i++){
    copyAllButtons.push(all_genes[i].classList[1]);
}
console.log(copyAllButtons);


function buttonGeneChange(clickedObject){
    /*clickedObject: select-html whose .value is a html-option from those available. 
    The .value is selected by user in the browser. There are 4 option.

    Call 1 of 4 different functions depending on input
    */

    if(clickedObject.value==="red"){
        buttonRed();
    } else if(clickedObject.value==="green"){
        buttonGreen();
    } else if(clickedObject.value==="reset"){
        buttonReset();
    } else if(clickedObject.value==="random"){
        buttonRandom();
    }
}

function buttonRed(){
    //remove 1 by 1 the class of all the buttons and replace them by btn-danger. 
    //Button-text is not changed
    for (let i=0; i < all_genes.length; i++){
        all_genes[i].classList.remove(all_genes[i].classList[1]);
        all_genes[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    //remove 1 by 1 the class of all the buttons and replace them by btn-success. 
    //Button-text is not changed
    for (let i=0; i<all_genes.length;i++){
        all_genes[i].classList.remove(all_genes[i].classList[1]);
        all_genes[i].classList.add('btn-success');
    }
}

function buttonReset(){
    //remove 1 by 1 the class of all the buttons and replace them by the class from copy of default buttons.
    //Button-text is not changed
    for (let i=0; i<all_genes.length;i++){
        all_genes[i].classList.remove(all_genes[i].classList[1]);
        all_genes[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    //remove 1 by 1 the class of all the buttons and replace them by the class from a random class in ['btn-primary','btn-danger','btn-warning','btn-success']
    //Button-text is not changed
    let choices = ['btn-primary','btn-danger','btn-warning','btn-success']//backgrounds are blue, red, orange and green, respetivelly
    
    for (let i=0; i<all_genes.length;i++){
       let randomNumber=Math.floor(Math.random()*4);//random natural number in [0-3]
       all_genes[i].classList.remove(all_genes[i].classList[1]);
       all_genes[i].classList.add(choices[randomNumber]);
    }
}


