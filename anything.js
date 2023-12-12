//event listeners
document.getElementById("Btn").addEventListener("click", Sick);

//Start paragraph animation
function scrollDown() {
  window.scroll({
    top: 1500,
    left: 0,
    behavior: "smooth",
  });
}

function ClrBack() {
  Btn.style = "color: white";
}

function Sick() {
  const Btn = document.getElementById("Btn");
  Btn.style = "color: rgb(170,160,21);";

  setTimeout(scrollDown, 500);

  setTimeout(ClrBack, 1500);
}
