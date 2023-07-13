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