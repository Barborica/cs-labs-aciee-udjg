var canvas = document.getElementById("hangmanCanvas"); //cauta in index.html elementul cu id-ul "hangmanCanvas"
var ctx = canvas.getContext("2d");

ctx.lineWidth = 6;
ctx.lineCap = "round";
ctx.strokeStyle = "#333";

var drawPillar = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(20, 300);
    ctx.lineTo(300, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, 300);
    ctx.lineTo(60, 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, 40);
    ctx.lineTo(200, 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 40);
    ctx.lineTo(200, 70);
    ctx.stroke();
}

//valori initiale
var secret = "MASINA";
var answerVector=[];
var lettersLeft = 0;

var wordElement = document.getElementById("word"); //cauta in index.html elementul cu id-ul "word"
var keyboardElement = document.getElementById("keyboard"); //cauta in index.html elementul cu id-ul "keyboard"

//functie care initializeaza vectorul raspuns
var setupAnswerVector = function(word) {
    var v=[];
    for (var i=0; i<word.length; i++) {
        v.push("_");
    }
return v;
}

var renderWord = function(v) {
    wordElement.textContent = v.join(" ");
}

//functie care construieste tastatura
var buildKeyboard = function() {
    keyboardElement.innerHTML = ""; //curata tastatura anterioara
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (var i=0; i<letters.length; i++) {
        (function(ch){
            var button = document.createElement("button");
            button.className = "key";
            button.type = "button";
            button.textContent = ch;
            button.onclick = function() {
                handleGuess(ch);
            }
            keyboardElement.appendChild(button);
        })(letters[i]);
    }
}

//functie care actualizeaza jocul in urma unei incercari
var updateGame = function(letters, word, vector){
    var hits = 0;
    for (var i=0; i<word.length; i++) {
        if (word[i] === letters && vector[i] === "_") {
            vector[i] = letters;
            hits++;
        }
    }
    return hits;
}

//functie care gestioneaza incercarile reusite
var handleGuess = function(ch) {
    ch = ch.toUpperCase();
    var hits = updateGame(ch, secret, answerVector);
    if (hits > 0) {
        renderWord(answerVector);
    }
}

//initializare joc
var init = function() {
    drawPillar();
    answerVector = setupAnswerVector(secret);
    lettersLeft = secret.length;
    renderWord(answerVector);
    buildKeyboard();
}

init();