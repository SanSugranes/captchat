const express = require("express");
const {createCanvas} = require("canvas");
const app = express();
const port = 3000

var canvas = createCanvas(200,100);
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000"
ctx.fillRect(0,0, canvas.width, canvas.height);
var image = ctx.getImageData(0,0, canvas.width, canvas.height);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/tts_test.html')
})
app.get('/image', (req, res) => {
    res.set("Content-Type", "image/png");
    res.send(image);
})