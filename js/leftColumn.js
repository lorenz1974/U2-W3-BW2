// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// creo funzione che farà partire una ricerca al avvenuta ricerca nel form
const research = function (usingURL) {
  // eseguo una GET direttamente sul singolo elemento che mi interessa e che ho cercato
  fetch(usingURL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWM1NDhhZDEyOTAwMTU4NzZjMjIiLCJpYXQiOjE3MzE2NjQ5ODEsImV4cCI6MTczMjg3NDU4MX0.kkM1d_iF6SLAVc1L7ZwMPvV0xh5O2Sby9W7eXVidOZ4',
      // per poter accedere dobbiamo inserire la nostra KEY generata in fase di sign-in
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero informazioni')
      }
    })
    .then((queryArray) => {
      // qui avrò ottenuto le informazioni da poter girare alla colonna centrale per visualizzazione
      console.log('RISULTATI', queryArray)
    })
    .catch((err) => console.log('errore', err))
}

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//
// Targhettizzo l'informazione inserita nel form per la ricerca
const queryInput = document.getElementById('query')

// Targhettizzo il form per prevenire anche la gestione di default del submit che mi resetterebbe i campi
const form = document.getElementById('columnForm')

// metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
const SEARCH_URL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='

const myLibrary = [
  726319, 1236002, 119282, 1316047, 1318764, 113578, 59853992, 401032, 9884672,
  116670,
]

const myPlaylists = [{}, {}]

// const list = document.getElementById('playlists-list')
// myPlaylists.forEach((playlist) => {
//   const newPlaylist = document.createElement('li')

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('QUERYINPUT', queryInput.value) // stampo il valore dell'input nella console
  const encodedQuery = encodeURIComponent(queryInput.value) // codifico la query per includerla nell'URL
  const usingURL = SEARCH_URL + encodedQuery
  console.log('usingURL', usingURL)
  research(usingURL)
  //   ed a ricerca avvenuta con successo resetto il campo di ricerca
  queryInput.value = ''
})

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Loaded
  // TARGET1.addEventListener('click', () => {
  //		  TARGET Clicked
  // })
  // TARGET2.addEventListener('change', () => {
  //		  TARGET Changed
  // })
  // TARGET3.addEventListener('blur', () => {
  //		  TARGET Blurred
  // })
})
