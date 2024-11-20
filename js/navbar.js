// ***********************************************************************
//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// Recipera le informazioni relative ad un atraccia e le memorizza in currentTrackData
const restriveTrackInfo = async (trackId) => {
    currentTrackData = await fetchFunction(apiBaseUrl + 'track/' + trackId);
    // Rimuove una sbrodolata di roba che non serve a nulla
    currentTrackData.available_countries = undefined;;
    _D(2, currentTrackData, `trackId: ${trackId}`)

    trackId !== 99710032 ? currentTrack = new Audio(currentTrackData.preview) : null;

    // Se la tracck che sto per riprodurre è diversa da quella che sto già riproducendo
    // Aggiorno i dati della traccia nel player
    document.getElementById('mobileTrackTitle').innerHTML = currentTrackData.title;
    document.getElementById('desktopTrackTitle').innerHTML = currentTrackData.title;
    document.getElementById('desktopTrackArtist').innerHTML = currentTrackData.artist.name;
    document.getElementById('desktopTrackImage').src = currentTrackData.album.cover_medium;
}


// Manda in funzione il player con le informazioni della traccia passata come parametro
// Se le informazioni della traccia ono già presenti nell'aray globale, non le recupera di nuovo
const playFunction = () => {
    _D(1, `playFunction - trackId: ${currentTrackData.id}`)


    if (isPlaying) {
        document.getElementById('playControl').classList.remove('d-none');
        document.getElementById('pauseControl').classList.add('d-none');

        isPlaying = false;
        _D(1, `isPlaying : ${isPlaying}`)

        currentTrack.pause();

    } else {
        document.getElementById('playControl').classList.add('d-none');
        document.getElementById('pauseControl').classList.remove('d-none');
        isPlaying = true;
        _D(1, `isPlaying : ${isPlaying}`)

        lastTrackId = currentTrackData.id;
        // Lancio la traccia
        currentTrack.play();
    }
}


//Aggiorno i dati del player leggendo i dati della traccia corrente
const updatePlayerBar = () => {
    _D(1, `updatePlayerBar`);

    const currentTime = currentTrack.currentTime;
    const duration = currentTrack.duration;
    _D(3, `currentTime: ${currentTime}`);
    _D(3, `duration: ${duration}`);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    document.getElementById('playerControlCurrentTime').innerText = formatTime(currentTime);
    document.getElementById('playerControlDuration').innerText = formatTime(duration);

    const progress = (currentTime / duration) * 100;
    document.getElementById('progressBarPercent').style.width = `${progress}%`;
    _D(2, `progress: ${progress}`);
};


//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

const apiBaseUrl = 'https://striveschool-api.herokuapp.com/api/deezer/'
const autoPlay = false;

let currentTrackData // Inizializza la variabile che conterrà i dati della traccia corrente recuperati tramite il fetching dell'api
let shuffleStatus = false;
let repeatStatus = false;
let isPlaying = false;
let currentTrack = new Audio('./test/player.mp3');
let lastTrackId = 0;

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

//document.addEventListener('DOMContentLoaded', () => {

setTimeout(async () => {

    // COntrollo del volume
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener("input", () => {
        const volumeValue = volumeControl.value;
        const volume0 = document.getElementById('volume-0');
        const volume25 = document.getElementById('volume-25');
        const volume50 = document.getElementById('volume-50');
        const volume75 = document.getElementById('volume-75');

        if (volumeValue <= .05) {
            volume0.classList.remove('d-none');
            [volume25, volume50, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)

        } else if (volumeValue <= .35) {
            volume25.classList.remove('d-none');
            [volume0, volume50, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)

        } else if (volumeValue <= .75) {
            volume50.classList.remove('d-none');
            [volume0, volume25, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)
        } else {
            volume75.classList.remove('d-none');
            [volume0, volume25, volume50].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)
        }

        currentTrack.volume = volumeValue;
    });


    // Evento sullo Shuffle
    const shuffleControl = document.getElementById('shuffleControl');
    shuffleControl.addEventListener('click', () => {
        if (shuffleControl.classList.contains('active')) {
            shuffleControl.classList.remove('active');
            shuffleStatus = false;
            _D(1, `shuffleStatus: ${shuffleStatus}`)
        } else {
            shuffleControl.classList.add('active');
            shuffleStatus = true;
            _D(1, `shuffleStatus: ${shuffleStatus}`)
        }
    })

    // Evento sullo Repeat
    const repeatControl = document.getElementById('repeatControl');
    repeatControl.addEventListener('click', () => {
        if (repeatControl.classList.contains('active')) {
            repeatControl.classList.remove('active');
            repeatStatus = false;
            _D(1, `repeatStatus: ${repeatControl}`)

            currentTrack.loop = false;
        } else {
            repeatControl.classList.add('active');
            repeatStatus = true;
            _D(1, `repeatStatus: ${repeatControl}`)

            currentTrack.loop = true;
        }
    });

    // Evento sul PLAY
    const playControlContainer = document.getElementById('playControlContainer');
    playControlContainer.addEventListener('click', () => {
        playFunction(99710032)
    });

    // Aggiunge il controllo sulla progress bar
    const playerControlProgressBar = document.getElementById('playerControlProgressBar');
    playerControlProgressBar.addEventListener("click", (e) => {
        _D(2, `e.offsetX: ${e.offsetX}`)
        currentTrack.currentTime = currentTrack.duration * (e.offsetX / playerControlProgressBar.clientWidth);
    });


    // Evento scatenato dall'aggiornamento del controllo audio
    currentTrack.addEventListener("timeupdate", () => {
        updatePlayerBar()
    });


    // Al caricamento della pagina popolo il player con la prima traccia ma non la lancio
    try {
        await restriveTrackInfo(99710032);
        playFunction();
        updatePlayerBar();
    } catch (error) {
        console.error("Errore durante l'esecuzione delle funzioni:", error);
    }


}, 500);

//});