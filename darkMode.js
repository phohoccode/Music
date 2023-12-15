const switchElement = document.querySelector(".switch");
const h4Element = document.querySelector('h4')
const dashboardElement = document.querySelector(".dashboard");
const cdElement = document.querySelector(".cd");
const nameSongElement = document.querySelector(".name-song");
const timesElement = document.querySelector(".times");
const optionalControlsElement = document.querySelector(".optional-controls");
const playlistElement = document.querySelector('.playlist')
const btnElement = document.querySelectorAll(".btn");
const contentElement = document.querySelector(".content");
const contentTitleElement = document.querySelector(".content__title");
const contentSubTitleElement = document.querySelector(".content__sub-title");
const contentDes = document.querySelector(".content__des");
const textContactElement = document.querySelector(".text-contact");
const socicalsElement = document.querySelector(".socicals");
const bodyElement = document.querySelector('body')

switchElement.addEventListener('click', function() {
    bodyElement.classList.toggle('body-darkMode')
})

const toggleDarkMode = () => {
  const elementsToToggle = [
    h4Element,
    dashboardElement,
    cdElement,
    nameSongElement,
    playlistElement,
    timesElement,
    optionalControlsElement,
    contentElement,
    contentTitleElement,
    contentSubTitleElement,
    contentDes,
    textContactElement,
    socicalsElement,
  ];

  elementsToToggle.forEach((element) => {
    element.classList.toggle("dark-mode");
  });

  btnElement.forEach((btn) => {
    btn.classList.toggle("dark-mode");
  });
};

switchElement.addEventListener("click", toggleDarkMode);

