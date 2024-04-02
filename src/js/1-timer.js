import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector([data - start]);
startButton.disabled = true;

startButton.addEventListener("click", startTimmer);

function startButton() {
  
}

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

