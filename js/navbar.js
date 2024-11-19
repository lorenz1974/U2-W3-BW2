// ***********************************************************************
//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// Recipera le informazioni relative ad un atraccia e le memorizza in currentTrackData
const restriveTrackInfo = async (trackId) => {
    currentTrackData = await fetchFunction(apiBaseUrl + 'track/' + trackId);
    _D(2, currentTrackData, `trackId: ${trackId}`)

    // Se la tracck che sto per riprodurre è diversa da quella che sto già riproducendo
    // Aggiorno i dati della traccia nel player
    document.getElementById('mobileTrackTitle').innerHTML = currentTrackData.title;
    document.getElementById('desktopTrackTitle').innerHTML = currentTrackData.title;
    document.getElementById('desktopTrackArtist').innerHTML = currentTrackData.artist.name;
    document.getElementById('desktopTrackImage').src = currentTrackData.album.cover_medium;


    // Modifica l'album nella home page
    document.getElementById('albumHome').innerHTML = currentTrackData.album.title;
    document.getElementById('songTitleHome').innerHTML = currentTrackData.title;
    document.getElementById('artistHome').innerHTML = currentTrackData.artist.name;
    document.getElementById('imgSongHome').src = currentTrackData.album.cover_medium;
}


// Manda in funzione il player con le informazioni della traccia passata come parametro
// Se le informazioni della traccia ono già presenti nell'aray globale, non le recupera di nuovo
const playFunction = async (trackId) => {
    _D(1, `trackId: ${trackId}`)

    if (currentTrackData === undefined || currentTrackData.id !== trackId) {
        await restriveTrackInfo(trackId)
    }

    // Se la traccia che sto per riprodurre è diversa da quella che sto già riproducendo
    trackId !== 99710032 ? currentTrack = new Audio(currentTrackData.preview) : null;

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

        lastTrackId = trackId;
        // Lancio la traccia
        currentTrack.play();
    }
}


//Aggiorno i dati del player leggendo i dati della traccia corrente
const updatePlayerBar = () => {
    const currentTime = currentTrack.currentTime;
    const duration = currentTrack.duration;
    _D(3, `currentTime: ${currentTime}`)
    _D(3, `duration: ${duration}`)

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    _D(3, `currentMinutes: ${currentMinutes}`)
    _D(3, `currentSeconds: ${currentSeconds}`)
    _D(3, `totalMinutes: ${totalMinutes}`)
    _D(3, `totalSeconds: ${totalSeconds}`)

    document.getElementById('playerControlCurrentTime').innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    document.getElementById('playerControlDuration').innerText = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const progress = (currentTime / duration) * 100;
    progressBarPercent.style.width = `${progress}%`;
    _D(3, `progress: ${(currentTime / duration) * 100}`)
}


//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

const apiBaseUrl = 'https://striveschool-api.herokuapp.com/api/deezer/'

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

setTimeout(() => {

    // Controllo del volume
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


    // Evento sul Repeat
    const repeatControl = document.getElementById('repeatControl');
    repeatControl.addEventListener('click', () => {
        if (repeatControl.classList.contains('active')) {
            repeatControl.classList.remove('active');
            repeatStatus = false;
            _D(1, `repeatStatus: ${repeatStatus}`)

            currentTrack.loop = true;
        } else {
            repeatControl.classList.add('active');
            repeatStatus = true;
            _D(1, `repeatStatus: ${repeatStatus}`)

            currentTrack.loop = true;
        }
    });

    // Evento sul PLAY
    const playControlContainer = document.getElementById('playControlContainer');
    playControlContainer.addEventListener('click', () => {
        playFunction(99710032)
    });

    // Evento sul bottone con il testo 'Play'
    const playButton = document.querySelector('button.btn-success');
    playButton.addEventListener('click', () => {
        playFunction(99710032);
    });

    // Evento scatenato dall'aggiornamento del controllo audio
    currentTrack.addEventListener("timeupdate", () => {
        updatePlayerBar()
    });


    // Al caricamento della pagina popolo il player con la prima traccia ma non la lancio
    restriveTrackInfo(99710032)
    playFunction()
    updatePlayerBar()


}, 500);

//});