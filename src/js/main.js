'use strict';

const ulElement = document.querySelector('.js_character_list');

const url = 'https://api.disneyapi.dev/character?pageSize=50';

let listCharactersApi = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCharactersApi = data.data;
    renderCharacterList(listCharactersApi);
  });

//Función para generar listado de tarjetas

function renderCharacterList(listData) {
  for(const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
}

//Función para generar una tarjeta

function renderCharacter(character){
  let html = `<li class="card"><div class="">
                    <img src="${character.imageUrl}" alt="" class="card__img" />
                    <p class="card__text">${character.name}</p>
              </div></li>`;
  const valueImg = character.imageUrl;
  const blankImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
  if(valueImg === '') {
    html = `<li class="card"><div class="">
                    <img src="${blankImg}" alt="" class="card__img" />
                    <p class="card__text">${character.name}</p>
              </div></li>`;
  }
  return html;
}


