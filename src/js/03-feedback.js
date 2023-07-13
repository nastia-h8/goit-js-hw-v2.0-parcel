import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const DATA_STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', throttle(onFeedback, 500));
form.addEventListener('submit', onSubmit);


const userData = JSON.parse(localStorage.getItem(DATA_STORAGE_KEY)) ?? {};
const { email, message } = form.elements;
email.value = userData.email ?? "";
message.value = userData.message ?? "";


function onFeedback(e) {
    e.preventDefault();

    const { name, value } = e.target;
    userData[name] = value;
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(userData));
}

function onSubmit(e) {
    e.preventDefault();

    if (!email.value || !message.value) {
        alert('Всі поля повинні бути заповнені!');
        return;
    }

    console.log("userData:", userData);

    form.reset();
    localStorage.removeItem(DATA_STORAGE_KEY);
}


