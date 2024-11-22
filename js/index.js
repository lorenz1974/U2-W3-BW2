// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

const populateMyPlaylist = async (list) => {
  //   _W(`populateMyPlaylist - list: `, list);

  for (const id of list) {
    try {
      trackInfo = await fetchFunction(TRACK_URL + id);
      // Non tutte le tracce hanno la preview e quindi va in errore il player
      // Così le escludiamo a priori
      trackInfo.preview.length > 0 ? playlistsMegaArray.push(trackInfo) : null;
      // playlistsMegaArray.push(await fetchFunction(TRACK_URL + id))
    } catch (error) {
      _W(error);
    }
  }
};

const populateMyLibrary = async () => {
  libraryArray.length = 0;
  for (const id of myLibraryID) {
    try {
      libraryArray.push(await fetchFunction(ALBUM_URL + id));
    } catch (error) {
      _W(error);
    }
  }
};

const populateMyQuery = async () => {
  // Targhettizzo l'informazione inserita nel form per la ricerca
  const queryInput = document.getElementById("query");
  const querySearch = document.getElementById("search");
  const encodedQuery = encodeURIComponent(queryInput.value); // codifico la query per includerla nell'URL
  const encodedSearch = encodeURIComponent(querySearch.value);
  try {
    fetchArray = await fetchFunction(SEARCH_URL + encodedQuery);
    playlistsMegaArray = fetchArray.data;
    searchInput = queryInput.value;
    querySearch.value = "";
  } catch (error) {
    _W(error);
  }
  try {
    fetchArray = await fetchFunction(SEARCH_URL + encodedSearch);
    playlistsMegaArray = fetchArray.data;
    cercaInput = querySearch.value;
    queryInput.value = "";
  } catch (error) {
    _W(error);
  }
};

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const drawPlaylistsLinks = () => {
  let playListsLiHTML = "";
  playlistsArray
    .filter((playlist) => playlist.playlistSpotify === false)
    .forEach((playlist) => {
      playListsLiHTML += `
            <li>
                <p id="playList-${playlist.playlistName.replace(
                  " ",
                  ""
                )}" class="btn p-0 me-2 text-body-secondary fw-normal text-truncate">
                    ${playlist.playlistName}
                </p>
            </li>
        `;
    });

  document.getElementById("playlists-list").innerHTML = playListsLiHTML;
};

const drawOurLibrary = (albumsArray) => {
  let playlistCardsHTML = "";
  albumsArray.forEach((album) => {
    playlistCardsHTML += `
        <div class="col g-3">
          <div id="album-${album.id}" class="card bg-body-tertiary rounded border-0">
            <div class="card-body d-flex align-items-center p-0 ">
              <img id="albumImage-${album.id}"
                src="${album.cover}"
                class="me-3 rounded"
                alt="Album Cover"
                style="width: 70px; height: 70px; object-fit: cover;"
              />
              <div>
                <h5 id="artistName-${album.artist.id}" class="card-title fs-6 mb-0" >${album.artist.name}</h5>
                <p id="albumText-${album.id}" class="card-text text-muted fs-7 mt-1" style="font-size: 13px;">${album.title}</p>
              </div>
            </div>
          </div>
        </div>
        `;
  });
  document.getElementById("ourPlayListsSection").innerHTML = playlistCardsHTML;
};

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

// metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
const SEARCH_URL =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// qui gestisco la mia libreria
const myLibraryID = [
  726319, 1236002, 119282, 1316047, 1318764, 113578, 59853992, 401032, 9884672,
  116670,
];

//   targhettizzo il link nella colonna sinistra che mi possa condividere l'array di album
//   ed inizializzo l'array fuori dalla funzione di ricerca
let libraryArray = [];
let playlistsMegaArray = [];
let queryArray = [];

const ALBUM_URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const TRACK_URL = "https://striveschool-api.herokuapp.com/api/deezer/track/";

const spinnerHTML = `
            <div id="alertMessage" class="alert d-none" role="alert">
                 A simple danger alert—check it out!
            </div>
            <div class="container w-100">
              <div id="spinner" class="row mt-5">
                    <div class="waitPlaceholder d-flex flex-column" role="status">
                        <span class="placeholder w-50 mb-3"></span>
                        <span class="placeholder w-75 mb-3"></span>
                        <span class="placeholder w-25 mb-3"></span>
                    </div>
                </div>
            </div>
            `;

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

document.addEventListener("DOMContentLoaded", async () => {
  const [leftColumnHTML, centralColumnHTML, rightColumnHTML, navbarHTML] =
    await Promise.all([
      fetchFunction("./leftColumn.html"),
      fetchFunction("./centralColumn.html"),
      fetchFunction("./rightColumn.html"),
      fetchFunction("./navbar.html"),
    ]);

  document.getElementById("leftColumn").innerHTML = leftColumnHTML.match(
    /<main[^>]*>([\s\S]*?)<\/main>/i
  )[1];
  document.getElementById("centralColumn").innerHTML = centralColumnHTML.match(
    /<main[^>]*>([\s\S]*?)<\/main>/i
  )[1];
  document.getElementById("rightColumn").innerHTML = rightColumnHTML.match(
    /<main[^>]*>([\s\S]*?)<\/main>/i
  )[1];
  document.getElementsByTagName("footer")[0].innerHTML = navbarHTML.match(
    /<footer[^>]*>([\s\S]*?)<\/footer>/i
  )[1];

  // Targhettizzo il form per prevenire anche la gestione di default del submit che mi resetterebbe i campi
  const form = document.getElementById("columnForm");

  // Disegna i link nella colonna sinistra
  drawPlaylistsLinks();

  document.getElementsByTagName("body")[0].addEventListener(
    "click",
    async (e) => {
      const target = e.target.id;
      _D(3, `event is:`, e);

      const targetType = target.split("-")[0];
      _D(1, `targetType is: ${targetType}`);

      const targetObject = target.split("-")[1];
      _D(1, `targetObject is: ${targetObject}`);

      switch (targetType) {
        case "playPlayList":
        case "playListPauseControl":
        case "playListPlayControl": {
          //playPlayList(targetObject)
          document
            .querySelectorAll('i[id*="playListPauseControl"]')
            .forEach((element) => {
              element.classList.add("d-none");
            });

          document
            .querySelectorAll('i[id*="playListPlayControl"]')
            .forEach((element) => {
              element.classList.remove("d-none");
            });

          document
            .getElementById("playListPauseControl-" + targetObject)
            .classList.toggle("d-none");
          document
            .getElementById("playListPlayControl-" + targetObject)
            .classList.toggle("d-none");

          _W("Manda in play la playlist: " + targetObject);
          break;
        }

        case "playList": {
          const tracksPlaylistArray = playlistsArray.filter(
            (playlist) =>
              playlist.playlistName.replace(" ", "") === targetObject
          )[0].playlistTracks;

          playlistsMegaArray = [];

          document.getElementById("centralColumn").innerHTML = spinnerHTML;

          try {
            await populateMyPlaylist(tracksPlaylistArray);
            drawPlaylist(targetObject);
          } catch (error) {
            _W(error);
          }
          break;
        }

        case "play": {
          playTrack(targetObject);
          break;
        }

        case "album":
        case "albumImage":
        case "albumTitle":
        case "albumText": {
          drawAlbum(targetObject);
          _W("Visualizza album: " + targetObject);
          break;
        }

        case "artist":
        case "artistName":
        case "artistNameList": {
          drawArtist(targetObject);
          break;
        }

        case "libraryLink": {
          document.getElementById("switchTitle").innerText = "La tua libreria";
          document.getElementById("ourPlayListsSection").innerHTML =
            spinnerHTML;
          try {
            await populateMyLibrary();
            drawOurLibrary(libraryArray);
          } catch (error) {
            _W(error);
          }
        }

        case "playPlaylistButtonDesktop":
        case "playPlaylistImageDeskstop":
        case "playPlaylistDiv":
        case "playPlaylistButton":
        case "playPlaylistImage": {
          _W("Manda in play la playlist: " + targetObject);
          megaArrayIndex = 0;
          setPreviousNextControl();
          trackId = playlistsMegaArray[megaArrayIndex].id;
          playItAgainSam();
          break;
        }

        default: {
          break;
        }
      }
    },
    true
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await populateMyQuery();
      drawQuery(searchInput);
    } catch (error) {
      _W(error);
    }

    //   ed a ricerca avvenuta con successo resetto il campo di ricerca
  });

  formSearch.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await populateMyQuery();
      drawQuery(cercaInput);
    } catch (error) {
      _W(error);
    }

    // ed a ricerca avvenuta con successo resetto il campo di ricerca
  });
});
