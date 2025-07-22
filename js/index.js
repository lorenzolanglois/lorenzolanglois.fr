"use strict";

const eraser = document.getElementById("eraser");
const canvas = document.getElementById("drawable");
const footer = document.getElementsByTagName("footer")[0];
const creditsOverlay = document.querySelector("overlay:has(credits)");
const overlays = document.querySelectorAll("overlay");
const galleryImages = document.querySelectorAll(".gallery a");
const imageDisplay = document.querySelector("overlay img:first-child");
const languageLinks = document.querySelectorAll("topbar a:not(:has(img))");
const context = canvas.getContext("2d", { willReadFrequently: true });
const allowedTags = new Set(["DIV", "BODY", "FORM"]);
const languageNames = ["frFrançais", "enEnglish"];

var isPainting = false;
var lang = (window.location.href.split('/').pop().split('#')[0] || "fr");

canvas.width = window.innerWidth;
canvas.height = document.body.clientHeight;
context.lineWidth = 5;
context.lineCap = "round";
context.strokeStyle = "yellow";

document.documentElement.style.cursor = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDkwLCA1MCwgNTApIiBkPSJNNjkgMTFoLTFMMTIgNjh2MWwxOSAxOWgxbDU2LTU3di0xTDY5IDExek05NyA5bC02LTZhMTAgMTAgMCAwIDAtMTQgMGwtNiA2djFsMTkgMTloMWw2LTZhMTAgMTAgMCAwIDAgMC0xNHpNMTAgNzAgMCA5OWwxIDEgMjgtMTBoMXYtMUwxMCA3MHoiLz48L3N2Zz4="), auto';

imageDisplay.insertAdjacentHTML("afterend", '<img src="assets/spinner.svg" alt="Charge">');
const loadingImageDisplay = document.querySelector("overlay img:last-child");

Array.from(document.getElementsByTagName("video")).forEach(element => {
    element.poster = element.poster.replace("_small", "_thumbnail");
});

Array.from(document.getElementsByTagName("preview")).forEach(element => {
    element.style.backgroundImage = "linear-gradient(rgba(219, 219, 219, 0.3), rgba(0, 0, 0, 0.5)), url('" + element.getAttribute("src") + "')";
    element.addEventListener("mouseenter", function (e) {
        const iframe = document.createElement("iframe");
        iframe.className = "main";
        iframe.src = "https://www.youtube-nocookie.com/embed/" + e.target.getAttribute("video");
        iframe.title = "YouTube video player";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        e.target.parentElement.appendChild(iframe)
        e.target.style.setProperty("--preview-icon", "url('')");
        e.target.className = "main previewfadeout";
    }, {once: true});
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
        document.documentElement.style['-webkit-user-select'] = "none";
        document.documentElement.style.userSelect = "none";
        document.getElementById("up").style.right = "100px";
    }
});

document.body.addEventListener("pointerup", function () {
    isPainting = false;
    context.beginPath();
    document.documentElement.style['-webkit-user-select'] = "auto";
    document.documentElement.style.userSelect = "auto";
});

document.body.addEventListener("pointermove", function (e) {
    if (!isPainting) return;
    context.lineTo(e.clientX, e.clientY + window.scrollY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY + window.scrollY);
});

window.addEventListener("scroll", function () {
    if (window.scrollY >= 500) {
        document.getElementById("up").style.display = "block";
    } else {
        document.getElementById("up").style.display = "none";
    }
    if (eraser.style.display === "block") {
        document.getElementById("up").style.right = "100px";
    } else {
        document.getElementById("up").style.right = "10px";
    }
});

eraser.addEventListener("click", function () {
    eraser.style.display = "none";
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("up").style.right = "10px";
});

eraser.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    eraser.style.transform = "scale(1.05)";
});


eraser.addEventListener("pointerup", function () {
    eraser.style.transform = "scale(1)";
});

document.getElementById("up").addEventListener("pointerdown", function (e) {
    e.preventDefault();
    document.getElementById("up").style.transform = "scale(1.05)";
});

document.getElementById("up").addEventListener("pointerup", function (e) {
    e.preventDefault();
    document.getElementById("up").style.transform = "scale(1)";
});

overlays.forEach(function(elem) {
    elem.addEventListener("click", function (e) {
        if (e.target.tagName !== "OVERLAY") return;
        elem.style.display = "none";
    });
});

footer.addEventListener("click", function () {
    creditsOverlay.style.display = "block";
});

galleryImages.forEach(function(elem) {
    elem.addEventListener("click", function (e) {
        e.preventDefault();
        loadingImageDisplay.style.display = "block";
        imageDisplay.parentElement.style.display = "block";
        imageDisplay.src = elem.href;
        imageDisplay.alt = elem.getElementsByTagName("IMG")[0].alt;
    });
});

imageDisplay.addEventListener("load", function () {
    loadingImageDisplay.style.display = "none";
});

languageLinks.forEach(function(elem) {
    elem.addEventListener("click", function (e) {
        e.preventDefault();
        elem.innerHTML = languageNames.find(item => item.startsWith(lang)).slice(2);
        var oldLang = lang;
        lang = (e.target.href.split('/').pop() || "fr");
        if (lang === "fr") {
            window.history.pushState("", "", "/");
        } else  {
            window.history.pushState("", "", e.target.href);
        }
        elem.href = oldLang === "fr" ? "/" : oldLang;
        changeLanguage(lang);
    });
});

function changeLanguage(_lang) {
    fetch("lang/lang-" + _lang + ".json")
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                const translationText = data.text[key];
                const translationAlt = data.alt[key];
                const translationTitle = data.title[key];
                const translationHref = data.href[key];
                var isTextReplaced = false;

                el.childNodes.forEach(node => {
                  if (node.nodeType === Node.TEXT_NODE && !isTextReplaced && translationText) {
                    node.textContent = translationText;
                    isTextReplaced = true;
                  }
                });
                if (translationAlt) {
                    el.alt = translationAlt;
                }
                if (translationTitle) {
                    el.title = translationTitle;
                }
                if (translationHref) {
                    el.href = translationHref;
                }
            });
            document.documentElement.lang = _lang;
            document.title = "Lorenzo Langlois - " + data.text["developer"];
        });
}
