let characters = [];
let info = [];
let basicURL = "https://rickandmortyapi.com/api/character/?page=1";

const charactersWrapper = document.querySelector(".characters-wrapper");

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

const createCards = (data) => {
  if (!data.length) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    let cardWrapper = document.createElement("div");
    let cardContent = document.createElement("div");
    let cardImg = document.createElement("img");
    let characterName = document.createElement("div");

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
  preloader.classList.remove("remove-preloader");
  preloader.classList.add("hide-preloader");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        preloader.classList.add("remove-preloader");
      }, 950);
      characters = characters.concat(data.results);
      info = data.info;
      console.log(characters);
      console.log(info);
      createCards(data.results);
    });
};

getCharacters(basicURL);

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    getCharacters(info.next);
  }
}

function throttle(callee, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

(() => {
  window.addEventListener("scroll", throttle(checkPosition, 1500));
  window.addEventListener("resize", throttle(checkPosition, 1500));
})();

scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    scrollBtn.classList.remove("isHideBtn");
    scrollBtn.classList.add("isShowBtn");
  } else if (window.scrollY < 700) {
    scrollBtn.classList.add("isHideBtn");
    scrollBtn.classList.remove("isShowBtn");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.onload = () => {
  preloader.classList.add("hide-preloader");
  setTimeout(() => {
    preloader.classList.add("remove-preloader");
  }, 950);
};

