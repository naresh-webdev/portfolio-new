("use strict");

//?Variable Declarations
const preloadLetter = document.querySelector(".header__preload--logo-letter");
const section1 = document.querySelector(".header");
const section2 = document.querySelector(".about");
const section3 = document.querySelector(".skills");
const section4 = document.querySelector(".work");
const section5 = document.querySelector(".contact");
const cursor = document.querySelector(".cursor");
const error = document.querySelector(".error");
const closeIcon = document.querySelector(".close-icon");
const errorText = document.querySelector(".errorText");

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
    document
      .querySelector(".header__preload--logo-svg")
      .classList.add("header__preload--logo-after");
    document.querySelector(".header__preload--logo-letter").style.fontSize =
      "2rem";
    document.querySelector(".header__preload--logo-letter").style.display =
      "none";

    setTimeout(() => {
      document.querySelector(".header__preload").classList.add("hidden");
      section1.classList.remove("hidden");
      section2.classList.remove("hidden");
      document.querySelectorAll(".down").forEach((arr) => {
        arr.classList.remove("hidden");
      });
      document.querySelector(".list-icon").classList.remove("hidden");
      section3.classList.remove("hidden");
      section4.classList.remove("hidden");
      section5.classList.remove("hidden");
      error.classList.remove("hidden");

      const observer = new IntersectionObserver(
        (e) => {
          // console.log(e[0].isIntersecting);
          if (e[0].isIntersecting) {
            document.querySelectorAll(".down").forEach((arr) => {
              arr.classList.add("hidden");
            });
          }
        },
        {
          root: null,
          threshold: 0,
        }
      );
      const observer1 = new IntersectionObserver(
        (e) => {
          console.log(e[0].isIntersecting);
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

            // ? Header-content animation
            document.querySelectorAll(".header__text").forEach((headerEl) => {
              console.log(headerEl);
              headerEl.style.transform = "translateX(0rem)";
              headerEl.style.opacity = "1";
            });

            // ? Header-image animation
            document.querySelector(
              ".header__container--image"
            ).style.transform = "translateX(0rem)";
            document.querySelector(".header__container--image").style.opacity =
              "1";
          }
        },
        {
          root: null,
          threshold: 0.8,
        }
      );
      observer1.observe(section1);
      observer.observe(section2);
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

// var data = {
//   service_id: "service_5ls2xer",
//   template_id: "template_xsgo1px",
//   user_id: "REuIZUBFPI5XC8qFR",
//   template_params: {
//     name: "James",
//     subject: "subject",
//     email: "test@gmail.com",
//     message: "message",
//     "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
//   },
// };

// $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
//   type: "POST",
//   data: JSON.stringify(data),
//   contentType: "application/json",
// })
//   .done(function () {
//     alert("Your mail is sent!");
//   })
//   .fail(function (error) {
//     alert("Oops... " + JSON.stringify(error));
//   });

class mail {
  constructor(serviceID, templateID, publicKey) {
    this.serviceId = serviceID;
    this.templateId = templateID;
    this.publicKey = publicKey;
    this.templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("textarea").value,
    };

    document
      .querySelector(".submit-btn")
      .addEventListener("click", this.btnOnClick.bind(this));
  }

  btnOnClick(e) {
    e.preventDefault;
    this.templateParams.name = document.getElementById("name").value;
    this.templateParams.email = document.getElementById("email").value;
    this.templateParams.subject = document.getElementById("subject").value;
    this.templateParams.message = document.getElementById("textarea").value;

    // * 1.check if all the field are not empty
    if (
      this._isEmpty([
        this.templateParams.name,
        this.templateParams.email,
        this.templateParams.subject,
        this.templateParams.message,
      ])
    ) {
      // *2.check if the name has atleast 3 characters
      if (this.templateParams.name.length >= 3) {
        this._isDeliverable(this.templateParams.email);
      } else {
        //! error for condition 2-solved
        // alert("name should be atleast 3 character or more");
        errorText.textContent = "Name cannot be less than 3 characters !!!";
        error.style.opacity = 1;
      }
    } else {
      //! error for condition 1-solved
      // alert("empty fields not allowed !!!");
      errorText.textContent = "Empty fields not allowed !!!";
      error.style.opacity = 1;
    }
  }

  _isEmpty([...args]) {
    // console.log(args);
    if (args.every((field) => field !== "")) {
      return true;
    } else {
      return false;
    }
  }

  _isDeliverable(email) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return fetch(
      `https://api.eva.pingutil.com/email?email=${email}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "success") {
          if (res.data.deliverable) {
            this._sendMail();
          } else {
            //!raise error-solved
            errorText.textContent = "Invalid email address !!!";
            error.style.opacity = 1;
            throw new Error("email address not delievarable");
          }
        } else {
          //!raise error-solved
          errorText.textContent = "Enter a valid email address !!!";
          error.style.opacity = 1;
          throw new Error("enter a valid email address");
        }
      })
      .catch((err) => {
        //!raise error-solved
        errorText.textContent = `Network Error: ${err.message} data !!!`;
        error.style.opacity = 1;
      });
  }

  _sendMail() {
    emailjs.init(this.publicKey);
    emailjs
      .send(
        this.serviceId,
        this.templateId,
        this.templateParams,
        this.publicKey
      )
      .then((res) => {
        if (res.status === 200) {
          // *success message
          alert("success message sent");
        } else {
          //!raise error - solved
          // alert("message couldn't send please try again");
          errorText.textContent = `message couldn't send please try again!!!`;
          error.style.opacity = 1;
        }
      })
      .catch((err) => console.console.error(err));
  }
}

const MailOjbect = new mail(
  "service_5ls2xer",
  "template_xsgo1px",
  "REuIZUBFPI5XC8qFR"
);

/*
submitBtn;
// !mail sending funcion
function sendMail() {
  emailjs.init("REuIZUBFPI5XC8qFR");
  emailjs
    .send(
      "service_5ls2xer",
      "template_xsgo1px",
      templateParams,
      "REuIZUBFPI5XC8qFR"
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("message sent");
      }
    });
}

// *testing functions

// const testMail = document.getElementById("email").value;
// const testMail = "test@gmail.com";

const isDeliverable = function (testMail) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `https://api.eva.pingutil.com/email?email=${testMail}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.status === "success") {
        if (res.data.deliverable) {
          sendMail();
        } else {
          //!raise error
          throw new Error("email address not delievarable");
        }
      } else {
        //!raise error
        throw new Error("enter a valid email address");
      }
    })
    .catch((error) => console.log("error", error));
};

const isEmpty = function ([...args]) {
  // console.log(args);
  if (args.every((field) => field !== "")) {
    checkName(document.getElementById("name").value);
  } else {
    //!raise error
  }
};

const checkName = (name) => {
  if (name.length > 3) {
    isDeliverable(document.getElementById("email").value);
  } else {
    //!raise error

    alert("name should be more than 3 ch");
  }
};

// isDeliverable(testMail);

*/

closeIcon.addEventListener("click", function () {
  error.style.opacity = 0;
});
