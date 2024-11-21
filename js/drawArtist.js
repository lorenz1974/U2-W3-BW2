// Funzione principale per disegnare i dettagli dell'artista
const drawArtist = async (targetObject) => {
  try {
    // Chiamata API per recuperare i dati dell'artista
    const artistData = await fetchFunction(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${targetObject}`
    )
    const artistTracksData = await fetchFunction(artistData.tracklist)
    // HTML dinamico per l'artista

    let artistHTML = `
    <section class="d-none d-md-block">
    <!-- barra con bottoni e utente -->
    <div
      class="d-flex justify-content-between align-items-center mt-2 mb-1 ms-2 me-2"
    >
      <!-- div con bottoni -->
      <div class="d-flex justify-content-start align-content-center">
        <button
          class="d-inline-block rounded-circle border-0 me-3 ps-1"
          style="background-color: #000000"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="currentColor"
            class="bi bi-chevron-left rounded-circle mb-1"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
        <!-- freccia destra -->
        <button
          class="d-inline-block rounded-circle border-0 me-3 pe-1"
          style="background-color: #000000"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="currentColor"
            class="bi bi-chevron-left rounded-circle mb-1"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </div>
      <!-- div con utente -->
      <div>
        <div class="dropdown">
          <a
            class="btn rounded-pill btn-dark dropdown-toggle ps-0 pt-0 pb-0"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="./assets/imgs/main/image-1.jpg"
              alt=""
              class="img-fluid rounded-circle"
              style="width: 30px"
            />
            Utente
          </a>

          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
              <a class="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
        `

    artistHTML += `
      <div
        class="position-relative"
        style="height: 400px; background-image: url(${artistData.picture_xl}); background-size: cover; background-position: center 30%;"
      >
      
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        <div class="position-absolute bottom-0 start-0 text-start p-4">
          <div class="d-flex align-items-center">
            <img id="verifiedLogo" class="" src="./assets/icons/verified-badge-profile-icon-png.webp" alt="verified-logo">
            <p class="m-0 ps-2">Artista verificato</p>
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
          <button
              class="d-inline-block rounded-circle p-2 mb-2 border-0 bg-spotify mt-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="black"
                class="bi bi-play-fill rounded-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                />
              </svg>
            </button>
            <button class="btn btn-outline-light btn-sm fs-7 mb-1 ms-2 px-3 fw-bold d-none d-sm-block">FOLLOWING</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
             >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
              />
             </svg>
        </div>
      </div>
    `

    // for (let i = 0; i < 6; i++) {
    //   trackHTML = `
    //         <div class="row g-0 ms-2 me-2 mb-0">
    //             <div class="col col-1 d-none d-md-block">
    //                 <p id="songNumber" class="mt-2 mb-0">${i + 1}</p>
    //             </div>

    //             <div
    //                 class="col col-10 col-md-6 d-flex flex-column align-content-center justify-content-center"
    //             >
    //                 <p id="songNameList" class="mb-0 fw-bold">${
    //                   artistTracksData[i].title_short
    //                 }</p>
    //                 <p id="artistNameList" class="fs-7">${
    //                   artistTracksData[i].artist.name
    //                 }</p>
    //             </div>

    //             <div class="col-3 text-end d-none d-md-block">
    //                 <p id="playedCounter" class="mb-0 mt-2">${artistTracksData[
    //                   i
    //                 ].id.toLocaleString('it-IT')}</p>
    //             </div>

    //             <div class="col col-2 text-end mb-0 d-none d-md-block">
    //                 <p id="songDurationList" class="mb-0 mt-2">${formatDuration(
    //                   artistTracksData[i].duration
    //                 )}</p>
    //             </div>
    //             <div class="col col-2 text-end mb-0 mt-2 d-md-none">
    //                 <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="20"
    //                 height="20"
    //                 fill="currentColor"
    //                 class="bi bi-three-dots-vertical d-inline-block"
    //                 viewBox="0 0 16 16"
    //                 >
    //                 <path
    //                     d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
    //                 />
    //                 </svg>
    //             </div>
    //             </div>
    //             `
    // }
    // artistHTML += trackHTML

    //   // Inserimento del contenuto nell'elemento HTML con ID "artist-container"
    //   const artistContainer = document.getElementById('artist-container')
    //   if (artistContainer) {
    //     artistContainer.innerHTML = artistHTML
    //   } else {
    //     console.error('Elemento con id "artist-container" non trovato.')
    //   }

    //   // Genero dinamicamente le tracce popolari
    //   const tracklistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${targetObject}/top?limit=50`
    //   fetchTopTracks(tracklistUrl)
    // } catch (error) {
    //   console.error('Errore', error)
    // }

    document.getElementById('centralColumn').innerHTML = artistHTML
  } catch (error) {
    console.log(error)
  }

  // async function fetchTopTracks(tracklistUrl) {
  //   try {
  //     const artistSong = await fetchFunction(tracklistUrl)

  //     // Aggiungo ogni traccia al nell'elemento HTML con ID "popular-tracks"
  //     const popularTracksContainer = document.getElementById('popular-tracks')

  //     // Generazione dell'HTML per ogni traccia
  //     artistSong.data.slice(0, 5).forEach((track, index) => {
  //       const trackHTML = `
  //         <div class="col-12 text-white d-flex align-items-center p-3 mb-3">
  //           <span class="me-3">${index + 1}</span>
  //           <img src="${track.album.cover}" alt="${
  //         track.title
  //       }" class="rounded me-3 my-img" />
  //           <div class="flex-grow-1">
  //             <p class="m-0">${track.title}</p>
  //             <span>${track.rank}</span>
  //           </div>
  //           <div class="d-flex align-items-center p-3 mb-3">
  //             <i class="bi bi-three-dots-vertical d-block d-sm-none"></i>
  //             <span class="d-none d-sm-block">${(track.duration / 60).toFixed(
  //               2
  //             )}</span>
  //           </div>
  //         </div>
  //       `
  //       popularTracksContainer.innerHTML += trackHTML
  //     })
  //   } catch (error) {
  //     console.error('Errore:', error)
  //   }
}
