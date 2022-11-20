// import { fetchCountries } from './fetchCountries';
// import { refs } from './refs';
// import { renderCountryList, renderCountryInfo } from './markup';

// import debounce from 'lodash.debounce'; //
// console.log(debounce);
// import { Notify } from 'notiflix';
// console.log(Notify);

// const DEBOUNCE_DELAY = 300;

// refs.input.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

// function onCountryInput(e) {
//   const name = e.target.value.trim();
//   if (name === '') {
//     return (refs.ul.innerHTML = ''), (refs.div.innerHTML = '');
//   }

//   fetchCountries(name)
//     .then(countries => {
//       refs.ul.innerHTML = '';
//       refs.div.innerHTML = '';
//       if (countries.length === 1) {
//         refs.ul.insertAdjacentHTML('beforeend', renderCountryList(countries));
//         refs.div.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
//       } else if (countries.length >= 10) {
//         Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       } else {
//         refs.ul.insertAdjacentHTML('beforeend', renderCountryList(countries));
//       }
//     })
//     .catch(error => {
//       Notify.failure('Oops, there is no country with that name');
//     });
// }
