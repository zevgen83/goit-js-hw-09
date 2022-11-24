import Notiflix from 'notiflix';

let timerId = null;

const refs = {
  formInput: document.querySelector('form'),
}

refs.formInput.addEventListener('submit', onFormSubmit);

function onFormSubmit (e) {
  e.preventDefault(); 
  const { delay, step, amount } = e.target.elements;
  let delayNumber = Number(delay.value);  
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayNumber)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);      
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);      
    });    
    delayNumber += Number(step.value);
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    timerId = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);    
  })
  
}
