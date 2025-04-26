"use strict";

const bottle = document.getElementById("bottle");
const bottleContainer = document.getElementById("bottle-container");
const erase = document.getElementById("erase");
const shake = document.getElementById("shake");
const bubbles = document.getElementsByClassName("bubble");
const input = document.getElementById("name-input");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");

letters.forEach(letter => {
    createBubble(letter);
});

function createBubble(letter) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = letter;

    const xPos = Math.random() * 100 + 30 + "px";
    const zPos = (Math.random() * 200 - 100) + "px";
    const scale = Math.random() * 0.2 + 0.7;
    const duration = (Math.random() * 4 + 4) + "s";
    const delay = (Math.random() * -parseFloat(duration)) + "s";
    const wiggle = (Math.random() * 80 - 40) + "px";

    bubble.style.setProperty("--x", xPos);
    bubble.style.setProperty("--z", zPos);
    bubble.style.setProperty("--s", scale);
    bubble.style.setProperty("--d", duration);
    bubble.style.setProperty("--delay", delay);
    bubble.style.setProperty("--wiggle", wiggle);

    bubble.addEventListener("click", () => {
	if (bubble.innerText === "") {
		input.value += " ";
	} else {
        	input.value += bubble.innerText;
	}
        bubble.remove();
        createBubble(bubble.innerText);
    });

    bottle.appendChild(bubble);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function invertCase() {
    bottleContainer.animate([
        { transform: 'translate(0, 0) rotate(0deg)' },
        { transform: 'translate(-40px, 0) rotate(-20deg)' },
        { transform: 'translate(60px, 0) rotate(20deg)' },
        { transform: 'translate(-40px, 0) rotate(-30deg)' },
        { transform: 'translate(60px, 0) rotate(20deg)' },
        { transform: 'translate(0, 0) rotate(0deg)' }
    ], {
        duration: 800,
        iterations: 1,
        easing: 'ease-in-out',
        composite: 'add'
    });
    await sleep(500);
    for (let i in bubbles) {
        if (bubbles[i].innerText != undefined) {
            if (bubbles[i].innerText === bubbles[i].innerText.toUpperCase()) {
                bubbles[i].innerText = bubbles[i].innerText.toLowerCase();
            } else {
                bubbles[i].innerText = bubbles[i].innerText.toUpperCase();
            }
        }
    };
}

erase.addEventListener("click", () => {
    input.value = input.value.substring(0, input.value.length - 1)
});

shake.addEventListener("click", invertCase);

let lastShakeTime = 0;

window.addEventListener('devicemotion', function(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const { x, y, z } = acceleration;

    const shakeThreshold = 15; // You can tweak this
    const now = Date.now();

    // Calculate the overall acceleration
    const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);

    if (accelerationMagnitude > shakeThreshold) {
        // To prevent too many triggers, check time between shakes
        if (now - lastShakeTime > 1000) { // 1 second debounce
            lastShakeTime = now;
            console.log('Shake detected!');
            this.alert("TEST");
            // You can trigger your own custom event or function here
        }
    }
});
