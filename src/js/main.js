'use strict';

const ulElement = document.querySelector('.js_character_list');
const ulFavourites = document.querySelector('.js_character_fav');

const url = 'https://dev.adalab.es/api/disney?pageSize=15';

let listCharactersApi = [];
let listCharacterFavourites = [];



//Local Storage: traer elementos sin string
const favLS = JSON.parse(localStorage.getItem('favCharacters'));

//Al cargar la página ya tengo los datos en el LS
init();

function init() {
  if(favLS) {
    listCharacterFavourites = favLS;
    renderFavouritesList(listCharacterFavourites);
  }
}

//Petición al servidor para recibir las tarjetas que me de la API

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCharactersApi = data.data;
    renderCharacterList(listCharactersApi);
  });

//Función para generar listado de tarjetas

function renderCharacterList(listData) {
  ulElement.innerHTML = '';
  const isFavourite = false;
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character, isFavourite);
  }
  addEventCharacter();
}

//Función para evento click sobre la tarjeta

function addEventCharacter() {
  const liElementList = document.querySelectorAll('.js_li_card');
  for (const li of liElementList) {
    li.addEventListener('click', handleClick);
  }
}

//Función para generar una tarjeta

function renderCharacter(character, isFavourite) {
  let valueImg = character.imageUrl;
  const valueName = character.name;
  const valueId = character._id;
  const blankImg =
    'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';

  //Si no tiene valor de imagen colocará una por defecto:
  if (!valueImg) {
    valueImg = blankImg;
  }

  let html = '';
  let content = `<div class="cardDiv">
         <img src="${valueImg}" alt="" class="card__img" />
         <p class="card__text">${valueName}</p>
         </div>`;
  
  let li = `<li id="${valueId}" class="card js_li_card">${content}</li>`;
  let liFav = `<li id="${valueId}" class="card js_li_card favourite">${content}</li>`;

  //Si entra como favorito, pintará un contenido con clase favourite en el li
  if (isFavourite) {
    html +=  liFav;
  } else {
    html = li;
  }
  return html;
}

//Función para seleccionar favoritos

function handleClick(event) {
  //Al dar click en cualquier parte de la tarjeta:
  const id = parseInt(event.currentTarget.id);
  const selectedCharacter = listCharactersApi.find((item) => item._id === id);
  /*Para que no añada varias veces el mismo personaje a favoritos y lo quite si ya está añadido cuando la usuaria lo vuelve a clickar: */
  const indexCharacter = listCharacterFavourites.findIndex(
    (item) => item._id === id
  );
  if (indexCharacter === -1) {
    listCharacterFavourites.push(selectedCharacter);
  } else {
    listCharacterFavourites.splice(indexCharacter, 1);
  }
  //Guardar favoritos en el LS para que al cargar la pág sigan ahí
  localStorage.setItem('favCharacters', JSON.stringify(listCharacterFavourites));
  renderFavouritesList();
}


//Función para renderizar la lista de favoritos
function renderFavouritesList() {
  ulFavourites.innerHTML = '';
  const isFavourite = true;
  for (const characterFav of listCharacterFavourites) {
    ulFavourites.innerHTML += renderCharacter(characterFav, isFavourite);
  }
}


//BONUS: Búsqueda

const searchInput = document.querySelector('.js_search_input');
const searchBtn = document.querySelector('.js_search_btn');

function handleClickSearch (event) {
  event.preventDefault();
  const searchInputValue = searchInput.value;
  const filterList = listCharactersApi.filter((item) => 
    item.name.toLowerCase().includes(searchInputValue.toLowerCase()));
  renderCharacterList(filterList);
}

searchBtn.addEventListener('click', handleClickSearch);

//BONUS: Borrar favoritos



