var canvas = document.getElementById("hangmanCanvas");
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

drawPillar();