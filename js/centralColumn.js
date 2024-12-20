// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

const drawOurPlaylists = () => {
  let playlistCardsHTML = ''
  playlistsArray
    .filter((playlist) => playlist.playlistSpotify === false)
    .forEach((playlist) => {
      playlistCardsHTML += `
      <div class="col g-3">
        <div class="card bg-body-tertiary rounded border-0">
          <div class="card-body p-0 d-flex align-items-center" style="margin-left: -8px;">
            <img
              src="${playlist.playlistImg}"
              class="m-0 mx-2 rounded"
              alt="Playlist Cover"
              style="width: 70px; height: 70px; object-fit: cover;"
            />
            <div class="ps-2">
              <h5 class="card-title mb-1 " id="playList-${playlist.playlistName.replace(
                ' ',
                ''
              )}" style="font-size:15px;">${playlist.playlistName}</h5>
              <p class="card-text text-muted fs-7" style="font-size:12px">${
                playlist.playlistTracks.length
              } brani</p>
            </div>
          </div>
        </div>
      </div>
      `
    })
  document.getElementById('ourPlayListsSection').innerHTML = playlistCardsHTML
}

const drawPlaylistCards = async () => {
  // Filtra le playlist per quelle che hanno playlistSpotify === true
  const spotifyPlaylists = playlistsArray.filter(
    (playlist) => playlist.playlistSpotify === true
  )

  let playlistCardsMobileHTML = ''

  for (const playlist of spotifyPlaylists) {
    const randomIndex = Math.floor(
      Math.random() * playlist.playlistTracks.length
    )
    const trackId = playlist.playlistTracks[randomIndex]
    _W(trackId)

    try {
      const trackData = await fetchFunction(
        'https://striveschool-api.herokuapp.com/api/deezer/track/' + trackId
      )
      const imgeSrc = trackData.album.cover

      playlistCardsMobileHTML += `
        <div class="col d-md-none">
          <div
            class="card mb-3 border-0"
            style="
              background: rgb(0, 0, 0);
              background: linear-gradient(
                342deg,
                rgba(0, 0, 0, 1) 38%,
                rgba(156, 152, 152, 1) 100%
              );
            "
          >
            <div class="row g-0">
              <div class="col-4">
                <img
                  id="playlistImgHome"
                  src="${imgeSrc}"
                  class="img-fluid p-4"
                  alt="..."
                />
              </div>
              <div class="col-8">
                <div class="card-body">
                  <p class="mb-1 text-light opacity-75">Playlist</p>
                  <h2 id="playList-${playlist.playlistName.replace(' ', '')}"

                  class="card-title fs-1">
                    ${playlist.playlistName}
                  </h2>
                </div>
              </div>

              <div>
                <!-- card bottom -->
                <div
                  class="container d-flex justify-content-between align-items-center mb-3"
                >
                  <div class="d-flex justify-content-start align-content-center">
                    <!-- CUORE -->
                    <div class="text-spotify">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        />
                      </svg>
                    </div>

                    <!-- PUNTINI -->
                    <div class="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- BRANI E PLAY -->
                  <div>
                    <div class="d-inline-block">
                      <p class="p-0 m-0 me-2 fs-7 text-light opacity-75 text-nowrap">${
                        playlist.playlistTracks.length
                      } brani</p>
                    </div>

                    <button
                      class="d-inline-block rounded-circle px-3 py-2 border-0"

                      id="playPlayListPlay-${playlist.playlistName.replace(
                        ' ',
                        ''
                      )}"

                      style="background-color: #272822"
                    >

                        <i id="playListPlayControl-${playlist.playlistName.replace(
                          ' ',
                          ''
                        )}" class="fa-solid fa-play my-auto"></i>
                        <i id="playListPauseControl-${playlist.playlistName.replace(
                          ' ',
                          ''
                        )}" class="fa-solid fa-pause d-none my-auto"></i>

                    </button>
                    </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      `
    } catch (error) {
      _W(1, `Errore durante il fetch dei dati: ${error}`)
    }
  }

  document.getElementById('spotifyPlayListsSection').innerHTML +=
    playlistCardsMobileHTML
}

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(async () => {

    const searchButton = document.getElementById('searchMobile')
    const formSearch = document.getElementById('formSearch')
    const closeButton = document.getElementById('closeButton')
    const playListsSearch = document.getElementById('playListsSearch')
    const ultraBigSection = document.getElementById('ultraBigSection')

    searchButton.addEventListener('click', function () {
      formSearch.style.display = 'flex'
      playListsSearch.style.display = 'block'
      ultraBigSection.style.display = 'none'

        const articoli = document.querySelectorAll('.articolo');
      
        articoli.forEach((articolo, index) => {
          setTimeout(() => {
            articolo.classList.add('visible');
          }, index * 200);
            articolo.classList.remove('visible');
        });
    })

    closeButton.addEventListener('click', function () {
      formSearch.style.display = 'none'
      ultraBigSection.style.display = 'block'
      playListsSearch.style.display = 'none'
    })
  }, 500)
})

setTimeout(async () => {
  drawOurPlaylists()
  try {
    await drawPlaylistCards()
  } catch (error) {
    _W(1, `Errore durante il fetch dei dati: ${error}`)
  }
}, 500)
