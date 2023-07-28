import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import axios from "axios";

const searchForm = document.querySelector('#search-form');
const submitBtn = searchForm.querySelector('button');
const galleryList = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreTextOutput = document.querySelector('.js-load-more-wrapper');
const target = document.querySelector('.js-guard');
const btnToTop = document.querySelector('.js-button-up');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38382383-be68f6f97c97ff697813dafa9';


const observerOptions = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
}

const scrollObserverOptions = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
}

Notiflix.Notify.init({
    clickToClose: true,
    timeout: 2000,
})

let searchQuery = "";
let currentPage = 1;
let currentResults = 0;
hideLoader();

searchForm.addEventListener('submit', handlerSearchForm);
btnToTop.addEventListener('click', handlerReturnToTop)
const observer = new IntersectionObserver(observe, observerOptions);
const scrollObserver = new IntersectionObserver(scrollObserve, scrollObserverOptions);


function handlerSearchForm(e) {
    e.preventDefault();
    hideLoadMoreErrorText();
    showLoader();
    hideSubmitBtn();
    galleryList.innerHTML = "";

    currentPage = 1;
    searchQuery = searchForm.elements.searchQuery.value;

    fetchImg(searchQuery, currentPage)
        .then(({ total, hits, totalHits }) => {

            if (!total) {
                showErrorNotification('Sorry, there are no images matching your search query. Please try again.')
                return;
            } else {
                showSuccessNotification(`Hooray! We found ${totalHits} images.`)
            }

            currentResults = hits.length;
            if (currentResults === totalHits) {
                showLoadMoreErrorText();
                } 
                
            currentPage += 1;
            galleryList.innerHTML = createGalleryMarkup(hits);
            imgModalInit();
            
            const scrollTarget = document.querySelector('.js-scroll-guard');
            observer.observe(target);
            scrollObserver.observe(scrollTarget);
        })
        .catch(error => showErrorNotification(error))
        .finally(()=>{
            hideLoader();
            showSubmitBtn();
        })
}

function onLoadMore() {
    hideLoadMoreErrorText();
    showLoader();

    fetchImg(searchQuery, currentPage)
        .then(({ hits, totalHits }) => {
            
            currentPage += 1;
            currentResults += hits.length;

            if (currentResults === totalHits) {
                observer.unobserve(target);
                showLoadMoreErrorText();
            }
            
            galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
            imgModalInit();
            
        })
        .catch(error => showErrorNotification(error))
        .finally(hideLoader)
}


async function fetchImg(searchQuery, page) {
    const params = new URLSearchParams({
        key:API_KEY,
        q: searchQuery,
        per_page: 40,
        page,
        image_type:'photo',
        orientation:'horizontal',
        safesearch: true,
    })

    try {
        const response = await axios.get(`${BASE_URL}/?${params}`);
        return response.data;
    } catch (error) {
        error => showErrorNotification(error.message);
    }
}

function createGalleryMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `
    <a href="${largeImageURL}" class="photo-link js-scroll-guard" >
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350" height="225"/>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
            </p>
            <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
            </p>
            <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
            </p>
        
    </div>
    </a>

    `).join('')
}

function imgModalInit() {
    const lightboxGallery = new SimpleLightbox('.gallery a').refresh();
}

function showLoadMoreErrorText() {
    loadMoreTextOutput.classList.remove('is-hidden');
}

function hideLoadMoreErrorText() {
    loadMoreTextOutput.classList.add('is-hidden');
}

function hideLoader() {
    loader.classList.add('is-hidden');
}

function showLoader() {
    loader.classList.remove('is-hidden');
}

function showErrorNotification(message) {
    Notiflix.Notify.failure(message)
}

function showSuccessNotification(message) {
    Notiflix.Notify.success(message);
}

function observe (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            onLoadMore()
        }
     })
};

function showSubmitBtn() {
    submitBtn.disabled = false;
}

function hideSubmitBtn() {
    submitBtn.disabled = true;
}

function handlerReturnToTop() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
    
    hideScrollToTopBtn()
}

function showScrollToTopBtn() {
    btnToTop.classList.remove('is-hidden');
}

function hideScrollToTopBtn() {
    btnToTop.classList.add('is-hidden')
}

function scrollObserve(entries) {
    if (!entries[0].isIntersecting) {
        showScrollToTopBtn()
    } else {
        hideScrollToTopBtn()
    }
};

// LOAD MORE BTN ------------------------------------------------------------------------------------------------

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import Notiflix from 'notiflix';
// import axios from "axios";

// Notiflix.Notify.init({
//     clickToClose: true,
//     timeout: 2000,
// })


// const searchForm = document.querySelector('#search-form');
// const galleryList = document.querySelector('.js-gallery');
// const loader = document.querySelector('.loader');
// const loadMoreBtn = document.querySelector('.js-load-more');
// const loadMoreTextOutput = document.querySelector('.js-load-more-text');

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '38382383-be68f6f97c97ff697813dafa9';


// let searchQuery = "";
// let currentPage = 1;
// let allHits = 0;
// hideLoader();

// searchForm.addEventListener('submit', handlerSearchForm);
// loadMoreBtn.addEventListener('click', handlerLoadMore);


// function handlerSearchForm(e) {
//     e.preventDefault();
//     hideLoadMoreErrorText();
//     showLoader();
//     galleryList.innerHTML = "";

//     currentPage = 1;
//     searchQuery = searchForm.elements.searchQuery.value;

//     fetchImg(searchQuery, currentPage)
//         .then(({ total, hits, totalHits }) => {

//             if (!total) {
//                 hideLoadMoreBtn();
//                 showErrorNotification('Sorry, there are no images matching your search query. Please try again.')
//                 return;
//             } else {
//                 showSuccessNotification(`Hooray! We found ${totalHits} images.`)

//             allHits = hits.length;
//             if (allHits === totalHits) {
//                 hideLoadMoreBtn()
//                 showLoadMoreErrorText();
//             } else {
//                 showLoadMoreBtn()
//             }
//         }
            
//             currentPage += 1;

//             galleryList.innerHTML = createGalleryMarkup(hits);
//             imgModalInit()

//         })
//         .catch(error => showErrorNotification(error))
//         .finally(hideLoader)
// }

// function handlerLoadMore() {
//     hideLoadMoreErrorText();
//     showLoader();

//     fetchImg(searchQuery, currentPage)
//         .then(({ hits, totalHits }) => {
            
//             currentPage += 1;
//             allHits += hits.length;

//             if (allHits === totalHits ) {
//                 hideLoadMoreBtn()
//                 showLoadMoreErrorText();
//             }
            

//             galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
//             smoothScroll()
//             imgModalInit()
            
//         })
//         .catch(error => showErrorNotification(error))
//         .finally(hideLoader)
// }


// async function fetchImg(searchQuery, page) {
//     const params = new URLSearchParams({
//         key:API_KEY,
//         q: searchQuery,
//         per_page: 40,
//         page,
//         image_type:'photo',
//         orientation:'horizontal',
//         safesearch: true,
//     })

//     try {
//         const response = await axios.get(`${BASE_URL}/?${params}`);
//         return response.data;
//     } catch (error) {
//         error => showErrorNotification(error.message);
//     }
// }

// function createGalleryMarkup(arr) {
//     return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
//     `
//     <a href="${largeImageURL}" class="photo-link">
//         <div class="photo-card">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350" height="225"/>
//         </div>
//         <div class="info">
//             <p class="info-item">
//             <b>Likes</b>
//             <span>${likes}</span>
//             </p>
//             <p class="info-item">
//             <b>Views</b>
//             <span>${views}</span>
//             </p>
//             <p class="info-item">
//             <b>Comments</b>
//             <span>${comments}</span>
//             </p>
//             <p class="info-item">
//             <b>Downloads</b>
//             <span>${downloads}</span>
//             </p>
        
//     </div>
//     </a>

//     `).join('')
// }

// function smoothScroll() {
//     const { height: cardHeight } = galleryList.firstElementChild.getBoundingClientRect();
//     console.log(galleryList.firstElementChild.getBoundingClientRect());
    
//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//     });
// }

// function imgModalInit() {
//     const lightboxGallery = new SimpleLightbox('.gallery a');
//     lightboxGallery.refresh();
// }

// function showLoadMoreErrorText() {
//     loadMoreTextOutput.classList.remove('is-hidden');
// }

// function hideLoadMoreErrorText() {
//     loadMoreTextOutput.classList.add('is-hidden');
// }

// function showLoadMoreBtn() {
//     loadMoreBtn.classList.remove('is-hidden');
// }

// function hideLoadMoreBtn() {
//     loadMoreBtn.classList.add('is-hidden');
// }

// function hideLoader() {
//     loader.classList.add('is-hidden');
// }

// function showLoader() {
//     loader.classList.remove('is-hidden');
// }

// function showErrorNotification(message) {
//     Notiflix.Notify.failure(message)
// }

// function showSuccessNotification(message) {
//     Notiflix.Notify.success(message);
// }