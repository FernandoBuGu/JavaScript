/**
 * DNA/RNA helix animations.
 * 
 * Print in browser gifs of DNA/RNA helix.
 * Each time the button is clicked, one random helix gifs is selected and prompted in the browser. 
 * Helix are randomly sampled with replacement from a set of 10 different helix gifs.
 * 
 * @author feBueno, June 2020
 * fernando.bueno.gutie@gmail.com
 */

function getHelix(){
    var image = document.createElement('img');
    var div=document.getElementById('flexHelixgen');
    
    switch (getNumber()){
        case 0: image.src="https://upload.wikimedia.org/wikipedia/commons/1/16/DNA_orbit_animated.gif"; break;
        case 1: image.src="https://upload.wikimedia.org/wikipedia/commons/5/57/ARNm-Rasmol.gif"; break;
        case 2: image.src="https://upload.wikimedia.org/wikipedia/commons/0/0c/DNA_animation.gif" ; break;
        case 3: image.src="https://cdn.dribbble.com/users/789033/screenshots/2330834/vna.gif"; break;
        case 4: image.src="https://i.pinimg.com/originals/d6/a8/0c/d6a80c4256202186fc5cdaf4f85b6ff1.gif" ; break;
        case 5: image.src="https://cdn.dribbble.com/users/9453/screenshots/2742019/dna-helix.gif" ; break;
        case 6: image.src="https://media3.giphy.com/media/xWJOxVYbzGVtm/giphy.gif" ; break;
        case 7: image.src="https://i.makeagif.com/media/5-15-2016/p_4_38.gif"; break;
        case 8: image.src="https://thumbs.gfycat.com/MammothInstructiveEuropeanfiresalamander-size_restricted.gif"  ; break;
        case 9: image.src="https://31.media.tumblr.com/303776d0d227a5f803f4350ac3f75dfd/tumblr_mvvm9hKHJU1s60oo7o1_500.gif" ; break;
        default: image.src="https://upload.wikimedia.org/wikipedia/commons/1/10/Double-stranded_RNA.gif";

    }
    div.appendChild(image);
}

function getNumber(){
    var randomIdx = Math.floor(Math.random()*10);
    console.log(randomIdx);
    return randomIdx;
}


