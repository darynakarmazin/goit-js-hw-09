import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  let delay = Number(evt.currentTarget.delay.value);
  const step = evt.currentTarget.step.value;
  const amount = evt.currentTarget.amount.value;

  for (let i = 0; i < amount; i++) {
    let position = i + 1;
    delays = delay + step * i;

    createPromise(position, delays)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
