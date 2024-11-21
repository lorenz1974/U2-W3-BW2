// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//
// applicato un ritardo di mezzo secondo a tutte le funzioni (e dichiarazioni di variabile)
setTimeout(() => {
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

  //   ed inizializzo l'array fuori dalla funzione di ricerca
  const queryArray = []

  // metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
  const SEARCH_URL =
    'https://striveschool-api.herokuapp.com/api/deezer/search?q='

  // qui gestisco la mia libreria
  const myLibraryID = [
    726319, 1236002, 119282, 1316047, 1318764, 113578, 59853992, 401032,
    9884672, 116670,
  ]

  const switchTitle = document.getElementById('switchTitle')

  //   targhettizzo il link nella colonna sinistra che mi possa condividere l'array di album
  const libraryLink = document.getElementById('library-link')
  const libraryArray = []
  const ALBUM_URL = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
  const TRACK_URL = 'https://striveschool-api.herokuapp.com/api/deezer/track/'

  const drawOurLibrary = (albumsArray) => {
    let playlistCardsHTML = ''
    albumsArray.forEach((album) => {
      playlistCardsHTML += `
        <div class="col">
          <div class="card bg-body-tertiary rounded">
            <div class="card-body d-flex align-items-center">
              <img
                src="${album.cover}"
                class="me-3 rounded"
                alt="Album Cover"
                style="width: 70px; height: 70px; object-fit: cover;"
              />
              <div>
                <h5 class="card-title mb-0">${album.artist.name}</h5>
                <p class="card-text text-muted">${album.title}</p>
              </div>
            </div>
          </div>
        </div>
        `
    })
    document.getElementById('ourPlayListsSection').innerHTML = playlistCardsHTML
  }

  const populateMyLibrary = async () => {
    libraryArray.length = 0
    const data = await Promise.all(
      myLibraryID.map((id) => {
        let usingURL = ALBUM_URL + id
        return fetchFunction(usingURL)
      })
    )
    libraryArray.push(...data)
  }

  libraryLink.addEventListener('click', () => {
    switchTitle.innerText = 'La tua libreria'
    document.getElementById('ourPlayListsSection').innerHTML = ''
    populateMyLibrary().then(() => {
      console.log('libraryArray:', libraryArray)
      drawOurLibrary(libraryArray)
    })
  })

  //   qui gestisco le playlist

  const populateMyPlaylist = async (list) => {
    playlistArray.length = 0
    const data = await Promise.all(
      list.map((id) => {
        let usingURL = TRACK_URL + id
        return fetchFunction(usingURL)
      })
    )
    playlistArray.push(...data)
  }

  const playlistArray = []

  const list = document.getElementById('playlists-list')
  playlistsArray.forEach((playlist) => {
    if (playlist.playlistSpotify === false) {
      const newLi = document.createElement('li')
      const newP = document.createElement('p')
      newP.classList.add(
        'btn',
        'p-0',
        'me-2',
        'text-body-secondary',
        'fw-normal',
        'text-truncate'
      )
      newP.innerText = playlist.playlistName
      newP.addEventListener('click', () => {
        populateMyPlaylist(playlist.playlistTracks).then(() => {
          console.log('playlistArray:', playlistArray)
        })
      })
      newLi.appendChild(newP)
      list.appendChild(newLi)
    }
  })

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
    fetchFunction(usingURL).then((result) => {
      queryArray.push(...result.data)
      console.log('queryArray:', queryArray)
    })

    //   ed a ricerca avvenuta con successo resetto il campo di ricerca
    queryInput.value = ''
  })
}, 500)

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
