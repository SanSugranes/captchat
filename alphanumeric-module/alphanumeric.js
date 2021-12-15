/*
ETML - École des métiers techniques Lausanne
Author:         Ricardo De Almeida pereira
Date:           24/11/2021
Last modified:  --/--/----

Description:    Alphanumeric captcha generator: 
                    - Captcha generator script
                        -> Random characters
                        -> Random background color
                        -> Range of the lenght
                        -> Vertical position variation
*/


//Constants for the random number generator
const MIN = 6;
const MAX = 9;

//Random int (int the range of MIN - MAX)  
var rdm = Math.floor(Math.random() * (MAX - MIN + 1) + MIN),
    rdmYPosition = Math.floor(Math.random() * (5 - 0 + 1) + 0),
    yPositions = ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'];


//Generates random string with letters and numbers
function makeid(lenght) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//Random color generator (RGBA)
//Source: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255,
        red = o(r() * s),
        blue = o(r() * s),
        green = o(r() * s);


    //Checks the RGB value making an average to decide if white or black text will be desplayed
    //true = black text
    //false = white text
    if ((red + blue + green) / 3 > 95) {
        return ['rgba(' + red + ',' + blue + ',' + green + ',' + r().toFixed(1) + ')', true];
    } else {
        return ['rgba(' + red + ',' + blue + ',' + green + ',' + r().toFixed(1) + ')', false];
    }
}

var color = random_rgba();

//Canva manipulation
var c = document.getElementById("myCanvas"),
    randomText = makeid(rdm),
    ctx = c.getContext("2d");

console.log(randomText);

c.style.backgroundColor = color[0];

//Varries vertical position
ctx.textBaseline = yPositions[rdmYPosition];


//Checks RGB value in order to display either white or black text to keep a decent contrast level between it and the background
if (color[1]) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillText(randomText, 10, 50);
    c.style.border = "2px solid black";
} else {
    ctx.font = "30px Comic Sans MS";
    c.style.border = "2px solid grey";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(randomText, 10, 50);
}
ctx.stroke();


function test() {
    answer = document.getElementById('userinput').value;
    console.log("answer: " + answer);

    if (randomText != answer){
        alert('Bad answer!');
    }
    else {
        alert('Good answer!');
    }
}