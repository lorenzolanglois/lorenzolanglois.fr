"use strict";

const eraser = document.getElementById("eraser");
const canvas = document.getElementById("drawable");
const context = canvas.getContext("2d", { willReadFrequently: true });

var isPainting = false;

window.addEventListener("load", function () {
    canvas.width = window.innerWidth;
    canvas.height = document.body.clientHeight;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "yellow";
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

document.body.addEventListener("mousedown", function (e) {
    if (e.target.tagName != "H1" && e.target.tagName != "H2" && e.target.tagName != "H3"
    && e.target.tagName != "P" && e.target.tagName != "IMG" && e.target.tagName != "BUTTON"
    && e.target.tagName != "VIDEO") {
        isPainting = true;
        eraser.style.display = "block";
        eraser.style.opacity = 1;
        document.getSelection().removeAllRanges();
        document.documentElement.style.userSelect = "none";
    }
});

document.body.addEventListener("mouseup", function () {
    isPainting = false;
    context.beginPath();
    document.documentElement.style.userSelect = "auto";
});

document.body.addEventListener("mousemove", function (e) {
    if (!isPainting) return;
    context.lineTo(e.clientX, e.clientY + window.scrollY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY + window.scrollY);
});

document.getElementById("eraser").addEventListener("click", function () {
    eraser.style.display = "none";
    eraser.style.opacity = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
});
