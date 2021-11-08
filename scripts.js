const container = document.querySelector(".container");

const imageNames = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot"];


let qtdCards = null;
let lastCardSelecionada = null;
let BoardLocked = false;
let Vitoria = 0;
let NumeroMovimentos = 0;


NumeroCartas();

function NumeroCartas() {
  
  while (qtdCards % 2 !== 0 || qtdCards < 4 || qtdCards > 14 ) {
    qtdCards = parseInt(prompt("Com quantas cartas você quer jogar?"));
    }

  }
  
  CriaCard(qtdCards);

function CriaCard(){

  

  const imageNames = ImgAleatoria();

  imageNames.forEach((imageName) => DivCard(imageName));
}

function ImgAleatoria() {
  let NomeImgAleatoria = [];

  while (NomeImgAleatoria.length < qtdCards / 2) {
    const randomIndex = parseInt(Math.random() * 7);
    const name = imageNames[randomIndex];

    if (NomeImgAleatoria.indexOf(name) === -1) {
      NomeImgAleatoria.push(name);
    }
  }

  NomeImgAleatoria = [...NomeImgAleatoria, ...NomeImgAleatoria];
  NomeImgAleatoria.sort(comparador);

  return NomeImgAleatoria;
}
function comparador() {
  return Math.random() - 0.5;
}

function DivCard(nome) {

  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("id", nome, "card");
  div.addEventListener("click", () => CardSelecionadaFuncao(div));

  

  const backImage = document.createElement("img");
  backImage.classList.add("back-card");
  backImage.setAttribute("src", `./assets/${nome}.gif`, "back-face");

  

  const frontImage = document.createElement("img");
  frontImage.setAttribute("src", "./assets/front.png", "front-face");

  div.appendChild(backImage);
  div.appendChild(frontImage);

  container.appendChild(div);
}
function CardSelecionadaFuncao(CardSelecionada) {

  const CardLocked = CardSelecionada.classList.contains("locked");

  if (CardLocked || BoardLocked) {

    return;
  }

  CardSelecionada.classList.add("flipped", "locked");

  if (lastCardSelecionada === null) {

    lastCardSelecionada = CardSelecionada;
  } else if (CardSelecionada.id === lastCardSelecionada.id) {

    Vitoria++;
    lastCardSelecionada = null;

  } else {
    BoardLocked = true;

    setTimeout(() => {
      CardSelecionada.classList.remove("flipped", "locked");

      lastCardSelecionada.classList.remove("flipped", "locked");
      lastCardSelecionada = null;

      BoardLocked = false;
    }, 1000);
  }

  NumeroMovimentos++;

  VerificarVitória();
}
function VerificarVitória() {
  const victory = qtdCards / 2;
  if (Vitoria === victory) {
    BoardLocked = true;

    setTimeout(() => {
    alert(`Você ganhou em ${NumeroMovimentos} jogadas!`);
    }, 1000);
  }
}


