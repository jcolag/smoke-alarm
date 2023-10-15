let config = {};
let dailies = [];
let pantry = {};
let pantryId = null;
let pantryInterval = null;
let values = {
  date: new Date().toISOString(),
  a: null,
  f: null,
  m: null,
  r: null,
  s: null,
  w: null,
};

window.addEventListener('load', () => {
  const submit = document.getElementById('submit');
  const pantryError = document.getElementById('pantryError');
  const usePantry = document.getElementById('usePantry');

  config.pantryId = localStorage.getItem('pantryId');

  if (config.pantryId === null) {
    pantryError.style['display'] = 'block';
  }

  submit.disabled = true;
  usePantry.disabled = true;
  submit.title = 'Please fill in your daily assessments.';
  pantryInterval = setInterval(getPantry, 250);
});

function getPantry() {
  if (!Object.prototype.hasOwnProperty.call(config, 'pantryId') || config.pantryId === null) {
    return;
  }

  httpGet(
    `https://getpantry.cloud/apiv1/pantry/${config.pantryId.trim()}`,
    null,
    assignPantry
  );

  clearInterval(pantryInterval);
}

function assignPantry(p) {
  pantry = p;

  if (pantry.baskets.length <= 0) {
    createBasket('Smoke');
  }

  const basket = pantry.baskets.filter((b) => b.name === 'Smoke')[0];

  if (!Object.prototype.hasOwnProperty.call(basket, 'dailies')) {
    basket.dailies = [];
  }

  dailies = basket.dailies;
}

function updatePantry() {

  if (!Object.prototype.hasOwnProperty.call(config, 'pantryId')) {
    return;
  }

  httpPut(
    `https://getpantry.cloud/apiv1/pantry/${config.pantryId.trim()}`
      + '/basket/Smoke',
    basket
  );
}

function createBasket(name) {
  const basket = {
    dailies: [],
    name: name,
  };

  pantry.baskets.push(basket);
  httpPut(
    `https://getpantry.cloud/apiv1/pantry/${config.pantryId.trim()}`
      + `/basket/${name}`,
    basket
  );
}

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
function httpGet(url, auth, assigner) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  if (auth) {
    xhr.setRequestHeader('Authorization', auth);
  }

  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        assigner(JSON.parse(xhr.responseText));
      } else {
        console.error(xhr.statusText);
        return null;
      }
    }
  };
  xhr.onerror = (e) => {
    console.log(e);
    console.error(xhr.statusText);
    return null;
  };
  xhr.send(null);
  latch = false;
}

function httpPut(url, data) {
  const xhr = new XMLHttpRequest();

  xhr.withCredentials = true;
  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      return this.responseText;
    }
  });
  xhr.open('PUT', url);
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://getpantry.cloud');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

function changePantry() {
  const pantryInput = document.getElementById('pantry');
  const usePantry = document.getElementById('usePantry');

  usePantry.disabled = !pantryInput.checkValidity() || pantryInput.value.length < 1;
}

function stashPantryId() {
  const id = document.getElementById('pantry');
  const pantryError = document.getElementById('pantryError');

  localStorage.setItem('pantryId', id.value);
  config.pantryId = id.value.trim();
  pantryError.style['display'] = 'none';
}

function valueInput(key) {
  const num = document.getElementById(key);
  const submit = document.getElementById('submit');
  const pantryId = localStorage.getItem('pantryId');

  if (num.value.length <= 0) {
    values[key] = null;
  } else if (num.checkValidity()) {
    values[key] = Number(num.value);
  }

  submit.disabled = pantryId === null
    || values.a === null
    || values.f === null
    || values.m === null
    || values.r === null
    || values.s === null
    || values.w === null;
}

