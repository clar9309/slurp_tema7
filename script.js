// Lytter til siden er loadet
window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#menuknap").addEventListener("click", toggleMenu);
  start();
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

let drinks;
let filter ="alle";

const header = document.querySelector("h2");
const url = "https://drinkkort-5373.restdb.io/rest/drinks";
const options = {
  headers: {
    "x-apikey": "613b464043cedb6d1f97ef65",
  },
};

function start() {
  
  const filterKnapper = document.querySelectorAll("ul button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerDrinks)
  );
  
  hentData(drinks);
}

//   -----------------------------------------------------------------------

function filtrerDrinks() {
  //sætter filters værdi lig med værdien fra data af den knap der førte ind i funktionen
  filter = this.dataset.kategori;
  console.log(filter);
//fjerner og tilføjer valgt class til den rigtige knap
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");


  visIndhold();

  header.textContent = this.textContent;
}

// Henter data fra restdp, skriver data ud som en besked i console, og kalder derefter functionen visindhold med det hentede data
async function hentData() {
  const jsonData = await fetch(url, options);
  drinks = await jsonData.json();
  console.log(drinks);
  visIndhold(drinks);
}



function visIndhold() {
  // variabler for indholdets destination og templaten
  const destination = document.querySelector("#liste");
  let template = document.querySelector("template");

  // rydder indholdet af sektionen så der er plads til det nye indhold efter filtrering)
  destination.textContent = "";

  drinks.forEach(drink => {
    if (filter == drink.alkoholtyper || filter == "alle") {
    const klon = template.cloneNode(true).content;

    
    klon.querySelector("img").src = "drinks/" + drink.billednavn + ".svg";
    klon.querySelector(".navn").textContent = drink.navn;
    klon.querySelector(".citat").textContent = drink.citat;

    klon.querySelector("article").addEventListener("click",() => visDetaljer(drink));
    klon.querySelector(".seMere").addEventListener("click",() => visDetaljer(drink));

    destination.appendChild(klon);
    
}});
}
//-----fører hen til single view---//
function visDetaljer (drink) {
  location.href = `galleri-single.html?id=${drink._id}`;
}




