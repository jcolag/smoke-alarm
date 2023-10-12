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
  }
}

function updatePantry() {

  if (!Object.prototype.hasOwnProperty.call(config, 'pantryId')) {
    return;
  }


  }

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

