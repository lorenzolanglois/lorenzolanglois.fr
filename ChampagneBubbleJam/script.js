"use strict";

const bottle = document.getElementById("bottle");
const bottleContainer = document.getElementById("bottle-container");
const erase = document.getElementById("erase");
const eraseAudio = document.getElementById("eraseAudio");
const shake = document.getElementById("shake");
const breakAudio = document.getElementById("break");
const shakeAudio = document.getElementById("shakeAudio");
const pop = document.getElementById("pop");
const bubbles = document.getElementsByClassName("bubble");
const input = document.getElementById("name-input");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");

const SPAWN_COUNT = 10;
const HORIZONTAL_SPREAD = 3;

var isShards = false;

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
        pop.currentTime = 0;
        pop.play();
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
    if (!isShards) {
        if (Math.random() * 10 > 9) {
            shakeAudio.pause();
            shakeAudio.currentTime = 0;
            animate();
            return;
        }
    } else {
        return;
    }
    shakeAudio.currentTime = 0;
    shakeAudio.play();
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
    }
    erase.focus();
}

erase.addEventListener("click", () => {
    eraseAudio.currentTime = 0;
    eraseAudio.play();
    input.value = input.value.substring(0, input.value.length - 1)
});

shake.addEventListener("click", invertCase);

var shards = [];

function spawnShard() {
    const shard = document.createElement('div');
    shard.classList.add('shard');

    shard.x = window.innerWidth / 2 * (Math.random() * 0.15 + 0.8);
    shard.y = 100 * (Math.random() * 5 + 0.8);

    shard.vx = (Math.random() - 0.5) * HORIZONTAL_SPREAD;
    shard.vy = 0;

    shard.style.left = shard.x + 'px';
    shard.style.top = shard.y + 'px';
    shard.style.rotate = Math.random() + (shard.x * Math.random()) + 'deg';

    document.body.appendChild(shard);
    shards.push(shard);
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < SPAWN_COUNT; i++) {
        spawnShard();
    }
});

async function animate() {
    isShards = true;
    bottleContainer.style.visibility = "hidden";
    breakAudio.play();
    for (let i = shards.length - 1; i >= 0; i--) {
        shards[i].style.opacity = 1;
    }
    for (let i = shards.length - 1; i >= 0; i--) {
        const s = shards[i];
        s.vy += (Math.random() * 0.3);
        s.x += s.vx;
        s.y += s.vy;

        s.style.left = s.x + 'px';
        s.style.top = s.y + 'px';

        if (s.y > window.innerHeight * 2) {
            shards = [];
            await sleep(2000);
            for (let i = 0; i < SPAWN_COUNT; i++) {
                spawnShard();
            }
            bottleContainer.style.visibility = "visible";
            erase.focus();
            isShards = false;
            return;
        }
    }
    requestAnimationFrame(animate);
}

document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });
