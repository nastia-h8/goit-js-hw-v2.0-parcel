import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api'

const breedSelect = new SlimSelect({
    select: document.querySelector('.breed-select'),

    settings: {
    placeholderText: 'Choose cat breed...',
    },

    events: {
        beforeChange: onSelect,
  }
})

Notiflix.Notify.init({
    position: 'center-top',
    clickToClose: true,
    width: '260px'
})



const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

hideSelect();
showLoader();


fetchBreeds()
    .then(data => {
        breedSelect.setData(createBreedOptions(data))
        hideLoader();
        showSelect();
    })
    .catch((_) => {
        showError()
        hideLoader()
    })



function onSelect(option) {
    const [{ value:catBreed }] = option;
    
    showLoader();
    removeCatInfoMarkup();

    fetchCatByBreed(catBreed)
        .then(data => {
            const [{url, breeds:[{description, temperament, name}]}] = data;
            createCatInfoMarkup(url, description, temperament, name);
            hideLoader();
        })
        .catch((_) => {
        showError()
        hideLoader()
    })
}


function createBreedOptions(arr) {
    return arr.map(({ id, name }) => ({"text": `${name}`, "value": `${id}`}))
}


function createCatInfoMarkup(url, description, temperament, name) {
    catInfoContainer.innerHTML =
        `<img src="${url}" alt="${name}" width="400" class="cat-img">
        <div class="info-thumb">
            <h2 class="cat-temp">${temperament}</h2>
            <p  class="cat-descr">${description}</p>
        </div>`
}

function removeCatInfoMarkup() {
    catInfoContainer.innerHTML = ''
}

function hideLoader() {
    loader.classList.add('is-hidden');
}

function showLoader() {
    loader.classList.remove('is-hidden');
}

function showError() { 
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}


function showSelect(){
breedSelect.selectEl.classList.remove('is-hidden');
}

function hideSelect(){
breedSelect.selectEl.classList.add('is-hidden');
}



// NATIVE

// import { fetchBreeds, fetchCatByBreed } from './cat-api'

// const breedSelect = document.querySelector('.breed-select');
// const catInfoContainer = document.querySelector('.cat-info');
// const errorText = document.querySelector('.error');
// const loaderText = document.querySelector('.loader');

// breedSelect.addEventListener('change', onSelect);
// hideSelect();
// hideError();


// fetchBreeds()
//     .then(data => {
//         createSelectOptions(data, breedSelect);
//         hideLoader();
//         showSelect();
//     })
//     .catch(showError)



// function onSelect(e) {
//     showLoader();
//     removeCatInfoMarkup();

//     fetchCatByBreed(e.currentTarget.value)
//         .then(data => {
//             const [{url, breeds:[{description, temperament, name}]}] = data;
//             createCatInfoMarkup(url, description, temperament, name);
//             hideLoader();
//         })
//         .catch(showError)
// }


// function createSelectOptions(arr, selectEl) {
//     selectEl.innerHTML = arr.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
// }

// function createCatInfoMarkup(url, description, temperament, name) {
//     catInfoContainer.innerHTML =
//         `<img src="${url}" alt="${name}" width=250>
//         <h2>${temperament}</h2>
//         <p>${description}</p>`
// }

// function removeCatInfoMarkup() {
//     catInfoContainer.innerHTML = ''
// }

// function hideLoader() {
//     loaderText.classList.add('is-hidden');
// }

// function showLoader() {
//     loaderText.classList.remove('is-hidden');
// }

// function showError() {
//     errorText.classList.remove('is-hidden')
// }

// function hideError() {
//     errorText.classList.add('is-hidden')
// }

// function showSelect(){
// breedSelect.classList.remove('is-hidden');
// }

// function hideSelect(){
// breedSelect.classList.add('is-hidden');
// }