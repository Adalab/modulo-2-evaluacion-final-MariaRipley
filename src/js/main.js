'use strict';

const ulElement = document.querySelector('.js_character_list');
const ulFavourites = document.querySelector('.js_character_fav');

const url = 'https://api.disneyapi.dev/character';

let listCharactersApi = [];
let listCharacterFavourites = [];

//Petición al servidor

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCharactersApi = data.data;
    renderCharacterList(listCharactersApi);
  });

//Función para generar listado de tarjetas

function renderCharacterList(listData) {
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
  addEventCharacter();
}

//Función para evento click sobre la tarjeta

function addEventCharacter() {
  const liElementList = document.querySelectorAll('.js_li_card');
  for(const li of liElementList) {
    li.addEventListener('click', handleClick);
  }
}

//Función para generar una tarjeta

function renderCharacter(character) {
  const valueImg = character.imageUrl;
  const valueName = character.name;
  const valueId = character._id;
  let html = `<li id="${valueId}" class="card js_li_card"><div class="">
        <img src="${valueImg}" alt="" class="card__img" />
        <p class="card__text">${valueName}</p>
        </div></li>`;

  if (!valueImg) {
    const blankImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    html = `<li id="${valueId}" class="card js_li_card"><div class="">
            <img src="${blankImg}" alt="" class="card__img" />
            <p class="card__text">${valueName}</p>
            </div></li>`;
  }
  return html;
}

//Función favoritos

function handleClick(event) {
    debugger;
  //Al dar click en cualquier parte de la tarjeta: 
  const id = parseInt(event.currentTarget.id);
  const selectedCharacter = listCharactersApi.find((item) => item._id === id);
  /*Para que no añada varias veces el mismo personaje a favoritos y lo quite si ya está añadido y la usuaria lo vuelve a clickar: */
  console.log(selectedCharacter);
  const indexCharacter = listCharacterFavourites.findIndex((item) =>item.id === id);
  if(indexCharacter === -1) {
    listCharacterFavourites.push(selectedCharacter);
  } else {
    listCharacterFavourites.splice(indexCharacter, 1);
  }

  renderFavouritesList();
  console.log(id);
}

function renderFavouritesList() {
  ulFavourites.innerHTML = '';
  for(const fav of listCharacterFavourites) {
    ulFavourites.innerHTML += renderCharacter(fav);
  }
}

