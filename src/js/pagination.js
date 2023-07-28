// <!--newsapi load more class-->
import NewsApiService from './REP-api-service';
import { appendArticlesMarkup, clearArticlesMarkup } from './REP-markup';
import LoadMoreBtn from './REP-loadBtn';


const list = document.querySelector('.js-list-rep');
const searchForm = document.querySelector('.js-form');
const searchBtn = document.querySelector('.search-btn');


const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn(
    {
        selector: '.js-load-more',
        hidden: true
    });



searchForm.addEventListener('submit', onSearch)
loadMoreBtn.btn.addEventListener('click', fetchArticles)


function onSearch(e) {
    e.preventDefault();

    searchBtn.disabled = true;

    newsApiService.query = e.currentTarget.elements.query.value;

    if (!newsApiService.query) {
        return alert('type something');
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    clearArticlesMarkup(list);
    fetchArticles();

    
}


function fetchArticles() {
    loadMoreBtn.enableSpinner();

    newsApiService.fetchArticles()
        .then(articles => {
            loadMoreBtn.disableSpinner();
            appendArticlesMarkup(articles, list);
            searchBtn.disabled = false;
        })
        .catch(err => console.log(err));
}



// pixabay Infinity scroll
// const BASE_URL = 'https://pixabay.com/api/';
// const END_POINT = 'character';
// const API_KEY = '38382383-be68f6f97c97ff697813dafa9';

// const list = document.querySelector('.js-list');
// const searchInput = document.querySelector('.js-form');
// const target = document.querySelector('.js-guard');

// let options = {
//     // root: document.querySelector("#scrollArea"),
//     root: null, // слідкуємо за всім
//     rootMargin: "300px",
//     threshold: 1.0,
// };

// let observer = new IntersectionObserver(onLoad, options);
// let page = 1;

// let per_page = 10;


// function onLoad(entries, observer) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             page += 1;


//             fetchImg(query,page, per_page)
//                 .then(data => {

//                 list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
//                 const allPages = Math.floor(data.totalHits / per_page);
                
//                 observer.observe(target);

//                 if (page === allPages) {
//                     observer.unobserve(target);
//                     console.log('noIntersecting');
//                 }
//             })
//             .catch(err => console.log(err));    
//             }
//     })
// }


// searchInput.addEventListener('submit', onSearch)

// function onSearch(e) {
//     list.innerHTML = '';

//     e.preventDefault();
//     query = e.currentTarget.elements.query.value;


//     fetchImg(query,page, per_page)
//         .then(data => {
            
//             list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
//             observer.observe(target);
//     })
//         .catch(err => console.log(err));    
// }

// function fetchImg(query, page, per_page) {
//     return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${per_page}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText);
//             }
//             return resp.json();
//         });
//     }


// function createMarkup(arr) {
//     return arr.map(({largeImageURL, tags}) =>
//     `
//         <li>
//             <img src="${largeImageURL}" alt="${tags}" >
//         </li>
//     `).join('')
// }



// const BASE_URL = 'https://the-one-api.dev/v2/';
// const END_POINT = 'character';
// const API_KEY = 'mFUka-Ja9PG3DOYzlmuz';

// getCharacter().then(data => console.log(data)).catch(err => console.log(err));


// function getCharacter() {
//     const params = new URLSearchParams({
//         limit: 20,
//         page: 1,
//     });

//     const options = {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${API_KEY}`
//         },
//     };

//     return fetch(`${BASE_URL}${END_POINT}?${params}`, options).then(resp => {
//         if(!resp.ok){
//             throw new Error(resp.statusText);
//         }

//         return resp.json();
//     })
// }

//  <!--Infinity scroll-->

// let counter = 0;
// document.addEventListener('scroll', onScroll);

// function onScroll() {
//     counter += 1;
//     console.log(counter);
// }

// const API_KEY = '2b1d5bddad210c0186837b235280482c';
// const BASE_URL = 'https://api.themoviedb.org/3/';
// const END_POINT = 'movie/upcoming';
// let currentPage = 1;

// const list = document.querySelector('.js-list');

// const target = document.querySelector('.js-guard');

// let options = {
//     // root: document.querySelector("#scrollArea"),
//     root: null, // слідкуємо за всім
//     rootMargin: "300px",
//     threshold: 1.0,
// };

// let observer = new IntersectionObserver(onLoad, options);


// function onLoad(entries, observer) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             console.log(entries);
//             currentPage += 1;

//             getTrendingMovies(currentPage)
//                 .then(data => {
//                     list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//                     if (data.page === data.total_pages) {
//                         observer.unobserve(target);
//                     }
//                 })
//             .catch(err => console.log(err));
//         }
//     })
// }
    

//     getTrendingMovies()
//         .then(data => {
//             list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//             observer.observe(target);
//     })
//     .catch(err => console.log(err));


// function getTrendingMovies(page=1) {
//     return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.status);
//             }

//             return resp.json();
//         })
// }


// function createMarkup(arr) {
//     return arr.map(({title, poster_path}) =>
//     `
//         <li>
//             <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="${title}">
//             <h2>${title}</h2>
//         </li>
//     `).join('')
// }





// <!--load more btn-->
// const API_KEY = '2b1d5bddad210c0186837b235280482c';
// const BASE_URL = 'https://api.themoviedb.org/3/';
// const END_POINT = 'movie/upcoming';

// const list = document.querySelector('.js-list');
// const loadMoreBtn = document.querySelector('.js-load-more');
// let currentPage = 1;

// loadMoreBtn.addEventListener('click', onLoad);

// getTrendingMovies()
//     .then(data => {
//         list.insertAdjacentHTML('beforeend', createMarkup(data.results));

//         if (data.page !== data.total_pages) {
//             loadMoreBtn.hidden = false;
//         }
//     })
//     .catch(err => console.log(err));



// function onLoad() {
//     currentPage += 1;

//     getTrendingMovies(currentPage)
//         .then(data => {
//             list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//             if (data.page === data.total_pages) {
//                 loadMoreBtn.hidden = true;
//             }
//     })
//     .catch(err => console.log(err));
// }


// function getTrendingMovies(page=1) {
//     return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.status);
//             }

//             return resp.json();
//         })
// }


// function createMarkup(arr) {
//     return arr.map(({title, poster_path}) =>
//     `
//         <li>
//             <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="${title}">
//             <h2>${title}</h2>
//         </li>
//     `).join('')
// }



