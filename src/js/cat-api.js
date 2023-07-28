import axios from "axios";
export { fetchBreeds, fetchCatByBreed }


const API_KEY = 'live_n7HYTsLncLNdYkcXqwqTirjwu6yECdhh7qyRIGsvhVIOBvKwE2XssazEPYPGaJDx';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_ENDPOINT = 'breeds';
const IMG_BREEDS_ENDPOINT = 'images/search';

axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = BASE_URL;

     
function fetchBreeds() {
    return axios.get(`${BREEDS_ENDPOINT}`)
  .then(function (response) {
    return response.data;
  });
}

function fetchCatByBreed(breedId='abys') {
    return axios.get(`${IMG_BREEDS_ENDPOINT}?breed_ids=${breedId}`)
  .then(function (response) {
    return response.data;
  });
}



//   NATIVE
// const API_KEY = 'live_n7HYTsLncLNdYkcXqwqTirjwu6yECdhh7qyRIGsvhVIOBvKwE2XssazEPYPGaJDx';
// const BASE_URL = 'https://api.thecatapi.com/v1/';
// const BREEDS_ENDPOINT = 'breeds';
// const IMG_BREEDS_ENDPOINT = 'images/search';

// const options = {
//     method: 'GET',
//     headers: {
//         "x-api-key": API_KEY,
//     }
// }

    
// function fetchBreeds() {
//     return fetch(`${BASE_URL}${BREEDS_ENDPOINT}`, options)
//     .then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText)
//         }
//         return resp.json()
//         })
// }

// function fetchCatByBreed(breedId='abys') {
//         return fetch(`${BASE_URL}${IMG_BREEDS_ENDPOINT}?breed_ids=${breedId}`, options)
//     .then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText)
//         }
//         return resp.json()
//         })
// }