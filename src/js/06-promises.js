import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit)


function onFormSubmit(e) {
  e.preventDefault();
  
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  let delay = Number(form.elements.delay.value);

  if (step < 0 || amount < 0 || delay < 0) {
      Notiflix.Notify.warning('Value cannot be negative');
      return;
  }

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
      delay += step;
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promObj = { position, delay };

  return new Promise((res, rej) => {
    setTimeout(() => {
        if (shouldResolve) {
            res(promObj);
          } else {
            rej(promObj);
          }
        }, delay)
    })
}
