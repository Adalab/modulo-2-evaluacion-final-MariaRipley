'use strict';

const ulElement = document.querySelector('.js_character_list');
const ulFavourites = document.querySelector('.js_character_fav');

const url = 'https://api.disneyapi.dev/character?pageSize=50';

let listCharactersApi = [];
let listCharacterFavourites = [];



//Local Storage: traer elementos sin string
const favLS = JSON.parse(localStorage.getItem('favCharacters'));

//Al cargar la página ya tengo los datos en el LS
init();

function init() {
  //Si hay datos en favoritos, los pinta en la lista
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
    ulElement.appendChild (renderCharacter(character, isFavourite));
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
  /*Si entra a null que no se cargue. Condición: si entra a null que no se cargue porque da error*/
  if(character!==null) {
    let valueImg = character.imageUrl;
    const valueName = character.name;
    const valueId = character._id;
    const blankImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    //Si no tiene valor de imagen colocará una por defecto:
    if (!valueImg) {
      valueImg = blankImg;
    }

    //Crear elementos para Personajes

    const textCharacter = document.createElement('p');
    textCharacter.setAttribute('class', 'card__text');
    const textCharacterContent = document.createTextNode(`${valueName}`);
    textCharacter.appendChild(textCharacterContent);
    
    const imgCharacter = document.createElement('img');
    imgCharacter.src = `${valueImg}`;
    imgCharacter.alt = `Imagen de un personaje Disney`;
    imgCharacter.setAttribute('class', 'card__img');
    
    const contentCharacter = document.createElement('div');
    contentCharacter.setAttribute('class', 'cardDiv');
    contentCharacter.appendChild(imgCharacter);
    contentCharacter.appendChild(textCharacter);

    const liCharacterElement = document.createElement('li');
    liCharacterElement.id = `${valueId}`;
    liCharacterElement.setAttribute('class', 'card js_li_card');

    liCharacterElement.appendChild(contentCharacter);

    //Crear elementos para Favoritos

    const textFavourite = document.createElement('p');
    textFavourite.setAttribute('class', 'card__text');
    const textFavouriteContent = document.createTextNode(`${valueName}`);
    textFavourite.appendChild(textFavouriteContent);

    const xFav = document.createElement('a');
    xFav.id = `${valueId}`;
    xFav.setAttribute('class', 'deleteX');
    const xFavContent = document.createTextNode('X');
    xFav.appendChild(xFavContent);

    const imgFavourite = document.createElement('img');
    imgFavourite.src = `${valueImg}`;
    imgFavourite.alt = `Imagen de un personaje Disney`;
    imgFavourite.setAttribute('class', 'card__img');

    const contentFavourite = document.createElement('div');
    contentFavourite.setAttribute('class', 'cardDiv');
    contentFavourite.appendChild(xFav);
    contentFavourite.appendChild(imgFavourite);
    contentFavourite.appendChild(textFavourite);

    const liFavouriteElement = document.createElement('li');
    liFavouriteElement.setAttribute('class', 'card favourite');

    liFavouriteElement.appendChild(contentFavourite);

    //Lo que retornará según si entra como favorito o no

    if (isFavourite) {
      return liFavouriteElement;
    } else {
      return liCharacterElement;
    }
  }
}

//Función para seleccionar favoritos

function handleClick(event) {
  
  //Al dar click en cualquier parte de la tarjeta:
  const id = parseInt(event.currentTarget.id);
  const selectedCharacter = listCharactersApi.find((item) => item._id === id);
  /*Para que no añada varias veces el mismo personaje a favoritos y lo quite si ya está añadido cuando la usuaria lo vuelve a clickar: */
  const indexCharacter = listCharacterFavourites.findIndex((item) => item._id === id);
  if (indexCharacter === -1) {
    listCharacterFavourites.push(selectedCharacter);
  } else {
    listCharacterFavourites.splice(indexCharacter, 1);
  }
  //Guardar favoritos en el LS para que al recargar la pág sigan ahí
  localStorage.setItem('favCharacters', JSON.stringify(listCharacterFavourites));
  renderFavouritesList();
}


//Función para renderizar la lista de favoritos
function renderFavouritesList() {
  ulFavourites.innerHTML = '';
  const isFavourite = true;
  for (const characterFav of listCharacterFavourites) {
    ulFavourites.appendChild (renderCharacter(characterFav, isFavourite)) ;
  }
  addEventDelete();
  
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
//Uno a uno con la X

function addEventDelete() {
  const deleteXList = document.querySelectorAll('.deleteX');
  for (const deleteX of deleteXList) {
    deleteX.addEventListener('click', handleClick);
  }
}

//Todos con botón 'Eliminar todos'

const deleteButton = document.querySelector('.js_deleteAll');

function handleDeleteAll() {
  localStorage.clear();
  listCharacterFavourites = [];
  renderFavouritesList();
}

deleteButton.addEventListener('click', handleDeleteAll);