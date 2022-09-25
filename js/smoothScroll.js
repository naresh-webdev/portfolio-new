// ? smooth scrolling

const smoothScrolling = function (e, parentEl) {
  const link = e.target.closest(`.${parentEl}`);
  if (!link) return;

  const linkPointer = link.getAttribute("href").slice(1);

  const target = document.querySelector(`.${linkPointer}`);
  const targetCordX = target.getBoundingClientRect().x;
  const targetCordY = target.getBoundingClientRect().y;
  console.log(targetCordY);
  window.scrollTo({
    left: targetCordX,
    top: targetCordY - 50,
    behavior: "smooth",
  });
};

export const smoothScrollHandler = function (
  parentEl,
  targetEl,
  mobile = false
) {
  document.querySelector(`.${parentEl}`).addEventListener("click", (e) => {
    smoothScrolling(e, `${targetEl}`);

    if (mobile) {
      if (
        document
          .querySelector(".navigation__row")
          .classList.contains("navigation__active")
      ) {
        document
          .querySelector(".navigation__row")
          .classList.remove("navigation__active");
        document.querySelector(".navigation__checkbox").checked = false;
      }
    }
  });
};
