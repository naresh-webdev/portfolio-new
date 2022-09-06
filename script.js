("use strict");

//?Variable Declarations
const preloadLetter = document.querySelector(".header__preload--logo-letter");
const section1 = document.querySelector(".header");
const section2 = document.querySelector(".about");
const section3 = document.querySelector(".skills");
const section4 = document.querySelector(".work");
const section5 = document.querySelector(".contact");
const cursor = document.querySelector(".cursor");

// //?cursor animation

// section1.addEventListener("mousemove", (e) => {
//   cursor.classList.remove("hidden");
//   cursor.setAttribute(
//     "style",
//     "top:" + (e.pageY - 10) + "px; left:" + (e.pageX - 10) + "px;"
//   );
// });

// section2.addEventListener("mousemove", () => {
//   if (!cursor.classList.contains("hidden")) {
//     cursor.classList.add("hidden");
//   }
// });

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: "48a55d1d737e8099",
  });
}

//?section-1.preload

window.addEventListener("load", function () {
  setTimeout(function () {
    document.querySelector(".header__preload").classList.add("hidden");
    section1.classList.remove("hidden");
    section2.classList.remove("hidden");
    section3.classList.remove("hidden");
    section4.classList.remove("hidden");
    section5.classList.remove("hidden");
  }, 2500);
});

setTimeout(function () {
  preloadLetter.classList.add("header__preload--logo-letter-animate");
  preloadLetter.style.opacity = 1;
}, 1000);
//

//?section-1.main

const Texts = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "SASS",
  "REACT",
  "PYTHON",
  "FLASK",
  "BOOTSTRAP",
  "MYSQL",
  "JQUERY",
  "TAILWIND",
  "GIT",
  "BEM",
  "ES5/ES6",
];

var tagCloud = TagCloud(".Sphere", Texts, {
  // Sphere radius in px
  radius: 230,

  // animation speed
  // slow, normal, fast
  maxSpeed: "fast",
  initSpeed: "fast",

  // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)]
  direction: 135,

  // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
  keep: true,
});

// Giving color to each text in sphere
var color = "#64ffda ";
document.querySelector(".Sphere").style.color = color;

// send mail

var data = {
  service_id: "service_5ls2xer",
  template_id: "template_xsgo1px",
  user_id: "REuIZUBFPI5XC8qFR",
  template_params: {
    name: "James",
    subject: "subject",
    email: "test@gmail.com",
    message: "message",
    "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
  },
};

$.ajax("https://api.emailjs.com/api/v1.0/email/send", {
  type: "POST",
  data: JSON.stringify(data),
  contentType: "application/json",
})
  .done(function () {
    alert("Your mail is sent!");
  })
  .fail(function (error) {
    alert("Oops... " + JSON.stringify(error));
  });
