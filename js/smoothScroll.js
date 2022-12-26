import { navigationRow } from "./script.js";
// ? smooth scrolling

const smoothScrolling = function (e, parentEl, navEl = false) {
  const link = e.target.closest(`.${parentEl}`);
  if (!link) return;

  const linkPointer = link.getAttribute("href").slice(1);

  const target = document.querySelector(`.${linkPointer}`);
  const targetCordX = target.getBoundingClientRect().x;
  const targetCordY = target.getBoundingClientRect().y;
  console.log(targetCordY);
  if (navEl) {
    wait(0.35).then(() => {
      window.scrollTo({
        left: targetCordX,
        top: targetCordY - 50,
        behavior: "smooth",
      });
      if (navigationRow.classList.contains("navigation__active")) {
        navigationRow.classList.remove("navigation__active");
        document.querySelector(".navigation__checkbox").checked = false;
      }
    });
  } else {
    window.scrollTo({
      left: targetCordX,
      top: targetCordY - 70,
      behavior: "smooth",
    });
  }
};

export const smoothScrollHandler = function (
  parentEl,
  targetEl,
  mobile = false
) {
  document.querySelector(`.${parentEl}`).addEventListener("click", (e) => {
    if (mobile) {
      smoothScrolling(e, `${targetEl}`, true);
    } else {
      smoothScrolling(e, `${targetEl}`);
    }
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}
