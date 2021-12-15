/*
ETML - École des métiers techniques Lausanne
Author:         Ricardo De Almeida pereira - Santiago Sugrañes
Date:           24/11/2021
Last modified:  15/12/2021

Description:    Alphanumeric captcha generator: 
- Captcha generator script
-> Random characters
-> Random background color
-> Range of the lenght
-> Vertical position variation
*/


const express = require("express");
const { createCanvas, Canvas } = require("canvas");

const fs = require("fs");
const app = express();
const port = 3000
    //Constants for the random number generator
const MIN = 6;
const MAX = 9;


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

function drawCaptcha(string) {
    var rdmYPosition = Math.floor(Math.random() * (5 - 0 + 1) + 0),
        yPositions = ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'];

    var color = random_rgba();

    //Canva manipulation
    var c = new Canvas(300, 100),
        ctx = c.getContext("2d");

    console.log(string);

    ctx.fillStyle = color[0];
    ctx.fillRect(0, 0, c.width, c.height);

    //Varries vertical position
    ctx.textBaseline = yPositions[rdmYPosition];


    //Checks RGB value in order to display either white or black text to keep a decent contrast level between it and the background
    if (color[1]) {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "#000";
        ctx.fillText(string, 10, 50);
    } else {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(string, 10, 50);
    }
    let buffer = c.toDataURL();
    return image = new Buffer(buffer.split(',')[1], 'base64');

}


//Generates random string with letters and numbers
function makeid() {

    //Random int (int the range of MIN - MAX)  
    let rdm = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < rdm; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function test() {
    answer = document.getElementById('userinput').value;
    console.log("answer: " + answer);

    if (randomText != answer) {
        alert('Bad answer!');
    } else {
        alert('Good answer!');
    }
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/alpha-capchat.html')
})
app.get('/image', (req, res) => {
    /* res.set("Content-Type", "image/png");
     res.send(image);*/
    let image = drawCaptcha(makeid());
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    });
    res.end(image);
})