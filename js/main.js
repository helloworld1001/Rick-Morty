let characters = [];
let info = [];
let basicURL = "https://rickandmortyapi.com/api/character/?page=1";

const charactersWrapper = document.querySelector(".characters-wrapper");
const btnNext = document.querySelector(".next-btn");

// добавляет html модального окна на страницу
// можно добавлять сразу кусками html, а не создавать элементы как делали в функции createCards
const addModal = (image, name, status, species, origin, location, gender) => {
  const fragment = `<div class="modal">
  <div class="modal-content">
    <span class="modal-close"><img src="./img/close.png" alt="close-img"/></span>
    <div class="modal-info">
        <div class="modal-img-wrapper"><img src=${image} alt="char-image" /></div>
        <div class="modal-text-wrapper">
            <div class="modal-text-left" >
                <div class="text-title" >Name:</div>
                <div>${name}</div>
                <div class="text-title" >Status:</div>
                <div>${status}</div>
                <div class="text-title" >Species:</div>
                <div>${species}</div>
            </div>
            <div class="modal-text-right" >
            <div class="text-title" >Origin:</div>
            <div>${origin}</div>
            <div class="text-title" >Location:</div>
            <div>${location}</div>
            <div class="text-title" >Gender:</div>
            <div>${gender}</div></div>
        </div>
    </div>
  </div>
</div>
    `;
  document
    .querySelector(".container")
    .insertAdjacentHTML("afterbegin", fragment);
};

const showModal = () => {
  document.querySelector(".modal").classList.remove("hide");
  document.querySelector(".modal").classList.add("show");
};

const closeModal = () => {
  document.querySelector(".modal-close").addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("show");
    document.querySelector(".modal").classList.add("hide");
  });
};

// забирает id персонажа, ищет в массиве всех персонажей нужного, деструктуризацией достаем из найденного объекта нужные проперти и передаем их в модалку
// добавляем модалку на страницу, тут же ее открываем
// добавляем слушатель на закрытие(обязательно при модалке уже отрисованной, иначе крестика еще не существует)
const getId = (id) => {
  const finded = characters.find((item) => item.id === id);
  const {
    image,
    name,
    status,
    species,
    origin: { name: originName, url },
    location: { name: locationName },
    gender,
  } = finded;
  console.log(name, status, species, originName, locationName, gender);
  addModal(image, name, status, species, originName, locationName, gender);
  showModal();
  closeModal();
};

// пробегается по массиву с элементами (можешь посмотреть на него в консоли data.result) и для каждого создает карточку,
//карточки складывает в div charactersWrapper
// структура html должна получится как ниже в закоменнтированном коде
const createCards = (data) => {
  if (!data.length) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    let cardWrapper = document.createElement("div");
    let cardContent = document.createElement("div");
    let cardImg = document.createElement("img");
    let characterName = document.createElement("div");

    // забираем ИД юзера по клику на карточку
    cardContent.onclick = () => getId(data[i].id);

    cardWrapper.classList.add("card-wrapper");
    cardContent.classList.add("card-content");
    characterName.classList.add("character-name");

    cardImg.src = data[i].image;
    characterName.innerText = data[i].name;

    cardContent.appendChild(cardImg);
    cardContent.appendChild(characterName);
    cardWrapper.appendChild(cardContent);

    charactersWrapper.appendChild(cardWrapper);
  }
};

const getCharacters = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // персонажей будем все время добавлять в один объект, чтобы при поиске по ИД не обращаться снова к серверу
      characters = characters.concat(data.results);
      info = data.info;
      console.log(characters);
      console.log(info);
      createCards(data.results);
    });
};

getCharacters(basicURL);

btnNext.onclick = function () {
  // basicURL = info.next;
  // console.log(basicURL);
  getCharacters(info.next);
};

// структура карточки
{
  /* <div class="card-wrapper">
<div class="card-content" >
    <img src="./img/Rick.jpeg" alt="character-img" style="border-radius: 10px;" />
    <div class="character-name" >Rick</div>
</div>
</div> */
}
