'use strict';

const body = document.querySelector('body');
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

div1.setAttribute('data-qa', 'notification');
div2.setAttribute('data-qa', 'notification');
div3.setAttribute('data-qa', 'notification');

const firstPromise = new Promise((resolve, reject) => {
  const onClick = function () {
    resolve();
    clearTimeout(timerId);
  };

  body.addEventListener('click', onClick);

  const timerId = setTimeout(() => {
    body.removeEventListener('click', onClick);
    reject(Error);
  }, 3000);
});

firstPromise
  .then(() => {
    div1.textContent = 'First promise was resolved';
    div1.classList.add('success');
    body.append(div1);
  })
  .catch(() => {
    div1.textContent = 'First promise was rejected';
    div1.classList.add('error');
    body.append(div1);
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', () => {
    resolve();
  });

  body.addEventListener('click', () => {
    resolve();
  });
});

secondPromise.then(() => {
  div2.textContent = 'Second promise was resolved';
  div2.classList.add('success');
  body.append(div2);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClickDone = false;
  let rightClickDone = false;

  const check = () => {
    if (leftClickDone && rightClickDone) {
      
      body.removeEventListener('click', onLeftClick);
      body.removeEventListener('contextmenu', onRightClick);

      resolve();
    }
  };

  const onLeftClick = () => {
    leftClickDone = true;
    check();
  };

  const onRightClick = () => {
    rightClickDone = true;
    check();
  };

  body.addEventListener('click', onLeftClick);
  body.addEventListener('contextmenu', onRightClick);
});

thirdPromise.then(() => {
  div3.classList.add('success');
  div3.textContent = 'Third promise was resolved';
  body.append(div3);
});
