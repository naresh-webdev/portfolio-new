("use strict");

import { mail } from "./mail.js";
import { smoothScrollHandler } from "./smoothScroll.js";

//?Variable Declarations
const preloadLetter = document.querySelector(".header__preload--logo-letter");
const section1 = document.querySelector(".header");
const section2 = document.querySelector(".about");
const section3 = document.querySelector(".skills");
const section4 = document.querySelector(".work");
const section5 = document.querySelector(".contact");
const cursor = document.querySelector(".cursor");
const error = document.querySelector(".error");
// const errorText = document.querySelector(".errorText");
// const successText = document.querySelector(".successText");
const closeIconError = document.querySelector(".close-icon-error");

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

window.addEventListener("resize", (e) => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 500) {
    document.querySelector(".navigation__button").classList.add("hidden");
  }
  if (windowWidth < 500) {
    document.querySelector(".navigation__button").classList.remove("hidden");
  }
});

//?section-1.preload

window.addEventListener("load", function () {
  setTimeout(function () {
    document
      .querySelector(".header__preload--logo-svg")
      .classList.add("header__preload--logo-after");
    document.querySelector(".header__preload--logo-letter").style.fontSize =
      "2rem";
    document.querySelector(".header__preload--logo-letter").style.display =
      "none";

    setTimeout(() => {
      if (window.innerWidth < 500) {
        document
          .querySelector(".navigation__button")
          .classList.remove("hidden");
      }
      document.querySelector(".header__preload").classList.add("hidden");
      section1.classList.remove("hidden");
      section2.classList.remove("hidden");
      // document.querySelectorAll(".down").forEach((arr) => {
      //   arr.classList.remove("hidden");
      // });

      section3.classList.remove("hidden");
      section4.classList.remove("hidden");
      section5.classList.remove("hidden");
      error.classList.remove("hidden");
      const observer1 = new IntersectionObserver(
        (e) => {
          // console.log(e[0].isIntersecting);
          console.log("section 1", e[0].isIntersecting);
          if (e[0].isIntersecting) {
            document.querySelectorAll(".down").forEach((arr) => {
              arr.classList.remove("hidden");
            });

            //! HEADER APPLICATION DESIGN
            // ? Navigation animation
            const navItems = document.querySelectorAll(".header__nav--item");
            // console.log(navItems);
            navItems.forEach((navItem) => {
              navItem.style.transform = "translateY(0rem)";
              navItem.style.opacity = "1";
            });
            document.querySelector(".btn--resume").style.transform =
              "translateY(0rem)";
            document.querySelector(".btn--resume").style.opacity = "1";
            document.querySelector(".header__nav--logo-box").style.transform =
              "translateY(0rem)";
            document.querySelector(".header__nav--logo-box").style.opacity =
              "1";

            // ? Header-content animation
            document.querySelectorAll(".header__text").forEach((headerEl) => {
              // console.log(headerEl);
              headerEl.style.transform = "translateX(0rem)";
              headerEl.style.opacity = "1";
            });

            // ? Header-image animation
            document.querySelector(
              ".header__container--image"
            ).style.transform = "translateX(0rem)";
            document.querySelector(".header__container--image").style.opacity =
              "1";

            (async function () {
              setTimeout(() => {
                document.querySelector(
                  ".btn--contact"
                ).style.transitionDuration = ".3s";
              }, 3000);
            })();
          }
        },
        {
          root: null,
          threshold: 0.8,
        }
      );

      const observer2 = new IntersectionObserver(
        (e) => {
          // console.log(e);
          // console.log(e[0].isIntersecting, "section 2");
          if (e[0].isIntersecting) {
            document.querySelectorAll(".down").forEach((arr) => {
              arr.classList.add("hidden");
            });

            //! ABOUT SECTION ANIMATION
            document
              .getElementById("about-me-text")
              .classList.add("scroll-animation");
            document
              .querySelectorAll(".about__text-paragraph")
              .forEach((paragraph) => {
                paragraph.classList.add("scroll-animation");
              });
            document.querySelector(".tagcloud").style.transform =
              "translate(-6rem,0rem)";
            document.querySelector(".tagcloud").style.opacity = "1";
          }
        },
        {
          root: null,
          threshold: 0.2,
        }
      );

      const observer3 = new IntersectionObserver(
        (e) => {
          // console.log(e[0].isIntersecting, "section 3");
          if (e[0].isIntersecting) {
            // document.querySelectorAll(".down").forEach((arr) => {
            //   arr.classList.add("hidden");
            // });

            //! SKILL SECTION ANIMATION
            document
              .querySelector(".secondary-heading")
              .classList.add("scroll-animation");

            document.querySelectorAll(".skill-content").forEach((con) => {
              con.classList.add("scroll-animation");
            });

            document
              .querySelector(".skill-bar")
              .classList.add("scroll-animation");
          }
        },
        {
          root: null,
          threshold: 0.35,
        }
      );

      const observer4 = new IntersectionObserver(
        (e) => {
          // console.log(e[0].isIntersecting, "section 4");
          if (e[0].isIntersecting) {
            //! WORK SECTION ANIMATION

            if (e[0].intersectionRatio > 0.1) {
              document
                .getElementById("work-heading")
                .classList.add("scroll-animation");

              document
                .getElementById("work-1")
                .classList.add("scroll-animation");
            }

            if (e[0].intersectionRatio > 0.4) {
              document
                .getElementById("work-2")
                .classList.add("scroll-animation");
            }
          }
        },
        {
          root: null,
          threshold: [0.1, 0.4],
        }
      );

      const observerWork3 = new IntersectionObserver(
        (e) => {
          // console.log(e);
          if (e[0].isIntersecting) {
            document.getElementById("work-3").classList.add("scroll-animation");
          }
        },
        {
          root: null,
          threshold: 1,
          rootMargin: "500px 0px 0px 0px",
        }
      );
      observerWork3.observe(document.getElementById("work-2"));

      const observer5 = new IntersectionObserver(
        (e) => {
          // console.log(e[0].isIntersecting, "section 5");
          if (e[0].isIntersecting) {
            // document.querySelectorAll(".down").forEach((arr) => {
            //   arr.classList.add("hidden");
            // });

            //! CONTACT SECTION ANIMATION
            document
              .getElementById("contact-heading")
              .classList.add("scroll-animation");

            document
              .querySelector(".form-container")
              .classList.add("scroll-animation");
          }
        },
        {
          root: null,
          threshold: 0.35,
        }
      );

      observer1.observe(section1);
      observer2.observe(section2);
      observer3.observe(section3);
      observer4.observe(section4);
      observer5.observe(section5);
    }, 650);
  }, 3500);
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
  radius: 200,

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

//? send mail
new mail("service_5ls2xer", "template_xsgo1px", "REuIZUBFPI5XC8qFR");

closeIconError.addEventListener("click", function () {
  console.log("click");
  error.style.opacity = 0;
});

// ? navigation animation
export const navigationRow = document.querySelector(".navigation__row");

document
  .querySelector(".navigation__button")
  .addEventListener("click", function (e) {
    console.log("click");
    navigationRow.classList.toggle("navigation__active");
  });

// ? smooth scrolling

// smoothScrollHandler("header__nav--items", "header__nav--item");

const smoothScrollElements = [
  ["header__nav--items", "header__nav--item", false],
  ["btn--contact", "btn--contact", false],
  ["header__nav--logo-box", "header__nav--logo-box", false],
  ["nav--contents", "nav--content", true],
];

smoothScrollElements.forEach((targetSet) => {
  smoothScrollHandler(targetSet[0], targetSet[1], targetSet[2]);
});
