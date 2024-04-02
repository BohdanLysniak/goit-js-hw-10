import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { createLogger } from "vite";

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const validTime = selectedDates[0] - new Date();
    console.log(validTime);
  console.log(selectedDates[0]);
  },
});

let userSelectedDate;

const startButton = document.querySelector("button");
