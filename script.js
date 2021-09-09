// Lytter til siden er loadet
window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

//console log skriver en besked til konsollen - kan evt bruges til at teste
function toggleMenu() {
  console.log("toggleMenu");
  // toggle betyder at jeg kan tilføje noget hvis det ikke er der, eller fjerne det hvis det er der
  document.querySelector("#menu").classList.toggle("hidden");

  //Skjuler burger menu
  let erSkjult = document.querySelector("#menu").classList.contains("hidden");

  //hvis den indeholder class hidden, og det er sandt, så skjuler den det. Og hvis den ikke indeholder hidden, så er det falsk.
  if (erSkjult == true) {
    document.querySelector("#menuknap").textContent = "☰";
  } else {
    document.querySelector("#menuknap").textContent = "✕";
  }
}
