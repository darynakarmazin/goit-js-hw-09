// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let intervalId = null;

const buttonStart = document.querySelector('button[data-start]');
const cunterDays = document.querySelector('span[data-days]');
const cunterHours = document.querySelector('span[data-hours]');
const cunterMinutes = document.querySelector('span[data-minutes]');
const cunterSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const currentDate = new Date();
    if (selectedDates[0] < new Date()) {
      buttonStart.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure(
        'Please choose a date in the future! Do not look back..'
      );
      return;
    }
    if (selectedDates[0] > new Date()) {
      buttonStart.removeAttribute('disabled', 'disabled');
    }

    buttonStart.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const delta = selectedDates[0] - new Date();

        if (delta < 1000) {
          clearInterval(intervalId);
        }
        const formatDelta = convertMs(delta);
        renderDate(formatDelta);
      }, 1000);
    });
  },
};

flatpickr('input#datetime-picker', options);

function renderDate({ days, hours, minutes, seconds }) {
  cunterDays.textContent = days;
  cunterHours.textContent = hours;
  cunterMinutes.textContent = minutes;
  cunterSeconds.textContent = seconds;
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

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
