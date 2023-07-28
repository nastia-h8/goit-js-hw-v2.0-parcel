import Notiflix from 'notiflix';

const searchForm = document.querySelector('.js-search');
const list = document.querySelector('.js-list');

searchForm.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault();

    const { query, days } = e.currentTarget.elements;

    getWeather(query.value, days.value)
        .then(data => {
            list.innerHTML = createMarkup(data.forecast.forecastday);
        })
        .catch((error)=> onFetchError(error))
        .finally(() => {
            searchForm.reset();
        });

}

function getWeather(city, days) {
    // http://api.weatherapi.com/v1/forecast.json?key=48d371ffaffe42768b2122056231907&q=Kiev&days=5

    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = '48d371ffaffe42768b2122056231907';

    return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`)
        // &lang=uk
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }

            return resp.json();
        })
}

function onFetchError(error) {
    Notiflix.Notify.failure('Please, try again');
    list.innerHTML = '';
}

function createMarkup(arr) {
    return arr.map(({ date, day: { maxtemp_c, mintemp_c, maxwind_kph, condition:{text, icon}} }) => 
        `<li>
            <img src="${icon}" alt="${text}" />
            <h2>${date}</h2>
            <h3>${text}</h3>
            <p>Min temp,&#8451: ${mintemp_c}</p>
            <p>Max temp,&#8451: ${maxtemp_c}</p>
            <p>Wind, km/h: ${maxwind_kph}</p>
        </li>`
        ).join('');
}

