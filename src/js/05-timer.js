import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';
import {Notify} from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');

const daysOutput = document.querySelector('span[data-days]');
const hoursOutput = document.querySelector('span[data-hours]');
const minutesOutput = document.querySelector('span[data-minutes]');
const secondsOutput = document.querySelector('span[data-seconds]');

let targetTime = null;

startBtn.disabled = true;


const inputCalendar = flatpickr(dateInput, {
    enableTime: true,  
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // minDate:new Date(), // не можна вибрати дату до сьогодні

    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            // window.alert("Please choose a date in the future");
            // Notiflix.Notify.failure('Please choose a date in the future', {timeout: 3000,});
            Notify.warning('Please choose a date in the future', {timeout: 3000,});
        } else {
            startBtn.disabled = false;
            targetTime = selectedDates[0];
        }
    },
}); 

startBtn.addEventListener('click', onClick);


function onClick() {
    startTimerInterval();

    dateInput.disabled = true;
    startBtn.disabled = true;
}

function startTimerInterval() {
        const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = targetTime - currentTime;
        const formattedData = convertMs(deltaTime);

        updateTimerInterface(formattedData);
        
        if (deltaTime < 1000) {
            clearInterval(timerId);
            const formattedData = convertMs(0);
            updateTimerInterface(formattedData);

            startBtn.disabled = false;
            dateInput.disabled = false;
        }   
    }, 1000);
}

function updateTimerInterface(timeData) {
    const { days, hours, minutes, seconds } = timeData;

    daysOutput.textContent = addLeadingZero(days);
    hoursOutput.textContent = addLeadingZero(hours);
    minutesOutput.textContent = addLeadingZero(minutes);
    secondsOutput.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
