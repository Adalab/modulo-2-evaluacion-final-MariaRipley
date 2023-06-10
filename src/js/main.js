'use strict';

const ulElement = document.querySelector('.js_character_list');

const url = 'https://api.disneyapi.dev/character';

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
    html = `<li id="${valueId}" class=""card js_li_card""><div class="">
            <img src="${blankImg}" alt="" class="card__img" />
            <p class="card__text">${valueName}</p>
            </div></li>`;
  }
  return html;
}

function handleClick(event) {
  const id = event.currentTarget.id;
  console.log(id);
}

