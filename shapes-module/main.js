/*
ETML - École des métiers techniques Lausanne
Author:         Ricardo De Almeida pereira - Santiago Sugrañes
Date:           24/11/2021
Last modified:  22/12/2021

Description:    Shapes captcha generator: 
- Captcha generator script
-> Random shapes
*/

const debug = false;

const randomBetween = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min); }
const elWidth = 100;
const captchatDiv = document.createElement('div');
document.body.appendChild(captchatDiv);
captchatDiv.style.display = 'grid';
captchatDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
captchatDiv.style.gridGap = '30px';
captchatDiv.style.width = elWidth * 3 + 'px';

const borderStyle = '5px dashed #00ff00';

var types = [];
var selected = { rectangles: 0, squares: 0, circles: 0, triangles: 0, parallelograms: 0 };

types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));
types.push(randomFunction(Math.floor(Math.random() * 5), '#FF00FF', '#000000', false));


var rnad = randomBetween(0, types.length - 1);
console.log(rnad);


randomFunction(types[rnad], '#000000', '#00FF00', true);

function randomFunction(num, backColor, foreColor, isControl) {
    switch (num) {
        case 0:
            drawRandomRectangle(backColor, foreColor, isControl);
            break;
        case 1:
            drawRandomSquare(backColor, foreColor, isControl);
            break
        case 2:
            drawRandomCircle(backColor, foreColor, isControl);
            break;
        case 3:
            drawRandomTriangle(backColor, foreColor, isControl);
            break;
        case 4:
            drawRandomParallelogram(backColor, foreColor, isControl);
            break;
        default:
            break;
    }

    return num;
}

/**
 * Draws a rectangle of random size and random pos inside a canvas
 */
function drawRandomRectangle(backColor, foreColor, isControl) {
    var privCnv = document.createElement('canvas');
    privCnv.width = elWidth;
    privCnv.height = elWidth;
    captchatDiv.appendChild(privCnv);
    var privCtx = privCnv.getContext('2d');
    privCtx.fillStyle = backColor;
    privCtx.fillRect(0, 0, privCnv.width, privCnv.height);

    var minWidth = privCnv.width * 0.33;
    var maxWidth = privCnv.width * 0.80;
    var minHeight = privCnv.height * 0.33;
    var maxHeight = privCnv.height * 0.80;

    var width = randomBetween(minWidth, maxWidth);
    var height = randomBetween(minHeight, maxHeight);
    // If width is within a certain range of height, regenerate, to be sure that the user sees a rectangle
    while (width > height * 0.8 && width < height * 1.2) {
        var width = randomBetween(minWidth, maxWidth);
    }
    var x = randomBetween(0, privCnv.width - width);
    var y = randomBetween(0, privCnv.height - height);

    privCtx.fillStyle = foreColor;
    privCtx.fillRect(x, y, width, height);

    if (isControl) return;
    privCnv.addEventListener('click', rectClick);
}

function rectClick(e) {
    /** @type {HTMLElement} */
    var el = e.target;

    if (el.style.border == '') {
        el.style.border = borderStyle;
        selected.rectangles++;
    } else {
        el.style.border = '';
        selected.rectangles--;
    }
    console.log(e.target);
}

/**
 * Draws a square of random size and random pos inside a canvas
 */
function drawRandomSquare(backColor, foreColor, isControl) {
    var privCnv = document.createElement('canvas');
    privCnv.width = elWidth;
    privCnv.height = elWidth;
    captchatDiv.appendChild(privCnv);
    var privCtx = privCnv.getContext('2d');
    privCtx.fillStyle = backColor;
    privCtx.fillRect(0, 0, privCnv.width, privCnv.height);

    var minWidth = privCnv.width * 0.33;
    var maxWidth = privCnv.width * 0.80;

    var width = randomBetween(minWidth, maxWidth);
    var x = randomBetween(0, privCnv.width - width);
    var y = randomBetween(0, privCnv.width - width);

    privCtx.fillStyle = foreColor;
    privCtx.fillRect(x, y, width, width);

    if (isControl) return;
    privCnv.addEventListener('click', squareClick);
}

function squareClick(e) {
    /** @type {HTMLElement} */
    var el = e.target;

    if (el.style.border == '') {
        el.style.border = borderStyle;
        selected.squares++;
    } else {
        el.style.border = '';
        selected.squares--;
    }
    console.log(e.target);
}

/**
 * Draws a circle of random radius and random pos inside a canvas
 */
function drawRandomCircle(backColor, foreColor, isControl) {
    var privCnv = document.createElement('canvas');
    privCnv.width = elWidth;
    privCnv.height = elWidth;
    captchatDiv.appendChild(privCnv);
    var privCtx = privCnv.getContext('2d');
    privCtx.fillStyle = backColor;
    privCtx.fillRect(0, 0, privCnv.width, privCnv.height);

    var minRadius = (privCnv.width * 0.33) / 2;
    var maxRadius = (privCnv.width * 0.8) / 2;

    var radius = randomBetween(minRadius, maxRadius);
    var x = randomBetween(radius, privCnv.width - radius);
    var y = randomBetween(radius, privCnv.width - radius);

    privCtx.fillStyle = foreColor;
    privCtx.beginPath();
    privCtx.arc(x, y, radius, 0, 2 * Math.PI);
    privCtx.closePath();
    privCtx.fill();

    if (isControl) return;
    privCnv.addEventListener('click', circleClick);
}

function circleClick(e) {
    /** @type {HTMLElement} */
    var el = e.target;

    if (el.style.border == '') {
        el.style.border = borderStyle;
        selected.circles++;
    } else {
        el.style.border = '';
        selected.circleClick--;
    }
    console.log(e.target);
}

/**
 * Draws a triangle of random size and random pos inside a canvas
 */
function drawRandomTriangle(backColor, foreColor, isControl) {
    var privCnv = document.createElement('canvas');
    privCnv.width = elWidth;
    privCnv.height = elWidth;
    captchatDiv.appendChild(privCnv);
    var privCtx = privCnv.getContext('2d');
    privCtx.fillStyle = backColor;
    privCtx.fillRect(0, 0, privCnv.width, privCnv.height);

    var a1, a2, a3;

    do {
        var p1 = { x: randomBetween(0, privCnv.width), y: randomBetween(0, privCnv.height) };
        var p2 = { x: randomBetween(0, privCnv.width), y: randomBetween(0, privCnv.height) };
        var p3 = { x: randomBetween(0, privCnv.width), y: randomBetween(0, privCnv.height) };

        var a = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        var b = Math.sqrt(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2));
        var c = Math.sqrt(Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2));

        a1 = getAngle(a, b, c);
        a2 = getAngle(c, a, b);
        a3 = getAngle(b, c, a);
    } while (a1 < 20 || a2 < 20 || a3 < 20 || a < privCnv.width || b < privCnv.width || c < privCnv.width);

    privCtx.fillStyle = foreColor;
    privCtx.beginPath();
    privCtx.moveTo(p1.x, p1.y);
    privCtx.lineTo(p2.x, p2.y);
    privCtx.lineTo(p3.x, p3.y);
    privCtx.lineTo(p1.x, p1.y);
    privCtx.closePath();
    privCtx.fill();

    if (isControl) return;
    privCnv.addEventListener('click', triangleClick);
}

function triangleClick(e) {
    /** @type {HTMLElement} */
    var el = e.target;

    if (el.style.border == '') {
        el.style.border = borderStyle;
        selected.triangles++;
    } else {
        el.style.border = '';
        selected.triangles--;
    }
    console.log(e.target);
}

function drawRandomParallelogram(backColor, foreColor, isControl) {
    var privCnv = document.createElement('canvas');
    privCnv.width = elWidth;
    privCnv.height = elWidth;
    captchatDiv.appendChild(privCnv);
    var privCtx = privCnv.getContext('2d');
    privCtx.fillStyle = backColor;
    privCtx.fillRect(0, 0, privCnv.width, privCnv.height);

    var bounds = 80;
    // "Radius" sises
    var s1, s2;
    // points
    var A, B, C, D;
    // sides
    var BD, AD, AC, BC;
    // origin
    var o = { x: randomBetween(bounds, privCnv.width - bounds), y: randomBetween(bounds, privCnv.height - bounds) };

    do {
        s1 = { x: randomBetween(0, o.x), y: randomBetween(0, o.y) };
        s2 = { x: randomBetween(0, o.x), y: randomBetween(0, o.y) };

        var A = { x: o.x + s1.x, y: o.y + s1.y };
        var B = { x: o.x - s1.x, y: o.y - s1.y };
        var C = { x: o.x + -s2.x, y: o.y + s2.y };
        var D = { x: o.x - -s2.x, y: o.y - s2.y };

        var BD = Math.sqrt(Math.pow(B.x - D.x, 2) + Math.pow(B.y - D.y, 2));
        var AD = Math.sqrt(Math.pow(A.x - D.x, 2) + Math.pow(A.y - D.y, 2));
        var AC = Math.sqrt(Math.pow(A.x - C.x, 2) + Math.pow(A.y - C.y, 2));
        var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
        var AB = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
        var CD = Math.sqrt(Math.pow(C.x - D.x, 2) + Math.pow(C.y - D.y, 2));

    } while (o.x - s1.x < 0 || o.y - s1.y < 0 || o.x - s2.x < 0 || o.y - s2.y < 0 || o.x + s1.x > privCnv.width || o.y + s1.y > privCnv.width || o.x + s2.x > privCnv.width || o.y + s2.y > privCnv.width || BD < privCnv.width / 2 || AD < privCnv.width / 2 || AC < privCnv.width / 2 || BC < privCnv.width / 2 || AB < privCnv.width / 2 || CD < privCnv.width / 2);



    privCtx.fillStyle = foreColor;
    privCtx.beginPath();
    privCtx.moveTo(A.x, A.y);
    privCtx.lineTo(C.x, C.y);
    privCtx.lineTo(B.x, B.y);
    privCtx.lineTo(D.x, D.y);
    privCtx.closePath();
    privCtx.fill();

    if (debug) {
        debugLine(B, D, '#0ff');
        debugLine(A, D, '#00f');
        debugLine(A, C, '#f00');
        debugLine(B, C, '#0f0');

        debugPoint(o, '#00ff00', 'O');
        debugPoint(A, '#0ff', 'A');
        debugPoint(B, '#00f', 'B');
        debugPoint(C, '#f00', 'C');
        debugPoint(D, '#0f0', 'D');
    }

    if (isControl) return;
    privCnv.addEventListener('click', parallelogramClick);
}

function parallelogramClick(e) {
    /** @type {HTMLElement} */
    var el = e.target;

    if (el.style.border == '') {
        el.style.border = borderStyle;
        selected.parallelograms++;
    } else {
        el.style.border = '';
        selected.parallelograms--;
    }
    console.log(e.target);
}

function debugPoint(p, color, name = "") {
    var intensity = 0;
    for (let i = 0; i < color.length; i++) {
        if (color[i] != "#")
            intensity += parseInt(color[i], 16);
    }
    console.log(`%c${p.x}, ${p.y}`, `background: ${color}; color: ${intensity > 25?'#000':'#fff'}`);
    privCtx.fillStyle = color;
    privCtx.beginPath();
    privCtx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    privCtx.closePath();
    privCtx.fill();

    privCtx.fillStyle = '#fff';
    privCtx.fillText(name, p.x, p.y - 10);
}

function debugLine(p1, p2, color) {
    privCtx.strokeStyle = color;
    privCtx.lineWidth = 5;
    privCtx.beginPath();
    privCtx.moveTo(p1.x, p1.y);
    privCtx.lineTo(p2.x, p2.y);
    privCtx.closePath();
    privCtx.stroke();
}

function radToDeg(x) {
    return x / Math.PI * 180;
}

function getAngle(a, b, c) {
    var temp = (a * a + b * b - c * c) / (2 * a * b);
    if (temp >= -1 && 0.9999999 >= temp)
        return radToDeg(Math.acos(temp));
    else if (1 >= temp) // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
        return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
}