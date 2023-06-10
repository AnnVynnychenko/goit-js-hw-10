'use strict'

import { show } from "./index";
import { refs } from "./index";
import { hidden } from "./index";
import { Report } from 'notiflix/build/notiflix-report-aio';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_SyQGl341vRl8z95nHPqFONRXAQQDOBDhWHYILUQAWOrtuHd2atfCHDRWTn9gMB14';
function ifError() {
    hidden(refs.breedSelectEl);
    hidden(refs.dataLoadingEl);
    show(Report.failure(
        'Oops! Something went wrong!',
        '"Failure is simply the opportunity to begin again, this time more intelligently." <br/><br/>- Henry Ford',
        'Okay',
        ));
}

export function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                ifError();
            };
            return resp.json();
        });
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                ifError();
            };
            return resp.json();    
        });
}
      

