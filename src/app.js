console.log("hello");

const wrapper = document.querySelector(".pokemon-wrapper");
const footer = document.querySelector(".footer");

const fetchPokemon = async () => {
  return await fetch(
    "https://api.pokemontcg.io/v2/cards?" +
      new URLSearchParams({
        pageSize: 50,
      })
  )
    .then((response) => response.json())
    .then((data) => generatorCards(data));
};

const generatorSingleCard = (singleCardData) => {
  const cardImage = document.createElement("img");
  //cardImage create in generatorCards=element
  cardImage.setAttribute("src", singleCardData.images.small);
  cardImage.setAttribute("alt", singleCardData.name);
  cardImage.setAttribute("onerror", "this.style = 'display:none;"); //card is not hidden, if error
  wrapper.appendChild(cardImage);
};
const generateStrongestInfo = (data) => {};
//generator cards - el = card

function generatorCards(data) {
  //   data.data.forEach((el) => {
  //     generatorSingleCard(el);
  //   });

  //Filter Cards
  const strongPokemonsOnly = data.data.filter(
    (el) =>
      //exchange - string on number - metod parseInt
      parseInt(el.hp) >= 100
  );
  //SORT Cards and next show it
  //from 100 to next x hp - ascending
  strongPokemonsOnly.sort(
    (a, b) =>
      //We take 2 cards and substract from each other
      parseInt(a.hp) - parseInt(b.hp)
  );
  strongPokemonsOnly.forEach((el) => {
    generatorSingleCard(el);
  });
  //REDUCE
  const newDataObjects = strongPokemonsOnly.reduce((acc, val) => {
    //deconstruction - take value
    const { name, hp, types } = val;
    acc.push({ name, hp, types });
    return acc;
  }, []); //<=new Array data
  generateStrongestInfo(newDataObjects);

  console.log(newDataObjects);
}

fetchPokemon();
