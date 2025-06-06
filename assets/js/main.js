var piesiteFired = 0;
document.addEventListener("DOMContentLoaded", function () {
    const win = window;
    const win_height = window.innerHeight;
    const windowPercentage = window.innerHeight * 0.9;

    window.addEventListener("scroll", scrollReveal);

    function scrollReveal() {
        const scrolled = window.scrollY;

        // Bar Charts
        document.querySelectorAll(".trigger").forEach((el) => {
            const offsetTop = el.getBoundingClientRect().top + window.scrollY;
            if (scrolled + windowPercentage > offsetTop || win_height > offsetTop) {
                const percentage = el.dataset.percentage;
                el.style.height = percentage + "%";

                animateNumber(el, percentage);
            } else {
                el.style.height = 0;
            }
        });

        // Horizontal Bars
        document.querySelectorAll(".chartBarsHorizontal .bar").forEach((el) => {
            const offsetTop = el.getBoundingClientRect().top + window.scrollY;
            if (scrolled + windowPercentage > offsetTop || win_height > offsetTop) {
                const percentage = el.dataset.percentage;
                el.style.width = percentage + "%";

                animateNumber(el, percentage);
            } else {
                el.style.width = 0;
            }
        });

        // Radial Graphs
        document.querySelectorAll(".piesite").forEach((el, a) => {
            const offsetTop = el.getBoundingClientRect().top + window.scrollY;
            if (scrolled + windowPercentage > offsetTop || win_height > offsetTop) {
                if (piesiteFired === 0) {
                    timerSeconds = 3;
                    timerFinish = new Date().getTime() + timerSeconds * 1000;
                    document.querySelectorAll(".piesite").forEach((_, index) => {
                        const pie = document.querySelector(`#pie_${index}`).dataset.pie;
                        timer = setInterval(() => stoppie(index, pie), 0);
                    });
                    piesiteFired = 1;
                }
            } else {
                piesiteFired = 0;
            }
        });
    }

    scrollReveal();
});

function animateNumber(el, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.ceil(progress * target);
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

var timer;
var timerFinish;
var timerSeconds;

function drawTimer(c, a) {
    const pieContainer = document.getElementById("pie_" + c);
    pieContainer.innerHTML =
        '<div class="percent"></div><div id="slice"' +
        (a > 50 ? ' class="gt50"' : "") +
        '><div class="pie"></div>' +
        (a > 50 ? '<div class="pie fill"></div>' : "") +
        "</div>";

    const b = (360 / 100) * a;
    const pie = pieContainer.querySelector("#slice .pie");
    if (pie) {
        pie.style.transform = "rotate(" + b + "deg)";
    }

    a = Math.floor(a * 100) / 100;
    const arr = a.toString().split(".");
    const intPart = arr[0];

    pieContainer.querySelector(".percent").innerHTML =
        '<span class="int">' + intPart + "</span>" +
        '<span class="symbol">%</span>';
}

function stoppie(d, b) {
    const c = (timerFinish - new Date().getTime()) / 1000;
    let a = 100 - (c / timerSeconds) * 100;
    a = Math.floor(a * 100) / 100;
    if (a <= b) {
        drawTimer(d, a);
    } else {
        const pieVal = document.getElementById("pie_" + d).dataset.pie;
        const arr = pieVal.toString().split(".");
        document.querySelector("#pie_" + d + " .percent .int").textContent = arr[0];
    }
}

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}