import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector("[data-start]");
startButton.disabled = true;
const daysTimer = document.querySelector("[data-days]");
const hoursTimer = document.querySelector("[data-hours]");
const minutesTimer = document.querySelector("[data-minutes]");
const secondsTimer = document.querySelector("[data-seconds]");


let userSelectedDate;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates = selectedDates[0];
    if (selectedDates < new Date()) {
      iziToast.error({
    position: "topRight",
    title: "Error",
    message: "Please choose a date in the future",
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDates;
      startButton.disabled = false;
    }
  },
});


startButton.addEventListener("click", startTimer);

function startTimer() {
  setInterval(() => {
    let remainerOfTime = userSelectedDate.getTime() - Date.now();
    daysTimer.innerHTML = convertMs(remainerOfTime).days;
    hoursTimer.innerHTML = convertMs(remainerOfTime).hours;
    minutesTimer.innerHTML = convertMs(remainerOfTime).minutes;
    secondsTimer.innerHTML = convertMs(remainerOfTime).seconds;
  }, 1000)
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


