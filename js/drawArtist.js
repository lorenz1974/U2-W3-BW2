// Funzione principale per disegnare i dettagli dell'artista
const drawArtists = async (targetObject) => {
  try {
    // Chiamata API per recuperare i dati dell'artista
    const artistData = await fetchFunction(`https://striveschool-api.herokuapp.com/api/deezer/artist/${targetObject}`);

    // HTML dinamico per l'artista
    let artistHTML = `
      <div
        class="position-relative"
        style="height: 400px; background-image: url(${artistData.picture_xl}); background-size: cover; background-position: center 30%;"
      >
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        <div class="position-absolute bottom-0 start-0 text-start p-4">
          <div class="d-flex align-items-center">
            <i class="bi bi-patch-check-fill me-2 text-info"></i>
            <p class="m-0">Artista verificato</p>
          </div>
          <h1 class="display-4 fw-bold">${artistData.name}</h1>
          <p class="mb-4 mt-5 d-none d-sm-block">${artistData.nb_fan} ascoltatori mensili</p>
        </div>
      </div>
      <div class="container-fluid mt-5 ms-2">
        <p class="mb-4 mt-5 d-block d-sm-none">${artistData.nb_fan} ascoltatori mensili</p>
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-light btn-sm fs-7 d-block d-sm-none order-1">Seguiti</button>
          <i class="bi bi-three-dots-vertical d-block d-sm-none order-2"></i>
          <div class="d-flex d-sm-none gap-3 ms-auto order-3">
            <i class="bi bi-play-circle-fill text-success fs-1"></i>
            <i class="bi bi-shuffle text-white fs-1"></i>
          </div>
          <i class="bi bi-play-circle-fill text-success fs-1 d-none d-sm-block"></i>
          <button class="btn btn-outline-light btn-sm fs-7 d-none d-sm-block order-4">Following</button>
          <i class="bi bi-three-dots d-none d-sm-block order-5"></i>
        </div>
      </div>
    `;

    // Inserimento del contenuto nell'elemento HTML con ID "artist-container"
    const artistContainer = document.getElementById('artist-container');
    if (artistContainer) {
      artistContainer.innerHTML = artistHTML;
    } else {
      console.error('Elemento con id "artist-container" non trovato.');
    }

    // Genero dinamicamente le tracce popolari
    const tracklistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${targetObject}/top?limit=50`;
    fetchTopTracks(tracklistUrl);
  } catch (error) {
    console.error('Errore', error);
  }
};

async function fetchTopTracks(tracklistUrl) {
  try {
    const artistSong = await fetchFunction(tracklistUrl);

    // Aggiungo ogni traccia al nell'elemento HTML con ID "popular-tracks"
    const popularTracksContainer = document.getElementById('popular-tracks');

    // Generazione dell'HTML per ogni traccia
    artistSong.data.slice(0, 5).forEach((track, index) => {
      const trackHTML = `
        <div class="col-12 text-white d-flex align-items-center p-3 mb-3">
          <span class="me-3">${index + 1}</span>
          <img src="${track.album.cover}" alt="${track.title}" class="rounded me-3 my-img" />
          <div class="flex-grow-1">
            <p class="m-0">${track.title}</p>
            <span>${track.rank}</span>
          </div>
          <div class="d-flex align-items-center p-3 mb-3">
            <i class="bi bi-three-dots-vertical d-block d-sm-none"></i>
            <span class="d-none d-sm-block">${(track.duration / 60).toFixed(2)}</span>
          </div>
        </div>
      `;
      popularTracksContainer.innerHTML += trackHTML;
    });
  } catch (error) {
    console.error('Errore:', error);
  }
}

// Eseguo la funzione con un ID di esempio
drawArtists('25');
