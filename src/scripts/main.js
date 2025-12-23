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
    resolve('First promise was resolved');
    clearTimeout(timerId);
  };

  body.addEventListener('click', onClick);

  const timerId = setTimeout(() => {
    body.removeEventListener('click', onClick);
    reject(Error);
  }, 3000);
});

firstPromise
  .then((message) => {
    div1.textContent = message;
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
    resolve('Second promise was resolved');
  });

  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  div2.textContent = message;
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

      resolve('Third promise was resolved');
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

thirdPromise.then((message) => {
  div3.classList.add('success');
  div3.textContent = message;
  body.append(div3);
});
