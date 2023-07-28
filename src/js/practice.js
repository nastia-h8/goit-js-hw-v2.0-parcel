// <!-- async, await -->
// FormData
const BASE_URL = 'https://restcountries.com/v3.1/name/';

const searchForm = document.querySelector('.js-search-country');
const addCountryBtn = document.querySelector('.js-add-country');
const countriesList = document.querySelector('.js-countries-list');
const formContainer = document.querySelector('.js-search-country-wrapper');

const markup = '<input type="text" name="country"/>'

addCountryBtn.addEventListener('click', handlerAddInput)
searchForm.addEventListener('submit', handlerForm)


function handlerAddInput() {
  formContainer.insertAdjacentHTML('beforeend', markup)
}


function handlerForm(e) {
  e.preventDefault();
  console.dir(e.currentTarget);

  const data = new FormData(e.currentTarget);
  const arr = data.getAll('country').filter(item => item).map(item=>item.trim())

  getCountries(arr)
    .then(async resp => {
      const capitals = resp.map(({ capital }) => capital[0]);
      const weatherService = await getWeather(capitals);
      console.log(weatherService);
      countriesList.innerHTML = createWeatherMarkup(weatherService);
    })
    .catch(err => console.log(err))
    .finally(() => {
      formContainer.innerHTML = markup;
      searchForm.reset()
    })
}

async function getCountries(arr) {
  const responses = arr.map(async item => {
    const resp = await fetch(`${BASE_URL}${item}`);

    if (!resp.ok) {
      throw new Error('smth wrong')
    }

    return resp.json();
  })

  const data = await Promise.allSettled(responses);
  const countryObj = data.filter(({ status }) => status === 'fulfilled').map(({ value }) => value[0]);
  return countryObj;
}



async function getWeather(arr) {
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = '48d371ffaffe42768b2122056231907';

  const resps = arr.map(async city => {
    const resp = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}}`);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  })
      const data = await Promise.allSettled(resps);
    const obj = data.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  console.log(obj);
  return obj;
}


function createWeatherMarkup(arr) {
  return arr.map(({ current:{temp_c, condition:{icon, text}}, location:{country, name}}) =>
    `
      <li>
        <div>
          <h3>${name}, ${country}</h3>
          <img src="${icon}" alt="${text}" />
          <p>${text}</p>
          <p>${temp_c}&#8451</p>
        </div>
      </li>
    `
  ).join('')
}

// async function getCapital() {
//   // in function
//   try {
//     const resp = await fetch(`${BASE_URL}Ukraine`);
//     if (!resp.ok) {
//       throw new Error(resp.statusText)
//     }
//     const data = await resp.json()
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// getCapital()

// async function getCapital() {
//   // outside function
//     const resp = await fetch(`${BASE_URL}Ukraine`);
//     if (!resp.ok) {
//       throw new Error(resp.statusText)
//     }
//     return resp.json()
// }

// getCapital().then(data=>console.log(data)).catch(err=>console.log(err))

// async function getCapital() {

//   // try {
//     const arr = ['Ukraine', 'qwe', 'Germany'];
//     const responses = arr.map(async country => {
//       const resp = await fetch(`${BASE_URL}${country}`);
//       // console.log(resp);
//       if (!resp.ok) {
//         throw new Error('Not found')
//         // Promise.reject('Not found')
//       } 
//       // не працює, викине у catch з try...catch, але не в catch з then...catch, тому не вик - ємо  try...catch
//       return resp.json()
//     })

//     // console.log(responses);

//     const proms = await Promise.allSettled(responses);
//     return proms;
// //  } catch (error) {
// //   console.log(error);
// //  }
// }

// getCapital()
//   .then(data => {
//     const res = data.filter(({ status }) => status === 'fulfilled').map(({value})=>value)
//     const rej = data.filter(({ status }) => status === 'rejected')
//     // console.log(res);  
//   })
//   .catch(err => console.log(err))

// async function foo(){
//   await Promise.reject("rejected")
//   return "ok"
// }

// foo().then(val=> console.log(val))
// function getFruits(name) {
//   const fruits = {
//     strawberry: "🍓",
//     kiwi: "🥝",
//     peach:"🍑"
//   }

//   // return Promise.resolve(fruits[name]);
//   return new Promise(resolve => setTimeout(() => resolve(fruits[name]), 500))
  
//   // return 5;
// }

// function makeSmoothie() {
//   getFruits("peach").then(fruit => {
//     console.log(fruit)
//     getFruits("kiwi").then(fruit=>console.log(fruit))
//   })
// }
// makeSmoothie()
  
// async function amakeSmoothie() {
// try {
//   console.time("stamp");
//   const peach =   getFruits("peach");
//   const kiwi =  getFruits("kiwi");
  
//   const fruits = await Promise.all([peach,kiwi])

//   console.log("fruits in async Promise.all", fruits);

//   console.timeEnd("stamp");
// } catch (error) {
//   console.log(error);
// }

  
// }

// amakeSmoothie()
// результат не вик-ся у зовн.коді
// const fetchUsers = async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchUsers();

// результат вик-ся у зовн.коді

// const fetchUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// };

// fetchUsers()
//   .then(users => console.log(users))
//   .catch(error => console.log(error));

// результат вик-ся в іншій асинхр ф-ії
// const fetchUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// };

// const doStuff = async () => {
//   try {
//     const users = await fetchUsers();
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// doStuff();
// послідовні запити
// const fetchUsers = async () => {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const firstResponse = await fetch(`${baseUrl}/users/1`);
//   const secondResponse = await fetch(`${baseUrl}/users/2`);
//   const thirdResponse = await fetch(`${baseUrl}/users/3`);

//   const firstUser = await firstResponse.json();
//   const secondUser = await secondResponse.json();
//   const thirdUser = await thirdResponse.json();

//   console.log(firstUser, secondUser, thirdUser);
// };

// fetchUsers();

// паралельні запити
// const fetchUsers = async () => {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const userIds = [1, 2, 3];

//   // 1. Створюємо масив промісів
//   const arrayOfPromises = userIds.map(async userId => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   // 2. Запускаємо усі проміси паралельно і чекаємо на їх завершення
//   const users = await Promise.all(arrayOfPromises);
//   console.log(users);
// };

// fetchUsers();

// const fetchUsersBtn = document.querySelector(".btn");
// const usersList = document.querySelector(".users-list");

// fetchUsersBtn.addEventListener("click", handlerFetchUsers);

// async function handlerFetchUsers() {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function fetchUsers() {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async (userId) => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       (user) => `<li class="item">
//         <p><b>Name</b>: ${user.name}</p>
//         <p><b>Email</b>: ${user.email}</p>
//         <p><b>Company</b>: ${user.company.name}</p>
//       </li>`
//     )
//     .join("");
//   usersList.innerHTML = markup;
// }

// <!-- CRUD -->
// на бекенді db.json

// GET
// const BASE_URL = 'http://localhost:4040/'

// function fetchCars() {
//   return fetch(`${BASE_URL}cars`).then(resp=>resp.json())
// }

// function fetchCarsById(bookId) {
//   return fetch(`${BASE_URL}cars/${bookId}`).then(resp=>resp.json())
// }


// // POST
// const newCar = {
//       "model": "my yellow VOLVO",
//       "type": "any",
//       "price": "norm",
//       "img": "https://archibalds.co.nz/wp-content/uploads/2021/08/volvo-xc90-1920x760-1.jpg"
// }

// function addCar(newCar) {
//   const options = {
//   method: "POST",
//   headers: {
//     "Content-Type":"application/json"
//   },
//   body: JSON.stringify(newCar)
// }

//     return fetch(`${BASE_URL}cars/`, options).then(resp=>resp.json())
// }

// // addCar(newCar).then(renderCar)

// function renderCar(car) {
//   console.log(car);
//   console.log('ok');
// }


// // PATCH

// const carToUpd = {
//       "model": "Sergio yellow VOLVO",
//       "price": "norm",
//       "img": "https://archibalds.co.nz/wp-content/uploads/2021/08/volvo-xc90-1920x760-1.jpg"
// }

// function updateCarById(carId, update) {
//   const options = {
//   method: "PATCH",
//   headers: {
//     "Content-Type":"application/json"
//   },
//   body: JSON.stringify(update)
// }

//     return fetch(`${BASE_URL}cars/${carId}`, options).then(resp=>resp.json())
// }

// // updateCarById(11, carToUpd).then(renderCar);
// // updateCarById(11, { price: 20000 }).then(renderCar);

// function renderCar(car) {
//   console.log(car);
//   console.log('ok');
// }

// // DELETE

// function delteCarById(carId) {
//   const options = {
//   method: "DELETE"
// }

//     return fetch(`${BASE_URL}cars/${carId}`, options).then(resp=>resp.json())
// }

// delteCarById(8)
// delteCarById(9)
// delteCarById(10)
// delteCarById(12)

// const postId = 1;

// fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//   .then(response => response.json())
//   .then(post => console.log(post))
//   .catch(error => console.log(error));

//   const postToAdd = {
//   author: "Mango",
//   body: "CRUD is awesome",
// };


// const options = {
//   method: "POST",
//   body: JSON.stringify(postToAdd),
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//   },
// };

// fetch("https://jsonplaceholder.typicode.com/posts", options)
// //   .then(response => response.json())
// //   .then(post => console.log(post))
// //   .catch(error => console.log(error));



//   const postToUpdate = {
//   id: 1,
//   body: "CRUD is really awesome",
// };

// const options = {
//   method: "PATCH",
//   body: JSON.stringify(postToUpdate),
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//   },
// };

// fetch(`https://jsonplaceholder.typicode.com/posts/${postToUpdate.id}`, options)
//   .then(response => response.json())
//   .then(post => console.log(post))
//   .catch(error => console.log("ERROR" + error));


//   const postIdToDelete = 1;

// fetch(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`, {
//   method: "DELETE",
// })
//   .then(() => console.log("Post deleted"))
//   .catch(error => console.log("Error:", error));



//  <!-- pagination -->
// const fetchPostsBtn = document.querySelector(".btn");
// const userList = document.querySelector(".posts");
// const alertPopup = document.querySelector(".alert");
// let isAlertVisible = false;

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 20;
// // In our case total number of pages is calculated on frontend
// const totalPages = 50 / limit;

// fetchPostsBtn.addEventListener("click", () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return toggleAlertPopup();
//   }

//   fetchPosts()
//     .then((posts) => {
//       renderPosts(posts);
//       // Increase the group number
//       page += 1;

//       // Replace button text after first request
//       if (page > 1) {
//         fetchPostsBtn.textContent = "Fetch more posts";
//       }
//     })
//     .catch((error) => console.log(error));
// });

// function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page
//   });

//   return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   userList.insertAdjacentHTML("beforeend", markup);
// }

// function toggleAlertPopup() {
//   if (isAlertVisible) {
//     return;
//   }
//   isAlertVisible = true;
//   alertPopup.classList.add("is-visible");
//   setTimeout(() => {
//     alertPopup.classList.remove("is-visible");
//     isAlertVisible = false;
//   }, 3000);
// }

// <!-- fetch -->
// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", () => {
//   fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
// });

// const searchParams = new URLSearchParams({
//   _limit: 5,
//   _sort: "name",
// });

// // console.log(searchParams.toString());
// const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;
// // console.log(url); // "https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name"

// // Параметри рядка запиту
// function fetchUsers() {
//   return fetch(
//     "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name"
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function fetchUsers() {
//   return fetch("https://jsonplaceholder.typicode.com/users").then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderUserList(users) {
//   const markup = users
//     .map((user) => {
//       return `<li>
//           <p><b>Name</b>: ${user.name}</p>
//           <p><b>Email</b>: ${user.email}</p>
//           <p><b>Company</b>: ${user.company.name}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }
// // <!-- ipodrom -->
// const horses = ['bisquit', 'milkshake', 'cappuchino', 'moti', 'macaroon'];

// const startBtnRace = document.querySelector('.js-race-btn');
// const winnerOutput = document.querySelector('.js-winner');
// const progressOutput = document.querySelector('.js-progress');
// const tableBody = document.querySelector('.js-results-table');

// let raceCounter = 0;

// // startBtnRace.addEventListener('click', onStartRaceClick)


// function onStartRaceClick() {
//     raceCounter += 1;
//     const promises = horses.map(run);

//     updateWinnerOutput("");
//     updateProgressOutput('🚀 Початок заїзду, ставки не приймаються');
//     determineWinner(promises);
//     waitForAll(promises);
// }


// function determineWinner(horsesP) {
//     Promise.race(horsesP).then(({ horse, time }) => {
//         updateWinnerOutput(`🥇 Переміг ${horse}, фінішувавши за ${time}`);
//         updateResultsTable({ horse, time, raceCounter });
//     });
// }

// function waitForAll(horsesP) {
//         Promise.all(horsesP).then(() => updateProgressOutput('💰 Кінець заїзду, ставки приймаються'));
//     }

// function updateProgressOutput(message) {
//     progressOutput.textContent = message;
// }

// function updateWinnerOutput(message) {
//     winnerOutput.textContent = message;
// }

// function updateResultsTable({ horse, time, raceCounter }) {
//     const tr =
//         `<tr>
//             <td>${raceCounter}</td>
//             <td>${horse}</td>
//             <td>${time}</td>
//         </tr>
//         `;
    
//     tableBody.insertAdjacentHTML('beforeend', tr)
// }

// function run(horse) {
//     return new Promise((res) => {
//         const time = getRandomTime(2000, 3500);

//         setTimeout(() => {
//             res({horse, time})
//         }, time)
//     })
// }

// function getRandomTime(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


// без таблиці
// console.log(
//     '%c 🚀 Початок заїзду, ставки не приймаються',
//     'color:red;'
// );

// run('bisquit').then(x => console.log(x)).catch(e => console.log(e));

// const promises = horses.map(horse => run(horse).then(x => console.log(x)).catch(e => console.log(e)));
// const promises = horses.map(run);

// Promise.race(promises).then(({horse, time}) => console.log(
//     `%c 🥇 Переміг ${horse}, фінішувавши за ${time}`,
//     'color:green;'
// ));

// Promise.all(promises).then(()=> console.log(
//     '%c 💰 Кінець заїзду, ставки приймаються',
//     'color:blue;'))
// без таблиці

// function run(horse) {
//     return new Promise((res) => {
//         const time = getRandomTime(2000, 3500);

//         setTimeout(() => {
//             res({horse, time})
//         }, time)
//     })
// }

// function getRandomTime(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }





// <!-- promise -->
// const start = document.querySelector(".js-game-start");
// const container = document.querySelector(".js-game-container"); 

// start.addEventListener('click', onStart)

// // allSettled

// function onStart() {
//     let counter = 0;

//     [...container.children].forEach((item) => {
//         item.textContent = ""
//     });

//     const promises = [...container.children].map(() => createPromise());
//     Promise.allSettled(promises)
//         .then(items => {
//             console.log(items);
//             items.forEach((item, i) => {

//                 setTimeout(() => {
//                     if (item.status === 'fulfilled') {
//                         counter += 1;
//                     }
//                     container.children[i].textContent = item.value || item.reason;

//                     if (i === container.children.length - 1) {
//                         setTimeout(() => {
//                             if (counter === container.children.length) {
//                                 alert('100$ today - yes');
//                             } else {
//                                 alert('100$ today - no');
//                             }
//                         }, 500)
//                     }
//                 }, i * 1000)
                
//             })
//         })
    

// }

// function createPromise() {
//     return new Promise((res, rej) => {
//             const random = Math.random();

//             if (random > 0.5) {
//                 res('💰');
//             } else {
//                 rej('💩')
//             }

//     })
// }

// function onStart() {
//     const result = [];

//     [...container.children].forEach((item) => {
//         item.textContent = ""
//     });

//     [...container.children].forEach((item, i) => {
//         createPromise(i)
//             .then((smile) => {
//                 item.textContent = smile;
//                 result.push('1')
//             })
//             .catch((smile) => {
//                 item.textContent = smile;
//             })
//             .finally(() => {
//                 setTimeout(() => {
//                     if (i === container.children.length - 1) {
//                         if (result.length === 3) {
//                             alert('100$ today - yes');
//                         } else {
//                             alert('100$ today - no');
//                         }                   
//                     }
//                 }, 1000)
//             })
//     })
// }

// function createPromise(delay) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             const random = Math.random();

//             if (random > 0.5) {
//                 res('💰');
//             } else {
//                 rej('💩')
//             }
//         }, 500 * delay)
//     })
// }

// const pr = new Promise((resolve) => {
//     resolve(5)
// })

// pr.then(value => {
//     return new Promise(resolve => {
//         resolve(value * 2);
//     })
// }).then(value=>console.log(value))
// 

// const makePromise = (text, delay) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(text), delay);
//   });
// };

// const promiseA = makePromise("promiseA value", 1000);
// const promiseB = makePromise("promiseB value", 3000);

// Promise.race([promiseA, promiseB])
//   .then(value => console.log(value)) // "promiseA value"
//     .catch(error => console.log(error));
  
// 

// const makePromise = (text, delay) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(text), delay);
//   });
// };

// const promiseA = makePromise("promiseA value", 1000);
// const promiseB = makePromise("promiseB value", 3000);

// Promise.all([promiseA, promiseB])
//   .then(value => console.log(value)) //["promiseA value", "promiseB value"]
//     .catch(error => console.log(error));
  
// 

// const fetchUserFromServer = username => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching data for ${username}`);

//     setTimeout(() => {

//       const isSuccess = true;

//       if (isSuccess) {
//         resolve("success value");
//       } else {
//         reject("error");
//       }
//     }, 2000);
//   });
// };

// fetchUserFromServer("Mango")
//     .then(user => console.log(user))
//     .catch(error => console.error(error));
  

// 

// const fetchUserFromServer = (username, onSuccess, onError) => {
//   console.log(`Fetching data for ${username}`);

//   setTimeout(() => {
//     const isSuccess = true;

//     if (isSuccess) {
//       onSuccess("success value");
//     } else {
//       onError("error");
//     }
//   }, 5000);
// };

// const onFetchSuccess = user => {
//   console.log(user);
// };

// const onFetchError = error => {
//   console.error(error);
// };

// fetchUserFromServer("Mango", onFetchSuccess, onFetchError);

// 
// const isSuccess = true;

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//         resolve("Success! Value passed to resolve function");

//     } else {
//         reject("Error! Error passed to reject function");

//     }
//   }, 2000);
// });

// console.log("Before promise.then()");

// promise.then(onResolve).catch(onReject).finally(onSettled);

// function onResolve(value) {
//     console.log("onResolve call inside promise.then()");
//     console.log(value);
// }

// function onReject(error) {
//     console.log("onReject call inside promise.then()");
//     console.log(error);
// }

// function onSettled() {
//     console.log('promise settled - fulfilled or rejected');
// }

// console.log("After promise.then()");

// <!-- calendar -->
const day = document.querySelector(".date-day");
const date = document.querySelector(".date");
const month = document.querySelector(".date-month");
const year = document.querySelector(".date-year");
const digitalClock = document.querySelector(".digital-clock");
const arrowSecond = document.querySelector(".clock-seconds__arrow");
const arrowMinutes = document.querySelector(".clock-minutes__arrow");
const arrowHours = document.querySelector(".clock-hours__arrow");

const namesOfMonth = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень",
    "Жовтень",  "Листопад", "Грудень",];

const arrDay = ["Неділя",  "Понеділок",  "Вівторок",  "Середа",  "Четвер",  "П`ятниця",  "Субота",];

// setInterval(() => {
//     const currentTime = new Date();
//     const currentDay = arrDay[currentTime.getDay()];
//     const currentDate = currentTime.getDate();
//     const currentMonth = namesOfMonth[currentTime.getMonth()];
//     const currentYear = currentTime.getFullYear();
//     const currentHour = currentTime.getHours();
//     const currentMins = currentTime.getMinutes();
//     const currentSecs = currentTime.getSeconds();

//     const changeSeconds = (360 / 60) * currentSecs;
//     const changeMinutes = (360 / 60) * currentMins;
//     const changeHours = (360 / 12) * currentHour + (360 / 12 / 60) * currentMins;

//     const formatTime = `${currentHour.toString().padStart(2, '0')}:${currentMins.toString().padStart(2, '0')}:${currentSecs.toString().padStart(2, '0')}`
//     digitalClock.textContent = formatTime;

//     day.textContent = currentDay;
//     date.textContent = currentDate;
//     month.textContent = currentMonth;
//     year.textContent = currentYear;

//     arrowSecond.style.transform = `rotate(${changeSeconds}deg)`;
//     arrowMinutes.style.transform = `rotate(${changeMinutes}deg)`;
//     arrowHours.style.transform = `rotate(${changeHours}deg)`;

// }, 1000)







// <!-- notification -->
const POPUP_DELAY = 3000;
let timeOutId = null;
const popUp = document.querySelector('.js-alert');
popUp.addEventListener('click', onPopUpClick);

// showPopUp()

function onPopUpClick() {
    console.log('click');
    hidePopUp();
    clearTimeout(timeOutId);
}



function showPopUp() {
    popUp.classList.add('is-visible');

    timeOutId = setTimeout(() => {
        hidePopUp();
        console.log('close');
    }, POPUP_DELAY)
}


function hidePopUp() {
    popUp.classList.remove('is-visible');
}

// <!-- дата -->
// const date = new Date();

// console.log('date:', date);
// console.log('date.getTime:', date.getTime());
// console.log("getDate(): ", date.getDate());
// console.log("getUTCDate(): ", date.getUTCDate());

// console.log(date.getMonth());
// const months = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'];

// console.log(months[date.getMonth()]);

// console.log(date.getDay());
// const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'];
// console.log(days);
// console.log(days[date.getDay()]);

// <!-- інтервали -->
const startBtn = document.querySelector(".js-start");
const stopBtn = document.querySelector(".js-stop");
let timerId = null;

startBtn.addEventListener("click", () => {
    console.log(`Interval with id ${timerId} has started!`);
    timerId = setInterval(() => {
    console.log(`I love async JS!  ${Math.random()}`);
  }, 1000);
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});

//  <!-- таймери -->

const box = document.querySelector('.js-box');
const timerOutput = document.querySelector('.js-timer');
let counter = 6;
let intervalId = null;

// setTimeout(() => {
//     box.style.display = 'block';

//     intervalId = setInterval(() => {
//         counter -= 1;
//         timerOutput.textContent = `Реклама зникне через: ${counter}`;
        

//         if (!counter) {
//             console.log('close');
//             clearInterval(intervalId);
//             timerOutput.addEventListener('click', ()=>{box.style.display = 'none'})
//             timerOutput.textContent = 'X'
//             // box.style.display = 'none';
//         }
//     }, 1000)

// }, 3000)

const button = document.querySelector("button");

const onClick = () => {
    setTimeout(() => alert('Async Hello'), 2000)
}

// button.addEventListener("click", onClick);


const greet = () => {
  console.log("Hello!");
};

// const timerId = setTimeout(greet, 2000);
// clearTimeout(timerId)


// <!-- message in localStorage -->
import { save, load, remove } from "./storage"

const form = document.querySelector("#message-form");
const output = document.querySelector("#output");
const LOCALSTORAGE_KEY = "user-message";
const clearBtn = document.querySelector("#clearBtn");


updOutputfromLocalStorage();
form.addEventListener("submit", saveMessage);
clearBtn.addEventListener('click', clearLocalStorage)


function saveMessage(e) {
    e.preventDefault();

    const message = form.elements.message.value;

    // localStorage.setItem(LOCALSTORAGE_KEY, message);
    save(LOCALSTORAGE_KEY, message)
    updOutputfromLocalStorage();
    form.reset();
}

function updOutputfromLocalStorage() {
    // output.textContent = localStorage.getItem(LOCALSTORAGE_KEY) || "";
    output.textContent = load(LOCALSTORAGE_KEY);
}

function clearLocalStorage() {
    remove(LOCALSTORAGE_KEY);
}


// <!--------------------------------------------------------------------->

// const data = JSON.parse("Well, this is awkward");
// console.log("❌ You won't see this log");

// try {
//     const data = JSON.parse("Well, this is awkward");
//     console.log("❌ You won't see this log");
// } catch (error) {
//     console.log("✔ You see this log");
//     console.log(error.name);
//     console.log(error.message);
//     console.log(error.stack);
// }

// console.log('This message will not appear in the console');

// cos value = 5;

// const settings = {
//   theme: "dark",
//   isAuthenticated: true,
//   options: [1, 2, 3],
// };

// localStorage.setItem("settings", JSON.stringify(settings));

// const savedSettings = localStorage.getItem("settings");
// console.log(typeof savedSettings);

// const parsedSettings = JSON.parse(savedSettings)
// console.log(typeof parsedSettings);

// localStorage.removeItem("settings");
// localStorage.removeItem('theme')