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

var drawHangmanStep = function(step) {
    if (step === 1) {
        //cap, gura, ochi
        ctx.beginPath();
        ctx.arc(200, 100, 30, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(190, 90, 5, 0, Math.PI * 2, true);
        ctx.arc(210, 90, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(200, 110, 10, 0, Math.PI, false);
        ctx.stroke();
    }
    else if (step === 2) {
        //corp
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(200, 220);
        ctx.stroke();
    }
    else if (step === 3) {
        //brat stang
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(160, 190);
        ctx.stroke();
    }
    else if (step === 4) {
        //brat drept
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(240, 190);
        ctx.stroke();
    }
    else if (step === 5) {
        //picior stang
        ctx.beginPath();
        ctx.moveTo(200, 220);
        ctx.lineTo(170, 260);
        ctx.stroke();
    }
    else if (step === 6) {
        //picior drept
        ctx.beginPath();
        ctx.moveTo(200, 220);
        ctx.lineTo(230, 260);
        ctx.stroke();
    }
}

//valori initiale
var secret = "MASINA";
var answerVector=[];
var lettersLeft = 0;
var wrongGuess = 0;
var MAX_LIVES = 6;

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

//functie care verifica daca litera este in cuvant
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

//functie care gestioneaza incercarile
var handleGuess = function(ch) {
    ch = ch.toUpperCase();
    var buttons = keyboardElement.querySelectorAll(".key");
    //dezactiveaza butonul apasat
    for (var i=0; i<buttons.length; i++) {
        if (buttons[i].textContent === ch) {
            buttons[i].disabled = true;
            break;
        }
    }
    var hits = updateGame(ch, secret, answerVector);
    if (hits > 0) {
        //litera e corecta
        lettersLeft -= hits;
        renderWord(answerVector);
        if (lettersLeft === 0) {
            alert("Felicitari! Ai castigat!");
        }
    } else {
        wrongGuess++;
        drawHangmanStep(wrongGuess);
        if (wrongGuess >= MAX_LIVES) {
            alert("Ai pierdut! Cuvantul era: " + secret);
        }
    }
}

//initializare joc
var init = function() {
    drawPillar();
    answerVector = setupAnswerVector(secret);
    wrongGuess = 0;
    lettersLeft = secret.length;
    renderWord(answerVector);
    buildKeyboard();
}

init();