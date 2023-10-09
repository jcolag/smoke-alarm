let pantry = {
  toots: [],
};
let pantryInterval = null;

window.addEventListener('load', () => {
  let submit = document.getElementById('submit');

  submit.disabled = true;
  submit.title = 'Please fill in your daily assessments.';
  pantryInterval = setInterval(getPantry, 250);
});

function getPantry() {
  if (!Object.prototype.hasOwnProperty.call(config, 'pantry')) {
    return;
  }

  httpGet(
    `https://getpantry.cloud/apiv1/pantry/${config.pantry.trim()}`
      + '/basket/Rummager',
    null,
    assignPantry
  );

  clearInterval(pantryInterval);
  pantryInterval = setInterval(updatePantry, 500);
}

function assignPantry(p) {
  pantry = p;
  if (!Object.prototype.hasOwnProperty.call(pantry, 'toots')) {
    pantry.toots = [];
  }
}

function updatePantry() {
  if (timeline.length === 0) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(config, 'pantry')) {
    return;
  }

  let ids = timeline.map((t) => t.id);
  const rids = timeline
    .map((t) => t.reblog)
    .filter((t) => t)
    .map((t) => t.id);

  for (let i = 0; i < rids.length; i++) {
    ids.push(rids[i]);
  }

  for (let i = 0; i < pantry.toots; i++) {
    ids.push(pantry.toots[i]);
  }

  pantry.toots = ids.filter((v, i, a) => a.indexOf(v) === i)
  clearInterval(pantryInterval);
  pantryInterval = null;
  httpPut(
    `https://getpantry.cloud/apiv1/pantry/${config.pantry.trim()}`
      + '/basket/Rummager',
    pantry
  );
}

