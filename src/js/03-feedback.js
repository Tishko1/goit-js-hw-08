import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
let userInfo = {};

const saveToLS = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadFromLS = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeFromLS = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Remove item error: ', error.message);
  }
};


const fillFormData = e => {
  const storageData = loadFromLS('feedback-form-state');
  userInfo = storageData;
  if (storageData) {
    for (const prop in storageData) {
      form.elements[prop].value = storageData[prop];
    }
  }
};

fillFormData();

form.addEventListener(
  'input',
  throttle(e => {
    const { target } = e;
    const fieldName = target.name;
    const fieldValue = target.value;
    userInfo[fieldName] = fieldValue;
    saveToLS('feedback-form-state', userInfo);
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(userInfo);
  // userInfo = {};
  form.reset();
  removeFromLS('feedback-form-state');
});


