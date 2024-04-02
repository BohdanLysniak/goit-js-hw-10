import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputTimer = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
startButton.disabled = true;
const daysDisplay = document.querySelector("[data-days]");
const hoursDisplay = document.querySelector("[data-hours]");
const minutesDisplay = document.querySelector("[data-minutes]");
const secondsDisplay = document.querySelector("[data-seconds]");


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
    let intervalID = setInterval(() => {
    const currentTime = Date.now();
    let remainerOfTime = userSelectedDate.getTime() - currentTime;
    daysDisplay.textContent = addLeadingZero(convertMs(remainerOfTime).days);
    hoursDisplay.textContent = addLeadingZero(convertMs(remainerOfTime).hours);
    minutesDisplay.textContent = addLeadingZero(convertMs(remainerOfTime).minutes);
    secondsDisplay.textContent = addLeadingZero(convertMs(remainerOfTime).seconds);
    if (remainerOfTime < 1000) {
      clearInterval(intervalID);
    }
  }, 1000);
  startButton.disabled = true;
  inputTimer.disabled = true;
}

function convertMs(ms) {
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
  return value.toString().padStart(2, "0");
}

