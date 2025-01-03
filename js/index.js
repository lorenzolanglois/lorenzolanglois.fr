"use strict";

const eraser = document.getElementById("eraser");
const canvas = document.getElementById("drawable");
const footer = document.getElementsByTagName("footer")[0];
const credits = document.getElementsByTagName("credits")[0];
const context = canvas.getContext("2d", { willReadFrequently: true });
const allowedTags = new Set(["DIV", "BODY", "FORM"]);

var isPainting = false;
var isCredits = false;

canvas.width = window.innerWidth;
canvas.height = document.body.clientHeight;
context.lineWidth = 5;
context.lineCap = "round";
context.strokeStyle = "yellow";

Array.from(document.getElementsByTagName("video")).forEach(element => {
    element.poster = element.poster.replace("_small", "_thumbnail");
});

window.addEventListener("submit", function () {
    document.getElementById("contactForm").style.display = "none";
    document.getElementById("contactText").style.display = "block";
    canvas.height = document.body.clientHeight;
});

window.addEventListener("resize", function () {
    if (window.innerHeight > canvas.height || window.innerWidth > canvas.width) {
        const background = context.getImageData(0, 0, canvas.width, canvas.height)
        canvas.width = window.innerWidth;
        canvas.height = document.body.clientHeight;
        context.putImageData(background, 0, 0)
        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = "yellow";
    }
});

document.body.addEventListener("pointerdown", function (e) {
    if (allowedTags.has(e.target.tagName) && e.pointerType === "mouse") {
        isPainting = true;
        eraser.style.display = "block";
        document.getSelection().removeAllRanges();
        document.documentElement.style.userSelect = "none";
    }
});

document.body.addEventListener("pointerup", function () {
    isPainting = false;
    context.beginPath();
    document.documentElement.style.userSelect = "auto";
});

document.body.addEventListener("pointermove", function (e) {
    if (!isPainting) return;
    context.lineTo(e.clientX, e.clientY + window.scrollY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY + window.scrollY);
});

eraser.addEventListener("click", function () {
    eraser.style.display = "none";
    context.clearRect(0, 0, canvas.width, canvas.height);
});

footer.addEventListener("click", function () {
    if (isCredits) {
        isCredits = false;
        credits.style.display = "none";
    } else {
        isCredits = true;
        credits.style.display = "flex";
    }
});
