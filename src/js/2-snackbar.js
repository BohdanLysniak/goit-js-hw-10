import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", createPromise);

function createPromise(event) {
  event.preventDefault();
  const delayOfPromise = event.target.elements.delay.value;
  const stateOfPromise = event.target.elements.state.value;

  if (delayOfPromise <= 0) {
    iziToast.show({
    backgroundColor: "yellow",
    position: "topRight",
    title: "Correct",
    message: "The delay value must be greater than 0",
  });
    return;
  }

  const promise = new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (stateOfPromise === "fulfilled") {
        resolve(delayOfPromise);
      } else {
        reject(delayOfPromise);
      }
    }, delayOfPromise);
  });

  promise.then((value) => {
    iziToast.show({
      color: "green",
      position: "topRight",
      message: `✅ Fulfilled promise in ${value}ms`,
    });
  }).catch((error) => {
    iziToast.show({
      color: "red",
      position: "topRight",
      message: `❌ Rejected promise in ${error}ms`,
    });
  });
  form.reset();
}


