import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      validDate(selectedDates[0]);
    },
  }
  let selectedTime = 0;  
  const buttonStart = document.querySelector('[data-start]');
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  buttonStart.disabled = true;

const myInput = document.querySelector("#datetime-picker");
const fp = flatpickr(myInput, options);

function validDate (selectedDates) {
  if (Date.now() < selectedDates) {
    buttonStart.disabled = false;
    selectedTime = selectedDates; 
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }  
}

buttonStart.addEventListener('click', onButtonStartClick)

function onButtonStartClick () {
  let deltaTime = Date.parse(selectedTime) - Date.now(); 
  
  let timeinterval = setInterval( function() {  
    const endTime = convertMs(deltaTime);  
    daysEl.textContent = addLeadingZero(endTime.days);
    hoursEl.textContent = addLeadingZero(endTime.hours);
    minutesEl.textContent = addLeadingZero(endTime.minutes);
    secondsEl.textContent = addLeadingZero(endTime.seconds);
    deltaTime -= 1000;
    if( deltaTime <= 0 ) {  
     clearInterval(timeinterval);  
    }  
   }, 1000);  
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}