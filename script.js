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

// Henter data fra restdp
let drinks;
const header = document.querySelector("h2");
const url = "https://drinkkort-5373.restdb.io/rest/drinks";
const options = {
  headers: {
    "x-apikey": "613b464043cedb6d1f97ef65",
  },
};

async function hentData() {
  const jsonData = await fetch(url, options);
  drinks = await jsonData.json();
  console.log(drinks);
  visIndhold(drinks);

}

hentData(drinks);


function visIndhold() {
  // variabler for indholdets destination og templaten
  const destination = document.querySelector("#liste");
  let template = document.querySelector("template");
  // rydder indholdet af sektionen så der er plads til det nye indhold efter filtrering)
  destination.textContent = "";

  drinks.forEach(drink => {
      // if conditionen tjekker for filter og looper derefter igennem det tilsvarende indhold
      
          const klon = template.cloneNode(true).content;
          klon.querySelector(".navn").textContent = drink.navn;
          klon.querySelector("img").src = "drinks/" + drink.billednavn + ".png";
          destination.appendChild(klon);
      

  });
}

