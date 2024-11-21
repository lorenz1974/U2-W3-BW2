// Funzione principale per disegnare i dettagli dell'artista
const drawArtists = async (targetObject) => {
    try {
      // Chiamata API per recuperare i dati dell'artista
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${targetObject}`);
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
  
      const artistData = await response.json();
      console.log(artistData);
  
      // HTML dinamico per l'artista
      let artistHTML = `
        <div
          class="position-relative"
          style="height: 400px; background-image: url(${artistData.picture_xl}); background-size: cover; background-position: center 30%;"
        >
          <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
  
          <div class="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-center mt-2 mb-3">
            <div class="d-flex justify-content-start align-content-center">
              <button class="d-inline-block rounded-circle border-0 me-3 ps-1" style="background-color: #000000">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-chevron-left text-white rounded-circle mb-1" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
              </button>
              <button class="d-inline-block rounded-circle border-0 me-3 pe-1" style="background-color: #000000">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-chevron-left text-white rounded-circle mb-1" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>
            </div>
  
            <div>
              <div class="dropdown">
                <a class="btn rounded-pill btn-dark dropdown-toggle ps-0 pt-0 pb-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="./assets/imgs/main/image-1.jpg" alt="" class="img-fluid rounded-circle" style="width: 30px" />
                  Utente
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
  
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
  
          <div class="container-fluid mt-5">
            <div class="row">
              <!-- Colonna Sinistra: Popolari -->
              <div class="col-md-6 order-md-1 order-2">
                <h3 class="mb-4">Popolari</h3>
                <div class="row" id="popular-tracks"></div> <!-- Area dove verranno inseriti i brani -->
              </div>
  
              <!-- Colonna Destra: Liked Songs -->
              <div class="col-md-6 order-md-2 order-1">
                <div class="d-flex align-items-center">
                  <img src="${artistData.picture_small}" alt="Immagine" class="me-3 my-img rounded-5" />
                  <div>
                    <h4>Brani che ti piacciono</h4>
                    <p>Hai messo Mi piace a 11 brani di ${artistData.name}</p>
                    <p class="text-secondary">Di ${artistData.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <section>
            <div class="ms-2">
              <h6>VISUALIZZA ALTRO</h6>
            </div>
          </section>
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
      const response = await fetch(tracklistUrl);
      const artistSong = await response.json();  
  
      // Aggiungo ogni traccia al nell'elemento HTML con ID "popular-tracks"
      const popularTracksContainer = document.getElementById('popular-tracks');
  
      // Generazione dell'HTML per ogni traccia
      artistSong.data.slice(0,5).forEach((track, index) => {  
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
              <span class="d-none d-sm-block">${(track.duration / 60).toFixed(2)}</span> <!-- Limitiamo i decimali -->
            </div>
          </div>
        `;
        popularTracksContainer.innerHTML += trackHTML; 
      });
  
    } catch (error) {
      console.error("Errore:", error);  
    }
  }
  
  
  
  // Eseguo la funzione con un ID di esempio
  drawArtists('25');  
  