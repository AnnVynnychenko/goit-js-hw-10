import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import '../sass/common.scss';
import SlimSelect from "slim-select";


export const refs = {
    breedSelectEl: document.querySelector('.breed-select'),
    catInfoEl: document.querySelector('.cat-info'),
    dataLoadingEl: document.querySelector('.loader'),
};

refs.breedSelectEl.addEventListener('change', onSearch);

function createOptions({id, name}) {
    const option = `<option value="${id}">${name}</option>`;
    return option;
};

hidden(refs.breedSelectEl);
show(refs.dataLoadingEl);

fetchBreeds().then(breeds => {
    breeds.forEach(breed => {
        refs.breedSelectEl.insertAdjacentHTML('beforeend', createOptions(breed));
    });
    new SlimSelect({
        select: '.breed-select',
        settings: {
            placeholderText: 'Please, select a kitten',
          }
      })
    hidden(refs.dataLoadingEl);
    show(refs.breedSelectEl);
    
}).catch(err => console.log(err));

function onSearch(evt) { 
    evt.preventDefault();
    const breedId = refs.breedSelectEl.value;
    show(refs.dataLoadingEl);
fetchCatByBreed(breedId)
    .then(data => {
        refs.catInfoEl.insertAdjacentHTML('beforeend', createMarkup(data));
        hidden(refs.dataLoadingEl);
    })
        .catch(err => console.log(err));
    refs.catInfoEl.innerHTML = '';
    
};

function createMarkup(arr) {
  return arr.map(({ url, breeds }) => {
    const { name, temperament, description } = breeds[0];
    return `
      <img class='cat-img' src="${url}" alt="${name}"/>
      <div>
      <h1>${name}</h1>
      <p>${description}</p>
      <p><span class='temp'>Temperament: </span>${temperament}</p>
      </div>
    `;
  }).join('');
};

export function show(el) {
    el.classList.remove('is-hidden');
};

export function hidden(el) {
    el.classList.add('is-hidden')
};

