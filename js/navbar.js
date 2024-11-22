// ***********************************************************************
//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// Recipera le informazioni relative ad un atraccia e le memorizza in currentTrackData
const restriveTrackInfo = async (trackId) => {
  currentTrackData = await fetchFunction(apiBaseUrl + "track/" + trackId);
  // Rimuove una sbrodolata di roba che non serve a nulla
  currentTrackData.available_countries = undefined;
  _D(2, currentTrackData, `restriveTrackInfo - trackId: ${trackId}`);

};

// Manda in play o in pausa la traccia corrente
const playFunction = async () => {

  if (isPlaying) {
    // Controlli desktop
    document.getElementById("playControl").classList.remove("d-none"); // Nasconde il pulsante play
    document.getElementById("pauseControl").classList.add("d-none"); // Mostra il pulsante pausa
    // Controlli mobile
    document.getElementById("mobilePlayControl").classList.remove("d-none"); // Nasconde il pulsante play
    document.getElementById("mobilePauseControl").classList.add("d-none"); // Mostra il pulsante pausa

    currentTrack.pause();

  } else {

    // Controlli desktop
    document.getElementById("pauseControl").classList.remove("d-none"); // Mostra il pulsante pausa
    document.getElementById("playControl").classList.add("d-none"); // Nasconde il pulsante play
    // Controlli mobile
    document.getElementById("mobilePauseControl").classList.remove("d-none"); // Mostra il pulsante pausa
    document.getElementById("mobilePlayControl").classList.add("d-none"); // Nasconde il pulsante play

    // Lancio la traccia
    currentTrack.play();
  }
};


//Aggiorno i dati del player leggendo i dati della traccia corrente
const updatePlayerBar = () => {
  _D(1, `updatePlayerBar`);

  const duration = currentTrack.duration;
  // Se mon è valorizzato esco (può succedere perché la funzione comincia l'aggiornamento della progress bar prima che la traccia sia pronta)
  if (isNaN(duration)) { return }

  const currentTime = currentTrack.currentTime;
  _D(3, `duration: ${duration}`);
  _D(3, `currentTime: ${currentTime}`);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  document.getElementById("playerControlCurrentTime").innerText =
    formatTime(currentTime);
  document.getElementById("playerControlDuration").innerText =
    formatTime(duration);

  const progress = (currentTime / duration) * 100;
  document.getElementById("progressBarPercent").style.width = `${progress}%`;
  _D(2, `progress: ${progress}`);
};

// Aggiorna le info della traccia corrente sul player
const updatePlayerInfo = () => {
  //Aggiorna l'immagine dell'album della traccia corrente
  document.getElementById('desktopTrackImage').src = currentTrackData.album.cover_medium;
  document.getElementById('desktopTrackTitle').innerHTML = currentTrackData.title
  document.getElementById('desktopTrackArtist').innerHTML = currentTrackData.artist.name
  // Aggiorna il titolo sul mobile
  document.getElementById('mobileTrackTitle').innerHTML = currentTrackData.title
}


//Funzione principale del player
const playItAgainSam = async () => {
  _W(`playItAgainSam - trackId - ${trackId}`);
  _W(`playItAgainSam - lastTrackId - ${lastTrackId}`);

  //Se sto suonando metto in pausa
  if (isPlaying) {
    _W('Sto suonando, metto in pausa');
    currentTrack.pause();
    // Chiamo la funzione che aggiorna i controlli
    playFunction();
    // Setto la variabile che controlla se la traccia è in play
    isPlaying = false;

  } else { // Se non sto suonando...
    _W('Non sto suonando, metto in play');
    // Verifico se è fornito un trackId
    if (trackId === lastTrackId) {
      _W('trackId uguale a lastTrackId');
      // Se il trackId è fornito ed è uguale al lastTrackId (cioè la traccia che sto già suonando)
      // se è vero allora l'utante ha semplicemente ridato play alla traccia corrente
      playFunction();
      updatePlayerBar();
      // Setto la variabile che controlla se la traccia è in play
      isPlaying = true;
    }
    // Se il trackId è fornito ma è diverso dal lastTrackId ovvero
    // e' arrivata una richiesta di cambio traccia quindi devo recuperare le informazioni della nuova traccia
    // e poi mandarla in play
    else if (trackId !== lastTrackId) {
      _W('trackId diverso da lastTrackId');
      try {
        await restriveTrackInfo(trackId)
        // _W(3, currentTrackData, 'playItAgainSam - CurrentTrackData');
        currentTrack = new Audio(currentTrackData.preview);
        currentTrack.preload = "auto";
        currentTrack.load();
        await playFunction();
        updatePlayerInfo();
        updatePlayerBar()
        lastTrackId = trackId;
        isPlaying = true;
      }
      catch (error) {
        console.error("Errore durante il fetch della traccia:", error);
      }

    }

    // Aggiungo l'evento che scatena l'aggiornamento della progress bar
    // DOPOOOOOOOOO Aver definito la currentTrack
    currentTrack.addEventListener("timeupdate", () => {
      updatePlayerBar();
    });

    // Evento sullo Repeat
    const repeatControl = document.getElementById("repeatControl");
    repeatControl.addEventListener("click", () => {
      if (repeatControl.classList.contains("active")) {
        repeatControl.classList.remove("active");
        repeatStatus = false;
        _D(1, `repeatStatus: ${repeatControl}`);

        currentTrack.loop = false;
      } else {
        repeatControl.classList.add("active");
        repeatStatus = true;
        _D(1, `repeatStatus: ${repeatControl}`);

        currentTrack.loop = true;
      }
    });
  }
};


// Setta le variabili trackId, nextTrackId e lastTrackId al momento in cui viene chiamato il play di una plylist
const setPreviousNextControl = () => {
  _W(`setPreviousNextControl - megaArrayIndex: ${megaArrayIndex}`);

  if (megaArrayIndex === 0) {
    nextTrackId = playlistsMegaArray[megaArrayIndex + 1].id;
    previousTrackId = playlistsMegaArray[playlistsMegaArray.length - 1].id;
  } else {
    nextTrackId = playlistsMegaArray[megaArrayIndex + 1].id;
    previousTrackId = playlistsMegaArray[megaArrayIndex].id;
  }

  _W(`setPreviousNextControl - nextTrackId: ${nextTrackId}`);
  _W(`setPreviousNextControl - previousTrackId: ${previousTrackId}`);

  // Assegna i controlli ai tasti next e previous
  // previousControl
  document.getElementById('previusControl').addEventListener('click', () => {
    if (megaArrayIndex === 0) {
      megaArrayIndex = playlistsMegaArray.length - 1;
    }
    else {
      megaArrayIndex--;
    }
    // Setto il nuovo ID della traccia
    trackId = previousTrackId;
    // Setto i controlli next e previous
    setPreviousNextControl()
    // Metto in pausa la traccia corrente
    currentTrack.pause();
    // Resetto la traccia corrente
    currentTrack = null
    // Lancio la nuova traccia
    playItAgainSam()
  })

  // nextControl
  document.getElementById('nextControl').addEventListener('click', () => {
    if (megaArrayIndex === playlistsMegaArray.length - 1) {
      megaArrayIndex = 0;
    }
    else {
      megaArrayIndex++;
    }
    // Setto il nuovo ID della traccia
    trackId = previousTrackId;
    // Setto i controlli next e previous
    setPreviousNextControl()
    // Metto in pausa la traccia corrente
    currentTrack.pause();
    // Resetto la traccia corrente
    currentTrack = null
    // Lancio la nuova traccia
    playItAgainSam()
  })

}


// Esegue la randomizzazione delle playlist
const shufflePlayList = () => {
  for (let i = playlistsMegaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlistsMegaArray[i], playlistsMegaArray[j]] = [playlistsMegaArray[j], playlistsMegaArray[i]];
  }
  setPlayListToPlay();
};



//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

const apiBaseUrl = "https://striveschool-api.herokuapp.com/api/deezer/";


let currentTrackData; // Inizializza la variabile che conterrà i dati della traccia corrente recuperati tramite il fetching dell'api
let shuffleStatus = false;
let repeatStatus = false;
let isPlaying = false;
let currentTrack;
let trackId = 64309686;
let lastTrackId = 0;

let megaArrayIndex = 0;

// https://striveschool-api.herokuapp.com/api/deezer/album/75621062
// https://striveschool-api.herokuapp.com/api/deezer/artist/412
// https://striveschool-api.herokuapp.com/api/deezer/track/99710030
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//


setTimeout(async () => {
  // Controllo del volume
  const volumeControl = document.getElementById("volumeControl");
  volumeControl.addEventListener("input", () => {
    const volumeValue = volumeControl.value;
    const volume0 = document.getElementById("volume-0");
    const volume25 = document.getElementById("volume-25");
    const volume50 = document.getElementById("volume-50");
    const volume75 = document.getElementById("volume-75");

    if (volumeValue <= 0.05) {
      volume0.classList.remove("d-none");
      [volume25, volume50, volume75].forEach((vol) =>
        vol.classList.add("d-none")
      );
      _D(1, `volumeValue: ${volumeValue}`);
    } else if (volumeValue <= 0.35) {
      volume25.classList.remove("d-none");
      [volume0, volume50, volume75].forEach((vol) =>
        vol.classList.add("d-none")
      );
      _D(1, `volumeValue: ${volumeValue}`);
    } else if (volumeValue <= 0.75) {
      volume50.classList.remove("d-none");
      [volume0, volume25, volume75].forEach((vol) =>
        vol.classList.add("d-none")
      );
      _D(1, `volumeValue: ${volumeValue}`);
    } else {
      volume75.classList.remove("d-none");
      [volume0, volume25, volume50].forEach((vol) =>
        vol.classList.add("d-none")
      );
      _D(1, `volumeValue: ${volumeValue}`);
    }

    currentTrack.volume = volumeValue;
  });

  // Evento sullo Shuffle
  const shuffleControl = document.getElementById("shuffleControl");
  shuffleControl.addEventListener("click", () => {
    if (shuffleControl.classList.contains("active")) {
      shuffleControl.classList.remove("active");
      shuffleStatus = false;
      _D(1, `shuffleStatus: ${shuffleStatus}`);
    } else {
      shuffleControl.classList.add("active");
      shuffleStatus = true;
      _D(1, `shuffleStatus: ${shuffleStatus}`);
    }
  });


  // Evento sul PLAY
  [
    "playControlContainer",
    "mobilePlayControlContainer",
    "buttonPlaySongCardHome",
  ].forEach((element) => {
    document.getElementById(element).addEventListener("click", async () => {
      playItAgainSam();
    });
  });

  // Aggiunge il controllo sulla progress bar
  const playerControlProgressBar = document.getElementById('playerControlProgressBar');
  playerControlProgressBar.addEventListener("click", (e) => {
    _D(2, `e.offsetX: ${e.offsetX}`);
    currentTrack.currentTime =
      currentTrack.duration *
      (e.offsetX / playerControlProgressBar.clientWidth);
  });



  // Selezione un brano a caso dalle playlist per popolare il player
  let rndPlayList = playlistsArray[Math.floor(Math.random() * playlistsArray.length)].playlistTracks;
  trackId = rndPlayList[Math.floor(Math.random() * rndPlayList.length)];

  try {
    await restriveTrackInfo(trackId);
    updatePlayerInfo();
  } catch (error) {
    console.error(error);
  }

}, 1500);
