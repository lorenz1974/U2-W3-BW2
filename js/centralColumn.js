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
      <div class="col">
        <div class="card bg-body-tertiary rounded">
          <div class="card-body d-flex align-items-center" style="margin-left: -8px;">
            <img
              src="${playlist.playlistImg}"
              class="me-2 rounded"
              alt="Playlist Cover"
              style="width: 60px; height: 60px; object-fit: cover;"
            />
            <div>
              <h5 class="card-title mb-0" id="playList-${playlist.playlistName.replace(' ', '')}">${playlist.playlistName}</h5>
              <p class="card-text text-muted">${playlist.playlistTracks.length} brani</p>
            </div>
          </div>
        </div>
      </div>
      `;
    });
  document.getElementById("ourPlayListsSection").innerHTML = playlistCardsHTML;
};

const drawPlaylistCards = async () => {
  // Filtra le playlist per quelle che hanno playlistSpotify === true
  const spotifyPlaylists = playlistsArray.filter(
    (
    (playlist)) => playlist.playlistSpotify === true
  
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
              height: 220px;
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
                  <p class="mb-1 text-secondary">Playlist</p>
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
                      <p class="p-0 m-0 me-2 text-nowrap">${playlist.playlistTracks.length} brani</p>
                    </div>

                    <button
                      class="d-inline-block rounded-circle p-2 border-0"

                      id="playPlayListPlay-${playlist.playlistName.replace(' ', '')}"

                      style="background-color: #272822"
                    >

                        <i id="playListPlayControl-${playlist.playlistName.replace(' ', '')}" class="fa-solid fa-play my-auto"></i>
                        <i id="playListPauseControl-${playlist.playlistName.replace(' ', '')}" class="fa-solid fa-pause d-none my-auto"></i>

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

  document.getElementById("spotifyPlayListsSection").innerHTML +=
    playlistCardsMobileHTML;
};

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

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchMobile");
  const formSearch = document.getElementById("formSearch");
  const playListsSearch = document.getElementById("playListsSearch");
  const bigHeader = document.getElementById("bigHeader");
  const ultraBigSection = document.getElementById("ultraBigSection");
  const closeButton = document.getElementById("closeButton");

  playListsSearch.style.display = "none";

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    formSearch.classList.add("d-flex");
    playListsSearch.style.display = "block";
    bigHeader.style.display = "none";
    ultraBigSection.style.display = "none";
  });

  closeButton.addEventListener("click", function () {
    playListsSearch.style.display = "none";
    bigHeader.style.display = "block";
    ultraBigSection.style.display = "block";
  });
});
setTimeout(async () => {
  drawOurPlaylists()
  try {
    await drawPlaylistCards()
  } catch (error) {
    _W(1, `Errore durante il fetch dei dati: ${error}`)
  }
}, 500)
