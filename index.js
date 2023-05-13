// text change / typing animation

const textArray = ["Learn", "Practice", "Build"];
let textIndex = 0;
let charIndex = 0;
let eraseIndex = 0;
let eraseMode = false;

setInterval(() => {
  const text = textArray[textIndex];
  const textElement = document.getElementById("blind-window");

  if (eraseMode) {
    textElement.innerText = text.substring(0, text.length - eraseIndex);
    eraseIndex++;
    if (eraseIndex > text.length) {
      eraseIndex = 0;
      eraseMode = false;
      textIndex++;
      if (textIndex >= textArray.length) {
        textIndex = 0;
      }
    }
  } else {
    textElement.innerText = text.substring(0, charIndex);
    charIndex++;
    if (charIndex > text.length) {
      charIndex = 0;
      eraseMode = true;
    }
  }
}, 200);


// module clickable 

let module_buttons = document.querySelectorAll(".course_btn")
console.log(module_buttons)

let module_content = document.querySelectorAll(".course_desc")
console.log(module_content)

let activeButtonIndex = 0
let activeModuleContent = 0

module_buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    activeButtonIndex = index;
    changeActiveButton(activeButtonIndex);
  });
});



function changeActiveButton(index) {

  // buttons
  module_buttons.forEach((button) => {

    button.classList.remove("active");
  });

  // images or animation
  module_content.forEach((content) => {
    content.classList.add("d-none");
  });

  module_buttons[index].classList.add("active")
  module_content[index].classList.remove("d-none")
  module_content[index].classList.add("active")


}

const navbar = document.querySelector(".navbar");
const body = document.querySelector("body");

window.onscroll = () => {
  if (this.scrollY > 100) {
    navbar.style.borderBottom = "2px solid rgb(203, 74, 84)";


  }else{
    navbar.style.borderBottom = "none";

  }
};
